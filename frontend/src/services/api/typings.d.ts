declare namespace API {
  type ApiResponseConversationOut_ = {
    /** Code 业务状态码 */
    code?: number;
    /** Msg 提示信息 */
    msg?: string;
    /** 响应数据 */
    data?: ConversationOut | null;
  };

  type ApiResponseListMessageOut_ = {
    /** Code 业务状态码 */
    code?: number;
    /** Msg 提示信息 */
    msg?: string;
    /** Data 响应数据 */
    data?: MessageOut[] | null;
  };

  type ApiResponseMessageOut_ = {
    /** Code 业务状态码 */
    code?: number;
    /** Msg 提示信息 */
    msg?: string;
    /** 响应数据 */
    data?: MessageOut | null;
  };

  type ApiResponseNoneType_ = {
    /** Code 业务状态码 */
    code?: number;
    /** Msg 提示信息 */
    msg?: string;
    /** Data 响应数据 */
    data?: null;
  };

  type ApiResponsePageDataConversationOut_ = {
    /** Code 业务状态码 */
    code?: number;
    /** Msg 提示信息 */
    msg?: string;
    /** 响应数据 */
    data?: PageDataConversationOut_ | null;
  };

  type ApiResponsePageDataUserOut_ = {
    /** Code 业务状态码 */
    code?: number;
    /** Msg 提示信息 */
    msg?: string;
    /** 响应数据 */
    data?: PageDataUserOut_ | null;
  };

  type ApiResponseUserOut_ = {
    /** Code 业务状态码 */
    code?: number;
    /** Msg 提示信息 */
    msg?: string;
    /** 响应数据 */
    data?: UserOut | null;
  };

  type ChatRequest = {
    /** Conversation Id 所属会话 ID */
    conversation_id: string;
    /** Prompt 用户消息内容 */
    prompt: string;
    /** Parent Message Id 父消息 ID */
    parent_message_id?: string | null;
  };

  type ConversationCreate = {
    /** Title 会话标题 */
    title?: string | null;
    /** Model Name 模型名称 */
    model_name?: string | null;
    /** Id 会话 UUID，由前端生成 */
    id: string;
    /** User Id 用户标识 */
    user_id: string;
  };

  type ConversationOut = {
    /** Title 会话标题 */
    title?: string | null;
    /** Model Name 模型名称 */
    model_name?: string | null;
    /** Id 会话 ID */
    id: string;
    /** User Id 用户标识 */
    user_id: string;
    /** Extra Data 扩展数据 */
    extra_data?: Record<string, any> | null;
    /** Created At 创建时间 */
    created_at: string;
    /** Updated At 更新时间 */
    updated_at: string;
  };

  type ConversationUpdate = {
    /** Title 会话标题 */
    title?: string | null;
    /** Model Name 模型名称 */
    model_name?: string | null;
    /** Extra Data 扩展数据 */
    extra_data?: Record<string, any> | null;
  };

  type deleteConversationParams = {
    conversation_id: string;
  };

  type deleteMessageParams = {
    message_id: string;
  };

  type deleteUserParams = {
    user_id: number;
  };

  type GenerateTitleRequest = {
    /** Conversation Id 所属会话 ID */
    conversation_id: string;
    /** Message 用于生成标题的消息内容 */
    message: string;
  };

  type getConversationParams = {
    conversation_id: string;
  };

  type getConversationsParams = {
    user_id?: string | null;
    page?: number;
    page_size?: number;
  };

  type getMessageParams = {
    message_id: string;
  };

  type getMessagesParams = {
    conversation_id: string;
  };

  type getUserParams = {
    user_id: number;
  };

  type getUsersParams = {
    page?: number;
    page_size?: number;
  };

  type MessageCreate = {
    /** 消息角色：system / user / assistant */
    role: MessageRole;
    /** Content 消息内容 */
    content: string;
    /** Extra Data 扩展数据，如思考过程、token 用量等 */
    extra_data?: Record<string, any> | null;
    /** Conversation Id 所属会话 ID */
    conversation_id: string;
    /** Parent Message Id 父消息 ID */
    parent_message_id?: string | null;
    /** 消息状态：processing / success / error */
    status?: MessageStatus;
  };

  type MessageOut = {
    /** 消息角色：system / user / assistant */
    role: MessageRole;
    /** Content 消息内容 */
    content: string;
    /** Extra Data 扩展数据，如思考过程、token 用量等 */
    extra_data?: Record<string, any> | null;
    /** Id 消息 ID */
    id: string;
    /** Conversation Id 所属会话 ID */
    conversation_id: string;
    /** Parent Message Id 父消息 ID */
    parent_message_id?: string | null;
    /** 消息状态：processing / success / error */
    status: MessageStatus;
    /** Created At 创建时间 */
    created_at: string;
  };

  type MessageRole = "system" | "user" | "assistant";

  type MessageStatus = "processing" | "success" | "error";

  type MessageUpdate = {
    /** Content 消息内容 */
    content?: string | null;
    /** 消息状态：processing / success / error */
    status?: MessageStatus | null;
    /** Extra Data 扩展数据，如思考过程、token 用量等 */
    extra_data?: Record<string, any> | null;
  };

  type PageDataConversationOut_ = {
    /** List 数据列表 */
    list: ConversationOut[];
    /** Total 总记录数 */
    total: number;
    /** Page 当前页码 */
    page: number;
    /** Page Size 每页条数 */
    page_size: number;
  };

  type PageDataUserOut_ = {
    /** List 数据列表 */
    list: UserOut[];
    /** Total 总记录数 */
    total: number;
    /** Page 当前页码 */
    page: number;
    /** Page Size 每页条数 */
    page_size: number;
  };

  type updateConversationParams = {
    conversation_id: string;
  };

  type updateMessageParams = {
    message_id: string;
  };

  type updateUserParams = {
    user_id: number;
  };

  type UserCreate = {
    /** Username 用户名，唯一 */
    username: string;
    /** Email 邮箱，唯一 */
    email: string;
  };

  type UserOut = {
    /** Username 用户名，唯一 */
    username: string;
    /** Email 邮箱，唯一 */
    email: string;
    /** Id 用户 ID */
    id: number;
  };

  type UserUpdate = {
    /** Username 用户名，唯一 */
    username?: string | null;
    /** Email 邮箱，唯一 */
    email?: string | null;
  };
}
