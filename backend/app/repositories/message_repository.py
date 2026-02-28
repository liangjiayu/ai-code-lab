import uuid

from sqlalchemy import select
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
