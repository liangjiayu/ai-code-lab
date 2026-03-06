import asyncio
import uuid


class StreamManager:
	"""管理活跃的 SSE 流，支持通过 conversation_id 取消流"""

	def __init__(self):
		self._active_streams: dict[uuid.UUID, asyncio.Event] = {}

	def register(self, conversation_id: uuid.UUID) -> asyncio.Event:
		"""注册一个活跃流，返回取消事件"""
		cancel_event = asyncio.Event()
		self._active_streams[conversation_id] = cancel_event
		return cancel_event

	def unregister(self, conversation_id: uuid.UUID):
		"""注销一个活跃流"""
		self._active_streams.pop(conversation_id, None)

	def cancel(self, conversation_id: uuid.UUID) -> bool:
		"""取消指定会话的活跃流，返回是否成功"""
		cancel_event = self._active_streams.get(conversation_id)
		if cancel_event is None:
			return False
		cancel_event.set()
		return True


stream_manager = StreamManager()
