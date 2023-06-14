import { Oglas } from "../../oglas/models/oglas.model";
import { FullUserInfo } from "../../user/models/fulluserinfo.model";

export interface Prijava {
    id: string;
    tema:string;
    ishod: string;
    resilaKorisnickaPodrska: string[];
    kojiOglasSePrijavljuje: Oglas,
    kojiKorisnikSePrijavljuje: FullUserInfo,
    ostavljaKorsinikId: string;
    ostavljaPrituzbu: FullUserInfo,
    repotovanKorisnikId: string;
    reportovanOglasId: string;
}