import { FullUserInfo } from "../../user/models/fulluserinfo.model"
import { Oglas } from "./oglas.model"

export interface Ponuda {
    id: string
    Naslov: string
    vrsta: string
    opis: string
    koJePoslaoPonuduId: string,
    koJePoslaoPonudu?: FullUserInfo,
    oglasId: string
    prihvacenaNaOglasId: string | null,
    oglas?: Oglas 
  }