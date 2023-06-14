import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { Oglas } from 'src/app/feature/oglas/models/oglas.model';
import { oglasiListaSelector } from 'src/app/feature/oglas/state/oglas.selectors';
import { OglasState } from 'src/app/feature/oglas/state/oglas.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  oglasi: Oglas[] = [];
  constructor(private store: Store<OglasState>){}
  ngOnInit(): void {
    this.initSubs();
  }
  ngOnDestroy(): void {
    this.searchResults.unsubscribe();
  }


  private searchResults: Subscription = new Subscription();
  private initSubs(){
    this.initSearchSub();
  }
  private initSearchSub(){
    this.searchResults = this.store.select(oglasiListaSelector).pipe(
      tap((oglasi) => console.log(oglasi))
    ).subscribe({
      next: (oglasi) => {
        this.oglasi = [...oglasi];
        //sort this.oglasi in descending order by property brojPoseta 
        this.oglasi.sort((a, b) => b.brojPoseta-a.brojPoseta);
      }
    })
  }
}
