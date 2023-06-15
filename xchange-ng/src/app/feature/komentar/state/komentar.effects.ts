import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OglasService } from "../../oglas/services/oglas.service";
import { ucitajKomentare, ucitavanjeKomentaraFail, ucitavanjeKomentaraSuccess } from "./komentar.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { KomentarService } from "../services/komentar.service";

@Injectable()
export class KomentarEffects {
    constructor(private actions$: Actions, private services: KomentarService) {}

    ucitajKomentare$ = createEffect( () => this.actions$.pipe(
        ofType(ucitajKomentare),
        switchMap((action) => this.services.komentariNaKorisnika(action.id).pipe(
            tap((komentari) => console.log("TAP " + komentari)),
            map((komentari) => ucitavanjeKomentaraSuccess({komentari})),
            catchError((error) => of(ucitavanjeKomentaraFail({error})))
        ))
    ))
}
