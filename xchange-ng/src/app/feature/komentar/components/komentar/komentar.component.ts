import { Component, Input, OnInit } from '@angular/core';
import { KomentarUser } from '../../models/komentar-user.model';

@Component({
  selector: 'app-komentar',
  templateUrl: './komentar.component.html',
  styleUrls: ['./komentar.component.scss']
})
export class KomentarComponent implements OnInit{
  
    constructor() { }

    @Input()
    komentar: KomentarUser = {
      id: '0',
      tekst: '',
      ocena: 0,
      datumPostavljanja: new Date(),
      ostavioKomentarUsername: ''
    }

    ngOnInit(): void {
      console.log(this.komentar);
    }
    

}
