import { JWT } from "../../user/models/jwt.model";
import { Chat } from "../components/model/chat.model";
import { Conversation } from "../components/model/conversation.model";
import { Message } from "../components/model/poruka.model";

export interface ChatState {
    chat: Conversation | null
    user: JWT | null
}

export const InitialChatState: ChatState = {
    chat: null,
    user: null
}