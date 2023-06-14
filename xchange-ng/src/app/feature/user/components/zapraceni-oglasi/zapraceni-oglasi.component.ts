import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OglasPreviewComponent } from 'src/app/feature/oglas/components/oglas-preview/oglas-preview.component';
import { Oglas } from 'src/app/feature/oglas/models/oglas.model';
import { OglasService } from 'src/app/feature/oglas/services/oglas.service';
import { selektovanOglas } from 'src/app/feature/oglas/state/oglas.actions';
import { OglasState } from 'src/app/feature/oglas/state/oglas.state';

@Component({
  selector: 'app-zapraceni-oglasi',
  templateUrl: './zapraceni-oglasi.component.html',
  styleUrls: ['./zapraceni-oglasi.component.scss']
})
export class ZapraceniOglasiComponent implements OnInit {
  constructor(private oglasService: OglasService, private router: Router, private store: Store<OglasState>){}
  oglasiSub$ : Subscription = new Subscription();
  oglasi : Oglas[] = [];
  ngOnInit(): void {
    this.oglasiSub$ = this.oglasService.getZapraceniOglasi().subscribe({
      next: (oglasi) => {
        this.oglasi = oglasi;
      }
    })
  }
  selektovanOglas(ElemRef: OglasPreviewComponent){
    this.store.dispatch(selektovanOglas({oglas: ElemRef.oglas!}))
    this.router.navigate([`/oglas`]);
  }
}
