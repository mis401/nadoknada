import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrijaveComponent } from './components/prijave/prijave.component';
import { StoreModule } from '@ngrx/store';
import { Features } from '../Features';
import { EffectsModule } from '@ngrx/effects';
import { PrijavaEffects } from './state/prijava.effects';
import { prijavaReducer } from './state/prijava.reducers';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    PrijaveComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(Features.korisnickaPodrska, prijavaReducer),
    EffectsModule.forFeature([PrijavaEffects]),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    
  ]
})
export class KorisnickaPodrskaModule { 



}
