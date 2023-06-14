import { createReducer, on } from "@ngrx/store";
import { InitialUserState } from "./user.state";
import { loadFullUserSuccess, loadUserFailed, loadUserToken, loginUserFailed, loginUserSuccess, logoutUserSuccess, signupUser, signupUserSuccess } from "./user.actions";

interface receivedToken {
    accessToken: string;
}

export const userReducer = createReducer(
        InitialUserState,
        on(loginUserSuccess, (state, {token}) => ({
            ...state,
            token: token,
            user: null
        })),
        on(signupUserSuccess, (state, {token}) => ({
            ...state,
            token: token,
            user: null
        })),
        on(loginUserFailed, (state, {error}) => ({
            ...state,
            token: '',
            user: null,
            error: error
        })),
        on(logoutUserSuccess, (state, {message}) => ({
            ...state,
            token: '',
            user: null,
            error: message
        })),
        on(loadUserToken, (state, {token}) => ({
            ...state,
            token: token,
        })),
        on(loadFullUserSuccess, (state, {user}) => ({
            ...state,
            user: user,
        })),
        on(loadUserFailed, (state, {error}) => ({
            ...state,
            error: error
        })),
        

);