import { createAction, props } from "@ngrx/store";
import { KomentarUser } from "../models/komentar-user.model";

export const ucitajKomentare = createAction(`[Komentar] Ucitaj komentare`, props<{id: string}>());
export const ucitavanjeKomentaraSuccess = createAction(`[Komentar] Ucitavanje komentara uspesno`, props<{komentari: KomentarUser[]}>());
export const ucitavanjeKomentaraFail = createAction(`[Komentar] Ucitavanje komentara neuspesno`, props<{error: any}>());