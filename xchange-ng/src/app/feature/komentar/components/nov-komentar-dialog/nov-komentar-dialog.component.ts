import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Komentar } from '../../models/komentar.model';


@Component({
  selector: 'app-nov-komentar-dialog',
  templateUrl: './nov-komentar-dialog.component.html',
  styleUrls: ['./nov-komentar-dialog.component.scss']
})
export class NovKomentarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NovKomentarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userKojiOstavljaId: string, 
      userKomSeOstavljaId: string, 
      userKomSeOstavljaUsername: string}
  ) { }

  komentar: Komentar ={
    id: '',
    tekst: '',
    ocena: 0,
    datumPostavljanja: new Date(),
    userkomeJeOstavljenKomentarId: this.data.userKomSeOstavljaId,
    userOstavioKomentarId: this.data.userKojiOstavljaId,
  }
}
