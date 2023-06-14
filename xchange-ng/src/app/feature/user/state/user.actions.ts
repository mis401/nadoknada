import { createAction, props } from "@ngrx/store";
import { Credentials } from '../models/credentials.model';
import { FullUserInfo } from "../models/fulluserinfo.model";

export const loginUser = createAction(`[User] User login`, props<{user: Credentials}>());

export const loginUserSuccess = createAction(`[User] Login Success`, props<{token: string}>());

export const loginUserFailed=  createAction(`[User] Login Failed`, props<{error: any}>());

export const signupUser = createAction(`[User] User signup`, props<{user: FullUserInfo}>());

export const signupUserSuccess = createAction(`[User] Signup Success`, props<{token: string}>());

export const signupUserFailed = createAction(`[User] Signup Failed`, props<{error: any}>());

export const logoutUser = createAction(`[User] User logout`, props<{user: string}>());

export const logoutUserSuccess = createAction(`[User] Logout Success`, props<{message: string}>());
    
export const loadUserToken = createAction(`[User] Load User Token`, props<{token: string}>());

export const loadFullUser = createAction(`[User] Load Full User`, props<{token: string}>());

export const loadFullUserSuccess = createAction(`[User] Load Full User Success`, props<{user: FullUserInfo}>());
export const loadUserFailed = createAction(`[User] Load User Failed`, props<{error: any}>());