import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OglasService } from '../../services/oglas.service';

@Component({
  selector: 'app-ponuda-dialog',
  templateUrl: './ponuda-dialog.component.html',
  styleUrls: ['./ponuda-dialog.component.scss']
})
export class PonudaDialogComponent {
  constructor(public dialogRef: MatDialogRef<PonudaDialogComponent>, private service: OglasService) {}

  tekstPonude: string = '';

}
