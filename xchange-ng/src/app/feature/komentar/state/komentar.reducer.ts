import { createReducer, on } from "@ngrx/store";
import { InitialKomentarState } from "./komentar.state";
import { ucitavanjeKomentaraFail, ucitavanjeKomentaraSuccess } from "./komentar.actions";

export const komentarReducer = createReducer(
    InitialKomentarState,
    on(ucitavanjeKomentaraSuccess, (state, {komentari}) => ({
        ...state,
        komentari: komentari
    })),
    on(ucitavanjeKomentaraFail, (state, {error}) => ({
        ...state,
        error: error
    }))
)