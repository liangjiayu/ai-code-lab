import uuid
from datetime import datetime

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.message import Message
from app.repositories.base import BaseRepository


class MessageRepository(BaseRepository):
	model = Message

	@classmethod
	async def get_list_by_conversation_id(cls, db: AsyncSession, conversation_id: uuid.UUID) -> list[Message]:
		result = await db.execute(
			select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at.asc())
		)
		return list(result.scalars().all())

	@classmethod
	async def delete_after_message(cls, db: AsyncSession, conversation_id: uuid.UUID, created_at: datetime):
		"""删除同会话中指定时间之后的所有消息"""
		await db.execute(
			delete(Message).where(Message.conversation_id == conversation_id).where(Message.created_at > created_at)
		)
		await db.commit()
