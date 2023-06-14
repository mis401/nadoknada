import { FullUserInfo } from "../models/fulluserinfo.model";
import { UserToken } from "../models/user.model";

export interface UserState{
    token: string,
    user: FullUserInfo | null,
    error: any
}

export const InitialUserState: UserState = {
    token: '',
    user: null,
    error: null
}