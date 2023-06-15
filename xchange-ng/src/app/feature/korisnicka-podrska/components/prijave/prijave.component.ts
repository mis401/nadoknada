import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PrijavaState } from '../../state/prijava.state';
import { Store } from '@ngrx/store';
import { prijaveListaSelector } from '../../state/prijava.selectors';
import { Prijava } from '../../models/prijava.model';
import { ucitajPrijave, ukloniPrijavu } from '../../state/prijava.actions';
import { OglasService } from 'src/app/feature/oglas/services/oglas.service';
import { AuthService } from 'src/app/feature/user/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { OglasDialogComponent } from '../oglas-dialog/oglas-dialog.component';

@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.component.html',
  styleUrls: ['./prijave.component.scss']
})
export class PrijaveComponent implements OnInit, OnDestroy{
  prijaveSub$ : Subscription = new Subscription();
  constructor(private store: Store<PrijavaState>, 
    private oglasService: OglasService, 
    private authService: AuthService,
    public dialogRef: MatDialog) { }
  prijave: Prijava[] | null = null;


  ngOnInit(): void {
    this.store.dispatch(ucitajPrijave());
    this.prijaveSub$ = this.store.select(prijaveListaSelector).subscribe({
      next: (prijave) => {
        this.prijave = [...prijave];
        console.log(this.prijave[0]);
      }
    }) 
  }


pogledaj(prijava: Prijava){
  const dialogRef = this.dialogRef.open(OglasDialogComponent, {data: {prijava: prijava}, minWidth: '1024px', minHeight: '500px'});
}

obrisiOglas(prijava: Prijava){
  this.store.dispatch(ukloniPrijavu({id: prijava.id}));
  this.oglasService.resiPrijavu(prijava.id, 'obrisanoglas').subscribe({
    next: (res) => {
      console.log(res)
    }
  })
}

obrisiKorisnika(prijava: Prijava){
  this.store.dispatch(ukloniPrijavu({id: prijava.id}));
  this.oglasService.resiPrijavu(prijava.id, 'obrisankorisnik').subscribe({
    next: (res) => {
      console.log(res)
    }
  })
}

otkazi(prijava: Prijava){
  this.store.dispatch(ukloniPrijavu({id: prijava.id}));
  this.oglasService.resiPrijavu(prijava.id, 'otkazana').subscribe({
    next: (res) => {
      console.log(res)
    }
  })
}
  ngOnDestroy(): void {
    this.prijaveSub$.unsubscribe();
  }
}
