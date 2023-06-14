import { createReducer, on } from "@ngrx/store";
import { InitialChatState } from "./chat.state";
import { loadChatSuccess } from "./chat.actions";

export const chatReducer = createReducer(
    InitialChatState,
    on(loadChatSuccess, (state, {messages}) => ({
        ...state,
        poruke: [...messages]
    })),
)