import uuid

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
	conversation_id: uuid.UUID = Field(description="所属会话 ID")
	prompt: str = Field(description="用户消息内容")
	parent_message_id: uuid.UUID | None = Field(None, description="父消息 ID")


class GenerateTitleRequest(BaseModel):
	conversation_id: uuid.UUID = Field(description="所属会话 ID")
	message: str = Field(description="用于生成标题的消息内容")
