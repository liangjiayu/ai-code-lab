import json
from collections.abc import AsyncGenerator

import httpx
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.repositories.conversation_repository import ConversationRepository
from app.repositories.message_repository import MessageRepository
from app.schemas.chat import ChatRequest, EditCompletionRequest, GenerateTitleRequest, RetryCompletionRequest
from app.schemas.conversation import ConversationUpdate
from app.schemas.message import MessageCreate, MessageRole, MessageStatus, MessageUpdate
from app.services.conversation_service import get_conversation


async def _stream_completion(
	db: AsyncSession,
	conversation_id,
	messages: list[dict],
	parent_message_id,
) -> AsyncGenerator[str, None]:
	"""公共流式调用逻辑：创建 AI 占位 → 流式调用 → 更新消息"""
	# 创建 AI 消息占位（processing 状态）
	ai_message_in = MessageCreate(
		conversation_id=conversation_id,
		role=MessageRole.assistant,
		content="",
		parent_message_id=parent_message_id,
		status=MessageStatus.processing,
	)
	ai_message = await MessageRepository.create(db, ai_message_in)

	# 流式调用 DeepSeek API
	full_content = ""

	try:
		async with httpx.AsyncClient(timeout=120) as client:
			async with client.stream(
				"POST",
				f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
				headers={
					"Authorization": f"Bearer {settings.DEEPSEEK_API_KEY}",
					"Content-Type": "application/json",
				},
				json={
					"model": settings.DEEPSEEK_MODEL,
					"messages": messages,
					"stream": True,
				},
			) as response:
				response.raise_for_status()
				async for line in response.aiter_lines():
					if not line.startswith("data: "):
						continue
					data = line[6:]
					if data == "[DONE]":
						break
					chunk = json.loads(data)
					delta = chunk["choices"][0].get("delta", {})
					content = delta.get("content", "")
					if content:
						full_content += content
						yield f"data: {json.dumps({'content': content}, ensure_ascii=False)}\n\n"
	except httpx.HTTPStatusError as e:
		error_msg = f"DeepSeek API 请求失败: {e.response.status_code}"
		yield f"data: {json.dumps({'error': error_msg}, ensure_ascii=False)}\n\n"
		await MessageRepository.update(db, ai_message, MessageUpdate(content=error_msg, status=MessageStatus.error))
		return
	except httpx.RequestError:
		error_msg = "DeepSeek API 连接失败"
		yield f"data: {json.dumps({'error': error_msg}, ensure_ascii=False)}\n\n"
		await MessageRepository.update(db, ai_message, MessageUpdate(content=error_msg, status=MessageStatus.error))
		return

	# 流结束，更新 AI 消息内容和状态
	await MessageRepository.update(db, ai_message, MessageUpdate(content=full_content, status=MessageStatus.success))
	yield f"data: {json.dumps({'message_id': str(ai_message.id)}, ensure_ascii=False)}\n\n"
	yield "data: [DONE]\n\n"


async def chat(db: AsyncSession, chat_in: ChatRequest) -> AsyncGenerator[str, None]:
	# 1. 验证会话存在
	await get_conversation(db, chat_in.conversation_id)

	# 2. 加载历史消息
	history = await MessageRepository.get_list_by_conversation_id(db, chat_in.conversation_id)

	# 3. 保存用户消息
	user_message_in = MessageCreate(
		conversation_id=chat_in.conversation_id,
		role=MessageRole.user,
		content=chat_in.prompt,
		parent_message_id=chat_in.parent_message_id,
		status=MessageStatus.success,
	)
	user_message = await MessageRepository.create(db, user_message_in)

	# 4. 组装 messages
	messages = [{"role": msg.role, "content": msg.content} for msg in history]
	messages.append({"role": "user", "content": chat_in.prompt})

	# 5. 调用公共流式方法
	async for chunk in _stream_completion(db, chat_in.conversation_id, messages, user_message.id):
		yield chunk


async def edit_completion(db: AsyncSession, edit_in: EditCompletionRequest) -> AsyncGenerator[str, None]:
	# 1. 验证会话存在
	await get_conversation(db, edit_in.conversation_id)

	# 2. 获取要编辑的消息，校验 role=user
	message = await MessageRepository.get_by_id(db, edit_in.message_id)
	if not message:
		raise HTTPException(status_code=404, detail="消息不存在")
	if message.role != MessageRole.user:
		raise HTTPException(status_code=400, detail="只能编辑用户消息")

	# 3. 删除该消息之后的所有消息
	await MessageRepository.delete_after_message(db, edit_in.conversation_id, message.created_at)

	# 4. 更新用户消息的 content
	await MessageRepository.update(db, message, MessageUpdate(content=edit_in.prompt))

	# 5. 重新加载历史消息（包含已更新的用户消息）
	history = await MessageRepository.get_list_by_conversation_id(db, edit_in.conversation_id)

	# 6. 组装 messages
	messages = [{"role": msg.role, "content": msg.content} for msg in history]

	# 7. 调用公共流式方法
	async for chunk in _stream_completion(db, edit_in.conversation_id, messages, message.id):
		yield chunk


async def retry_completion(db: AsyncSession, retry_in: RetryCompletionRequest) -> AsyncGenerator[str, None]:
	# 1. 验证会话存在
	await get_conversation(db, retry_in.conversation_id)

	# 2. 获取要重新生成的消息，校验 role=assistant
	message = await MessageRepository.get_by_id(db, retry_in.message_id)
	if not message:
		raise HTTPException(status_code=404, detail="消息不存在")
	if message.role != MessageRole.assistant:
		raise HTTPException(status_code=400, detail="只能重新生成 AI 消息")

	# 3. 删除该消息及其后续所有消息
	await MessageRepository.delete_message_and_after(db, retry_in.conversation_id, message.created_at)

	# 4. 重新加载历史消息
	history = await MessageRepository.get_list_by_conversation_id(db, retry_in.conversation_id)

	# 5. 获取最后一条用户消息作为 parent
	parent_message = history[-1] if history else None
	parent_message_id = parent_message.id if parent_message else None

	# 6. 组装 messages，调用 _stream_completion
	messages = [{"role": msg.role, "content": msg.content} for msg in history]

	async for chunk in _stream_completion(db, retry_in.conversation_id, messages, parent_message_id):
		yield chunk


async def generate_title(db: AsyncSession, req: GenerateTitleRequest) -> str:
	"""根据消息内容生成会话标题，并更新数据库"""
	# 1. 验证会话存在
	conversation = await get_conversation(db, req.conversation_id)

	# 2. 调用大模型生成标题
	messages = [
		{
			"role": "system",
			"content": "你是一个标题生成助手。根据用户提供的消息内容，生成一个简短的会话标题（不超过20个字）。只返回标题文本，不要包含引号或其他额外内容。",
		},
		{"role": "user", "content": req.message},
	]

	async with httpx.AsyncClient(timeout=30) as client:
		response = await client.post(
			f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
			headers={
				"Authorization": f"Bearer {settings.DEEPSEEK_API_KEY}",
				"Content-Type": "application/json",
			},
			json={
				"model": settings.DEEPSEEK_MODEL,
				"messages": messages,
				"stream": False,
			},
		)
		response.raise_for_status()
		data = response.json()
		title = data["choices"][0]["message"]["content"].strip()

	# 3. 更新会话标题
	await ConversationRepository.update(db, conversation, ConversationUpdate(title=title))

	return title
