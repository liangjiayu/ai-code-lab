from fastapi import APIRouter

from app.core.database import DB
from app.schemas.chat import ChatRequest
from app.schemas.message import MessageOut
from app.schemas.response import ApiResponse
from app.services import chat_service

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/completions", response_model=ApiResponse[MessageOut])
async def chat_completions(chat_in: ChatRequest, db: DB):
	message = await chat_service.chat(db, chat_in)
	return ApiResponse.ok(data=message)
