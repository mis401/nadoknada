import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prijavi-oglas-dialog',
  templateUrl: './prijavi-oglas-dialog.component.html',
  styleUrls: ['./prijavi-oglas-dialog.component.scss']
})
  export class PrijaviOglasDialogComponent {
    constructor(public dialogRef: MatDialogRef<PrijaviOglasDialogComponent>) {}
    tekstPrijave: string = '';
}
