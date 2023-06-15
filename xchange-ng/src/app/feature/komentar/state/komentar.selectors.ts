import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Features } from "../../Features";
import { KomentarState } from "./komentar.state";

export const komentarFeatureSelector = createFeatureSelector<KomentarState>(Features.komentar);

export const komentariSelector = createSelector(komentarFeatureSelector, (komentarState) => komentarState.komentari);