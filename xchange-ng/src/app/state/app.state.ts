import { InitialOglasState, OglasState } from "../feature/oglas/state/oglas.state";
import { InitialUserState, UserState } from "../feature/user/state/user.state";

export interface AppState{
    userState: UserState,
    oglasState: OglasState
}

export const initialAppState: AppState = {
    userState: InitialUserState,
    oglasState: InitialOglasState,
}