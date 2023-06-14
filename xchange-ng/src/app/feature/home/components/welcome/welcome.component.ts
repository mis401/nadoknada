import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Kategorija } from 'src/app/feature/oglas/models/kategorija.model';
import { odabranaKategorija, pretraziOglase, ucitajKategorije } from 'src/app/feature/oglas/state/oglas.actions';
import { kategorijaListSelector } from 'src/app/feature/oglas/state/oglas.selectors';
import { OglasState } from 'src/app/feature/oglas/state/oglas.state';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  constructor(private oglasStore: Store<OglasState>) {}
  kategorijeSub$ : Subscription = new Subscription();
  kategorije: Kategorija[] = [];
  imeOglasa: string = '';
  clear : boolean = false;
  kategorija: string = '';
  pretrazi(){
    console.log("kategorija " +this.kategorija +", oglas " + this.imeOglasa)
    this.oglasStore.dispatch(pretraziOglase({kategorija: this.kategorija, oglas: this.imeOglasa}));
  }
  ocistiKat(){
    this.kategorija = '';
    this.clear=true;
    this.clear=false;
  }

  ngOnInit(): void {
    this.oglasStore.dispatch(ucitajKategorije());
    this.kategorijeSub$ = this.oglasStore.select(kategorijaListSelector).subscribe({
      next: (kategorije) => {
        this.kategorije = [...kategorije];
        console.log("init"+this.kategorije);      }
    })
  }


  ngOnDestroy(): void {
    this.kategorijeSub$.unsubscribe();
  }
}
