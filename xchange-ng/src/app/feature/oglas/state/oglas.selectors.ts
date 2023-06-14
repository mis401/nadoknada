import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { OglasState } from "./oglas.state";
import { Features } from "../../Features";

export const oglasiFeatureSelector = 
            createFeatureSelector<OglasState>(Features.oglas);

export const oglasiListaSelector = 
            createSelector(oglasiFeatureSelector, (oglasState) => oglasState.oglasList);

export const oglasSelector = createSelector(oglasiFeatureSelector, (oglasState) => oglasState.oglas);

export const kategorijaListSelector = createSelector(oglasiFeatureSelector, (oglasState) => oglasState.kategorijaList);
export const kategorijaSelector = createSelector(oglasiFeatureSelector, (oglasState) => oglasState.kategorija);