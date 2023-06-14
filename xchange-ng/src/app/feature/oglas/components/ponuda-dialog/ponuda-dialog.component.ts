import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ponuda-dialog',
  templateUrl: './ponuda-dialog.component.html',
  styleUrls: ['./ponuda-dialog.component.scss']
})
export class PonudaDialogComponent {
  constructor(public dialogRef: MatDialogRef<PonudaDialogComponent>) {}

  tekstPonude: string = '';

}
