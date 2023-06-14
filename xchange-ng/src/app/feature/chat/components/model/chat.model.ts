import { Conversation } from "./conversation.model";
import { Message } from "./poruka.model";

export interface Chat{
    messages: Message[],
    conversation: Conversation | null
}