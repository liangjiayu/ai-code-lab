export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationGroup {
  label: string;
  conversations: Conversation[];
}
