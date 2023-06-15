import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OglasService } from '../../services/oglas.service';
import { Ponuda } from '../../models/ponuda.model';
import { Oglas } from '../../models/oglas.model';

@Component({
  selector: 'app-prihvatanje-ponuda-dialog',
  templateUrl: './prihvatanje-ponuda-dialog.component.html',
  styleUrls: ['./prihvatanje-ponuda-dialog.component.scss']
})
export class PrihvatanjePonudaDialogComponent {
  constructor(public dialogRef: MatDialogRef<PrihvatanjePonudaDialogComponent>, 
    private oglasService: OglasService,
    @Inject(MAT_DIALOG_DATA) public data: {oglasId: string}) {}

  ponude: Ponuda[] = [];
  oglas: Oglas | null = null;

  odabranaPonuda: string = '';
  select(ponudaId: string){
    console.log(ponudaId);
    this.odabranaPonuda = ponudaId;
  }
  ngOnInit(): void {
    this.oglasService.ucitajPonudeZaOglas(this.data.oglasId).subscribe({
      next: (ponude) => {
        if(ponude.length > 0) {
          this.ponude = [...ponude];
          console.log(this.ponude);
          this.oglas = this.ponude[0].oglas!;
        }
      }
    })
  }
}
