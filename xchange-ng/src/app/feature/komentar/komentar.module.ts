import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KomentarComponent } from './components/komentar/komentar.component';
import { Store, StoreModule } from '@ngrx/store';
import { Features } from '../Features';
import { EffectsModule } from '@ngrx/effects';
import { KomentarEffects } from './state/komentar.effects';
import { komentarReducer } from './state/komentar.reducer';
import { KomentarListComponent } from './components/komentar-list/komentar-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { NovKomentarDialogComponent } from './components/nov-komentar-dialog/nov-komentar-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    KomentarComponent,
    KomentarListComponent,
    NovKomentarDialogComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(Features.komentar, komentarReducer, {}),
    EffectsModule.forFeature([KomentarEffects]),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
  ],
  exports: [KomentarComponent, KomentarListComponent, NovKomentarDialogComponent],
})
export class KomentarModule { }
