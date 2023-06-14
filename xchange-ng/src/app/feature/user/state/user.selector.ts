import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";
import { Features } from "../../Features";

export const userFeatureSelector = createFeatureSelector<UserState>(Features.user);
export const selectUser = createSelector(userFeatureSelector, (userState) => userState.token);

export const selectFullUser = createSelector(userFeatureSelector, (userState) => userState.user);