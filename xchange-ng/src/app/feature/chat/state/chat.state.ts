import { Chat } from "../components/model/chat.model";
import { Conversation } from "../components/model/conversation.model";
import { Message } from "../components/model/poruka.model";

export interface ChatState {
    chat: Conversation | null
}

export const InitialChatState: ChatState = {
    chat: null
}