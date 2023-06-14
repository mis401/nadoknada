import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { KorisnickaPodrskaService } from "../services/korisnicka-podrska.service";
import { ucitajPrijave, ucitajPrijaveFail, ucitajPrijaveSuccess } from "./prijava.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class PrijavaEffects{
    constructor(private action$: Actions, private services: KorisnickaPodrskaService){}
    ucitajPrijave$ = createEffect(() => this.action$.pipe(
        ofType(ucitajPrijave),
        switchMap((action) => this.services.ucitajPrijave().pipe(
            map((prijave) => ucitajPrijaveSuccess({prijave})),
            catchError((error) => of(ucitajPrijaveFail({error})))
        ))
    ))
    
        
}