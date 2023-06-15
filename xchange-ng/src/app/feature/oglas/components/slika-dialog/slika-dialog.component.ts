import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-slika-dialog',
  templateUrl: './slika-dialog.component.html',
  styleUrls: ['./slika-dialog.component.scss']
})
export class SlikaDialogComponent {
  constructor(public dialogRef: MatDialogRef<SlikaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {url: string}) {}

  
}
