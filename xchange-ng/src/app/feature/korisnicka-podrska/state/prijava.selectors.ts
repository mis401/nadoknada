import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PrijavaState } from "./prijava.state";
import { Features } from "../../Features";


export const prijaveFeatureSelector = createFeatureSelector<PrijavaState>(Features.korisnickaPodrska);

export const prijaveListaSelector = createSelector(prijaveFeatureSelector, (prijavaState) => prijavaState.prijave);