import { KomentarUser } from "../models/komentar-user.model";

export interface KomentarState{
    komentari: KomentarUser[],
    komentar: KomentarUser | null,
    error: any
}

export const InitialKomentarState: KomentarState = {
    komentari: [],
    komentar: null,
    error: null
}