import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OglasState } from '../../state/oglas.state';
import { State, Store } from '@ngrx/store';
import { Oglas } from '../../models/oglas.model';
import { AppState } from 'src/app/state/app.state';
import { selectUser } from 'src/app/feature/user/state/user.selector';

@Component({
  selector: 'app-oglas-preview',
  templateUrl: './oglas-preview.component.html',
  styleUrls: ['./oglas-preview.component.scss']
})
export class OglasPreviewComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>){}
  @Input()
  oglas: Oglas | undefined;

  user : string = '';
  
ponudi(){}
prijavi(){}
zaprati(){}
  ngOnInit(): void {
    this.store.select(selectUser).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
    
  }


  ngOnDestroy(): void {
    
  }
}
