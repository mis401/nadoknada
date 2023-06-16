import { createAction, props } from "@ngrx/store";
import { Conversation } from "../components/model/conversation.model";
import { Message } from "../components/model/poruka.model";

export const loadChat = createAction('[Chat] Load Chat', props<{chat: string}>());
export const loadChatSuccess = createAction('[Chat] Load Chat Success', props<{messages: Message[]}>());

export const ucitajUsera = createAction('[Chat] Ucitaj Usera', props<{user: string}>());