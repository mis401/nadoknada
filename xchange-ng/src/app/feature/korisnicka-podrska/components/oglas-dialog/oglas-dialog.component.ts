import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Oglas } from 'src/app/feature/oglas/models/oglas.model';
import { Prijava } from '../../models/prijava.model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { ucitajOglasPoId } from 'src/app/feature/oglas/state/oglas.actions';
import { oglasSelector } from 'src/app/feature/oglas/state/oglas.selectors';
import { Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-oglas-dialog',
  templateUrl: './oglas-dialog.component.html',
  styleUrls: ['./oglas-dialog.component.scss']
})
export class OglasDialogComponent implements OnInit, OnDestroy {
  
    constructor(public dialogRef: MatDialogRef<OglasDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: {prijava: Prijava},
      private store: Store<AppState>) { }
    
    oglas : Oglas | null = null;
    oglas$ = new Subscription();
    ngOnInit(): void {
      this.store.dispatch(ucitajOglasPoId({id: this.data.prijava.reportovanOglasId}));
      this.oglas$ = this.store.select(oglasSelector).pipe(
      ).subscribe({
        next: (oglas) => {
          if(oglas?.id === this.data.prijava.reportovanOglasId) {
            this.oglas = {...oglas};
          }
        }
      })
    }
    ngOnDestroy(): void {
      this.oglas$.unsubscribe();
    }
}
