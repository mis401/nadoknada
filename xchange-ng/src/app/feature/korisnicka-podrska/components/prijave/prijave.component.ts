import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PrijavaState } from '../../state/prijava.state';
import { Store } from '@ngrx/store';
import { prijaveListaSelector } from '../../state/prijava.selectors';
import { Prijava } from '../../models/prijava.model';
import { ucitajPrijave } from '../../state/prijava.actions';
import { OglasService } from 'src/app/feature/oglas/services/oglas.service';
import { AuthService } from 'src/app/feature/user/services/auth.service';

@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.component.html',
  styleUrls: ['./prijave.component.scss']
})
export class PrijaveComponent implements OnInit, OnDestroy{
  prijaveSub$ : Subscription = new Subscription();
  constructor(private store: Store<PrijavaState>, private oglasService: OglasService, private authService: AuthService) { }
  prijave: Prijava[] = [];


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
}

obrisiOglas(prijava: Prijava){
  this.oglasService.obrisiOglas(prijava.reportovanOglasId).subscribe();
}

obrisiKorisnika(prijava: Prijava){
  this.authService.deleteUser(prijava.repotovanKorisnikId).subscribe();
}
  ngOnDestroy(): void {
    this.prijaveSub$.unsubscribe();
  }
}
