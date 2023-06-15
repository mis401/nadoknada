import { createAction, props, } from "@ngrx/store";
import { Prijava } from "../models/prijava.model";

export const ucitajPrijave = createAction(`[Korisnicka podrsa] Ucitaj prijave`);
export const ucitajPrijaveSuccess = createAction(`[Korisnicka podrsa] Ucitaj prijave uspesno`, props<{prijave: Prijava[]}>());
export const ucitajPrijaveFail = createAction(`[Korisnicka podrsa] Ucitaj prijave neuspesno`, props<{error: any}>());

export const ukloniPrijavu = createAction(`[Korisnicka podrsa] Ukloni prijavu`, props<{id: string}>());
