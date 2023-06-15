import { createReducer, on } from "@ngrx/store";
import { InitialUserState } from "./user.state";
import { deleteUserSuccess, loadFullUserSuccess, loadUserFailed, loadUserToken, loginUserFailed, loginUserSuccess, logoutUserSuccess, signupUser, signupUserSuccess, updateUserSuccess } from "./user.actions";

interface receivedToken {
    accessToken: string;
}

export const userReducer = createReducer(
        InitialUserState,
        on(loginUserSuccess, (state, {token}) => ({
            ...state,
            token: token,
            user: null,
            error: null
        })),
        on(signupUserSuccess, (state, {token}) => ({
            ...state,
            token: token,
            user: null,
            error: null
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
            error: null
        })),
        on(loadFullUserSuccess, (state, {user}) => ({
            ...state,
            user: user,
            error: null
        })),
        on(loadUserFailed, (state, {error}) => ({
            ...state,
            error: error
        })),
        on(updateUserSuccess, (state, {user}) => ({
            ...state,
            user: user,
            error: null
        })),
        on(deleteUserSuccess, (state, {message}) => ({
            ...state,
            token: '',
            user: null,
            error: message
        }))

);