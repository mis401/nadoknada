import { FullUserInfo } from "../../user/models/fulluserinfo.model"
import { Kategorija } from "./kategorija.model"

export interface Oglas{
    id:          string       
    naziv:       string
    kvalitet:    string
    brojPoseta:  number          
    opis:        string
    datumKreiranja: Date
    ponuda:      string
    aktivanOglas: boolean 
    resenOglas:  boolean 
    obrisanOglas: boolean
    stanjeOglasa: string
    datumResavanja:  Date
    datumBrisanja:   Date
    razlogBrisanja:  string
    kreiraoKorisnikId?:string;
    kreiraoKorisnikUsername?:string;
    kategorijaIds?:string[];
    kategorije?: Kategorija[];
    slike?: File[] | null;
    slikaURL: string | null;
    pretplacujeSeIds?: string[]
    kreiraoKorisnik?: FullUserInfo
}
