from fastapi import APIRouter
from starlette.responses import StreamingResponse

from app.core.database import DB
from app.schemas.chat import ChatRequest, EditCompletionRequest, GenerateTitleRequest, RetryCompletionRequest
from app.schemas.response import ApiResponse
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


@router.post("/edit_completion")
async def edit_completion(edit_in: EditCompletionRequest, db: DB):
	return StreamingResponse(
		chat_service.edit_completion(db, edit_in),
		media_type="text/event-stream",
		headers={
			"Cache-Control": "no-cache",
			"Connection": "keep-alive",
		},
	)


@router.post("/retry_completion")
async def retry_completion(retry_in: RetryCompletionRequest, db: DB):
	return StreamingResponse(
		chat_service.retry_completion(db, retry_in),
		media_type="text/event-stream",
		headers={
			"Cache-Control": "no-cache",
			"Connection": "keep-alive",
		},
	)


@router.post("/generate_title")
async def generate_title(req: GenerateTitleRequest, db: DB):
	title = await chat_service.generate_title(db, req)
	return ApiResponse.ok(data={"title": title})
