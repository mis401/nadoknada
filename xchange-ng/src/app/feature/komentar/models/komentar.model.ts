import { FullUserInfo } from "../../user/models/fulluserinfo.model"

export interface Komentar{
    id: string
    tekst: string
    ocena: number
    datumPostavljanja: Date
    userkomeJeOstavljenKomentarId: string
    komeJeOstavljenKomentar?: FullUserInfo
    userOstavioKomentarId: string
    ostavioKomentar?: FullUserInfo
}

