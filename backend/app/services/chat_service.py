import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import BizException
from app.repositories.message_repository import MessageRepository
from app.schemas.chat import ChatRequest
from app.schemas.message import MessageCreate, MessageRole, MessageStatus
from app.services.conversation_service import get_conversation


async def chat(db: AsyncSession, chat_in: ChatRequest):
	# 1. 验证会话存在
	await get_conversation(db, chat_in.conversation_id)

	# 2. 加载历史消息
	history = await MessageRepository.get_list_by_conversation_id(db, chat_in.conversation_id)

	# 3. 保存用户消息
	user_message_in = MessageCreate(
		conversation_id=chat_in.conversation_id,
		role=MessageRole.user,
		content=chat_in.content,
		status=MessageStatus.success,
	)
	await MessageRepository.create(db, user_message_in)

	# 4. 组装 messages
	messages = [{"role": msg.role, "content": msg.content} for msg in history]
	messages.append({"role": "user", "content": chat_in.content})

	# 5. 调用 DeepSeek API
	try:
		async with httpx.AsyncClient(timeout=120) as client:
			response = await client.post(
				f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
				headers={
					"Authorization": f"Bearer {settings.DEEPSEEK_API_KEY}",
					"Content-Type": "application/json",
				},
				json={
					"model": settings.DEEPSEEK_MODEL,
					"messages": messages,
				},
			)
			response.raise_for_status()
			result = response.json()
	except httpx.HTTPStatusError as e:
		raise BizException(code=502, msg=f"DeepSeek API 请求失败: {e.response.status_code}")
	except httpx.RequestError:
		raise BizException(code=502, msg="DeepSeek API 连接失败")

	# 6. 解析响应并保存 AI 回复
	ai_content = result["choices"][0]["message"]["content"]
	ai_message_in = MessageCreate(
		conversation_id=chat_in.conversation_id,
		role=MessageRole.assistant,
		content=ai_content,
		status=MessageStatus.success,
	)
	ai_message = await MessageRepository.create(db, ai_message_in)

	# 7. 返回 AI 回复
	return ai_message
