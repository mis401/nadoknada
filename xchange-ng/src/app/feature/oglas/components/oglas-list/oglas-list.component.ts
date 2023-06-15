import { Component, OnDestroy, OnInit } from '@angular/core';
import { Oglas } from '../../models/oglas.model';
import { Subscription, tap } from 'rxjs';
import { OglasState } from '../../state/oglas.state';
import { Store } from '@ngrx/store';
import { oglasiListaSelector } from '../../state/oglas.selectors';
import { OglasPreviewComponent } from '../oglas-preview/oglas-preview.component';
import { selektovanOglas, ucitajNajpoznatijeOglase } from '../../state/oglas.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oglas-list',
  templateUrl: './oglas-list.component.html',
  styleUrls: ['./oglas-list.component.scss']
})
export class OglasListComponent implements OnInit, OnDestroy {
  oglasi: Oglas[] = [];
  private oglasiSub: Subscription = new Subscription();
  constructor(private store: Store<OglasState>, private router: Router){}
  ngOnInit(): void {
    this.initSubs();
  }
  ngOnDestroy(): void {
    this.oglasiSub.unsubscribe();
  }


  selektovanOglas(ElemRef: OglasPreviewComponent){
    console.log("Selektovan je" + ElemRef.oglas?.id);
    this.store.dispatch(selektovanOglas({oglas: ElemRef.oglas!}))
    this.router.navigate([`/oglasi/${ElemRef.oglas?.id}`]);
  }


  private initSubs(){
    this.initOglasiSub();
  }
  private initOglasiSub(){
    this.oglasiSub = this.store.select(oglasiListaSelector).pipe(
    ).subscribe({
      next: (oglasi) => {
        if(oglasi.length == 0){
          this.store.dispatch(ucitajNajpoznatijeOglase());
        }
        else{
        console.log(oglasi);
        this.oglasi = [...oglasi];
        this.oglasi.sort((a, b) => b.brojPoseta-a.brojPoseta);
        }
      }
    })
  }
}
