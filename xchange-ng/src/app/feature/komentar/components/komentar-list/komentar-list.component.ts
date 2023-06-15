import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { KomentarState } from '../../state/komentar.state';
import { Store } from '@ngrx/store';
import { KomentarUser } from '../../models/komentar-user.model';
import { komentariSelector } from '../../state/komentar.selectors';
import { Subscription } from 'rxjs';
import { ucitajKomentare } from '../../state/komentar.actions';

@Component({
  selector: 'app-komentar-list',
  templateUrl: './komentar-list.component.html',
  styleUrls: ['./komentar-list.component.scss']
})
export class KomentarListComponent implements OnInit, OnDestroy{
  constructor(private store: Store<KomentarState>) { }
  komentari$ : Subscription = new Subscription();
  komentari: KomentarUser[] = [];
  
  @Input()
  public userId: string = '';

  ngOnInit(): void {
    console.log("Oglas je: " + this.userId);
    if (this.userId != '')
      this.store.dispatch(ucitajKomentare({id: this.userId}));
    this.initSubs();
  }

  private initSubs(){
    this.initKomentariSub();
  }
  private initKomentariSub(){
    this.komentari$ = this.store.select(komentariSelector).subscribe({
      next: (komentari) => {
        if(komentari) {
          this.komentari = [...komentari];
          console.log("Komentari: " + this.komentari);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.komentari$.unsubscribe();
  }
}
