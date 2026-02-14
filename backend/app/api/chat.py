from fastapi import APIRouter
from starlette.responses import StreamingResponse

from app.core.database import DB
from app.schemas.chat import ChatRequest
from app.services import chat_service

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/completions")
async def chat_completions(chat_in: ChatRequest, db: DB):
	return StreamingResponse(
		chat_service.chat(db, chat_in),
		media_type="text/event-stream",
		headers={
			"Cache-Control": "no-cache",
			"Connection": "keep-alive",
		},
	)
