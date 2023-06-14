import { Kategorija } from "../models/kategorija.model";
import { Oglas } from "../models/oglas.model";



export interface OglasState{
    oglas: Oglas | null,
    oglasList: Oglas[],
    kategorija: Kategorija,
    kategorijaList: Kategorija[],
    error: any
}

// export const InitialOglasListState : OglasListState = {
//     oglasi: []
// }

export const InitialOglasState : OglasState = {
    oglas: null,
    oglasList: [],
    kategorija: {id: '', naziv: ''},
    kategorijaList: [],
    error: null,
}