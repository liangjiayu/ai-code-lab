import { useParams } from "react-router";
import { useMessages } from "~/queries/use-messages";
import { ChatMessageList } from "~/components/layout/ChatMessageList";

export default function Chat() {
  const { id } = useParams();
  const { data, isLoading } = useMessages(id!);
  const messages = data?.list ?? [];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        加载中...
      </div>
    );
  }

  return <ChatMessageList messages={messages} />;
}
