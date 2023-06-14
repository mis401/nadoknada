import { Action, State, createReducer, on } from "@ngrx/store";
import { InitialOglasState, OglasState } from "./oglas.state";
import { neuspesnoPrijavljenOglas, neuspesnoZapracenOglas, odabranaKategorija, oglasiKategorijeUcitani, selektovanOglas, ucitavanjeKategorijaSuccess, uspesnaPonuda, uspesnoPrijavljenOglas, uspesnoVraceniOglasi, uspesnoZapracenOglas } from "./oglas.actions";
import { InitialUserState } from "../../user/state/user.state";


//create a reducer
export const oglasReducer = createReducer(
    InitialOglasState,
    on(uspesnoVraceniOglasi, (state, {oglasi}) => ({
        ...state,
        oglasList: oglasi
    })),
    on(selektovanOglas, (state, {oglas}) => ({
        ...state,
        oglas: oglas
    })),
    on(uspesnoZapracenOglas, (state, {oglas}) => ({
        ...state,
        oglas: oglas,
    })),
    on(neuspesnoZapracenOglas, (state, {error}) => ({
        ...state,
        error: error
    })),
    on(uspesnoPrijavljenOglas, (state, {prituzba}) => ({
        ...state,
    })),
    on(neuspesnoPrijavljenOglas, (state, {error}) => ({
        ...state,
        error: error
    })),
    on(uspesnaPonuda, (state, {oglas}) => ({
        ...state,
        oglas: oglas
    })),
    on(ucitavanjeKategorijaSuccess, (state, {kategorije}) => ({
        ...state,
        kategorijaList: kategorije
    })),
    on(odabranaKategorija, (state, {kategorija}) => ({
        ...state,
        kategorija: kategorija
    })),
    on(oglasiKategorijeUcitani, (state, {oglasi}) => ({
        ...state,
        oglasList: oglasi
    })),

);



// export const oglasReducer = createReducer(
//     InitialOglasState,
//     on(uspesnoVraceniOglasi, (state, {oglasi}) => {console.log(oglasi); return ({
//         ...state,
//         oglasList: oglasi
//     })})
// );

// export function reducer(state: OglasState, action: Action) {
//     return oglasReducer(state, action);
//   }

