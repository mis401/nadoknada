import { createAction, props } from "@ngrx/store";
import { Oglas } from "../models/oglas.model";
import { Kategorija } from "../models/kategorija.model";
import { Prituzba } from "../models/prituzba.model";
import { PrituzbaDTO } from "../../korisnicka-podrska/models/prituzbaDTO.model";

export const ucitajTopOglase = createAction('[Oglas] Ucitaj top oglase', props<{oglasi: Oglas[]}>());

export const pretraziOglase = createAction(`[Oglas] pretraga oglasa`, props<{oglas: string, kategorija: string}>());

export const uspesnoVraceniOglasi = createAction(`[Oglas] Uspesno vraceni oglasi`, props<{oglasi: Oglas[]}>());
export const neuspesnoVraceniOglasi = createAction(`[Oglas] Neuspesno vracanje oglasa`, props<{error: any}>());

export const selektovanOglas = createAction(`[Oglas] Selektovan oglas`, props<{oglas: Oglas}>());

export const zapratiOglas = createAction(`[Oglas] Zapracivanje oglasa`, props<{oglas: Oglas, user: string}>());
export const uspesnoZapracenOglas = createAction(`[Oglas] Uspesno zapracen oglas`, props<{oglas: Oglas}>());
export const neuspesnoZapracenOglas = createAction(`[Oglas] Neuspesno zapracen oglas`, props<{error: any}>());

export const prijavaOglasa = createAction(`[Oglas] Prijava oglasa`, props<{oglas: Oglas, razlog: string}>());
export const uspesnoPrijavljenOglas = createAction(`[Oglas] Uspesno prijavljen oglas`, props<{prituzba: PrituzbaDTO}>());
export const neuspesnoPrijavljenOglas = createAction(`[Oglas] Neuspesno prijavljen oglas`, props<{error: any}>());

export const ponudaOglasa = createAction(`[Oglas] Ponuda oglasa`, props<{oglas: Oglas, ponuda: string}>());
export const uspesnaPonuda = createAction(`[Oglas] Uspesna ponuda oglasa`, props<{oglas: Oglas}>());
export const neuspesnaPonuda = createAction(`[Oglas] Neuspesna ponuda oglasa`, props<{error: any}>());

export const ucitajKategorije = createAction(`[Oglas] Ucitaj kategorije`);
export const ucitavanjeKategorijaSuccess = createAction(`[Oglas] Ucitavanje kategorija uspesno`, props<{kategorije: Kategorija[]}>());
export const ucitavanjeKategorijaFail = createAction(`[Oglas] Ucitavanje kategorija neuspesno`, props<{error: any}>());

export const odabranaKategorija = createAction(`[Oglas] Odabrana kategorija`, props<{kategorija: Kategorija}>());
export const oglasiKategorijeUcitani = createAction(`[Oglas] Oglasi kategorije ucitani`, props<{oglasi: Oglas[]}>());

export const ucitajOglasPoId = createAction(`[Oglas] Ucitaj oglas po id`, props<{id: string}>());
export const ucitajOglasPoIdSuccess = createAction(`[Oglas] Ucitavanje oglasa po id uspesno`, props<{oglas: Oglas}>());
export const ucitajOglasPoIdFail = createAction(`[Oglas] Ucitavanje oglasa po id neuspesno`, props<{error: any}>());

export const ucitajNajpoznatijeOglase = createAction(`[Oglas] Ucitaj najpoznatije oglase`);
export const ucitavanjeNajpoznatijihOglasaSuccess = createAction(`[Oglas] Ucitavanje najpoznatijih oglasa uspesno`, props<{oglasi: Oglas[]}>());
export const ucitavanjeNajpoznatijihOglasaFail = createAction(`[Oglas] Ucitavanje najpoznatijih oglasa neuspesno`, props<{error: any}>());

