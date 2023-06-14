import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OglasService } from "../services/oglas.service";
import { prijavaOglasa, neuspesnoPrijavljenOglas, neuspesnoVraceniOglasi, neuspesnoZapracenOglas, pretraziOglase, selektovanOglas, uspesnoPrijavljenOglas, uspesnoVraceniOglasi, uspesnoZapracenOglas, zapratiOglas, ponudaOglasa, uspesnaPonuda, neuspesnaPonuda, ucitajKategorije, ucitavanjeKategorijaSuccess, ucitavanjeKategorijaFail, odabranaKategorija, oglasiKategorijeUcitani } from "./oglas.actions";
import { catchError, map, of, switchMap, take, takeUntil, tap } from "rxjs";

@Injectable()
export class OglasEffects {
    constructor(private actions$: Actions, private services: OglasService) {
        
    }

    vratiOglase$ = createEffect( () => this.actions$.pipe(
        ofType(pretraziOglase),
        switchMap((action) => this.services.vratiOglase(action.oglas, action.kategorija).pipe(
            map((oglasi) => uspesnoVraceniOglasi({oglasi})),
            catchError((error) => of(neuspesnoVraceniOglasi({error})))
        ))
    ))

    zapratiOglas$ = createEffect( () => this.actions$.pipe(
        ofType(zapratiOglas),
        switchMap((action) => this.services.zapratiOglas(action.oglas).pipe(
            tap((oglas) => console.log("TAP " + oglas)),
            map((oglas) => {
                if(oglas && oglas.pretplacujeSeIds){
                oglas.pretplacujeSeIds.push(action.user);
                }
                else if(!oglas.pretplacujeSeIds){
                    oglas.pretplacujeSeIds = [];
                    oglas.pretplacujeSeIds.push(action.user);
                }
                return uspesnoZapracenOglas({oglas})}),
            catchError((error) => of(neuspesnoZapracenOglas({error})))
            )))
        );

    prijaviOglas$ = createEffect( () => this.actions$.pipe(
        ofType(prijavaOglasa),
        switchMap((action) => this.services.prijaviOglas(action.oglas.id, action.razlog).pipe(
            map((prituzba) => uspesnoPrijavljenOglas({prituzba})),
            catchError((error) => of(neuspesnoPrijavljenOglas({error})))
        ))
    ))

    ponudaOglasa$ = createEffect( () => this.actions$.pipe(
        ofType(ponudaOglasa),
        switchMap((action) => this.services.ponudi(action.oglas.id, action.ponuda).pipe(
            map((oglas) => uspesnaPonuda({oglas})),
            catchError((error) => of(neuspesnaPonuda({error})))
        ))
    ))

    ucitajKategorije$ = createEffect( () => this.actions$.pipe(
        ofType(ucitajKategorije),
        switchMap((action) => this.services.vratiSveKategorije().pipe(
            map((kategorije) => ucitavanjeKategorijaSuccess({kategorije})),
            catchError((error) => of(ucitavanjeKategorijaFail({error})))
        ))
    ))

    ucitajOglaseKategorije$ = createEffect( () => this.actions$.pipe(
        ofType(odabranaKategorija),
        switchMap((action) => this.services.vratiOglaseKategorije(action.kategorija).pipe(
            tap((oglasi) => console.log("TAP " + oglasi)),
            map((oglasi) => oglasiKategorijeUcitani({oglasi})),
            catchError((error) => of(neuspesnoVraceniOglasi({error})))
        ))
    ))

}