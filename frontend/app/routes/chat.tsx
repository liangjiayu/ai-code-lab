import { useParams } from "react-router";
import { getMessagesByConversationId } from "~/lib/mock-data";
import { ChatMessageList } from "~/components/layout/ChatMessageList";

export default function Chat() {
  const { id } = useParams();
  const messages = getMessagesByConversationId(id!);

  return <ChatMessageList messages={messages} />;
}
