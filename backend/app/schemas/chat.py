import uuid

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
	conversation_id: uuid.UUID = Field(description="所属会话 ID")
	content: str = Field(description="用户消息内容")
