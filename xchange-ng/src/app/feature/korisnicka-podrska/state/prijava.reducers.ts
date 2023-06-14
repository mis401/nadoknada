import { createReducer, on } from "@ngrx/store"
import { initialPrijavaState } from "./prijava.state"
import { ucitajPrijaveFail, ucitajPrijaveSuccess } from "./prijava.actions"

export const prijavaReducer = createReducer(
    initialPrijavaState,
    on(ucitajPrijaveSuccess, (state, {prijave}) => {
        return {
            ...state,
            prijave: prijave
        }
    }),
    on(ucitajPrijaveFail, (state, {error}) => {
        return {
            ...state,
            error: error
        }
    })
)
    