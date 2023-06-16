import { ChatState, InitialChatState } from "../feature/chat/state/chat.state";
import { InitialKomentarState, KomentarState } from "../feature/komentar/state/komentar.state";
import { InitialOglasState, OglasState } from "../feature/oglas/state/oglas.state";
import { InitialUserState, UserState } from "../feature/user/state/user.state";

export interface AppState{
    userState: UserState,
    oglasState: OglasState,
    komentarState: KomentarState,
    chatState: ChatState,
}

export const initialAppState: AppState = {
    userState: InitialUserState,
    oglasState: InitialOglasState,
    komentarState: InitialKomentarState,
    chatState: InitialChatState,
}