import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OglasComponent } from './components/oglas/oglas.component';
import { OglasListComponent } from './components/oglas-list/oglas-list.component';
import { OglasPreviewComponent } from './components/oglas-preview/oglas-preview.component';
import { ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { StoreModule } from '@ngrx/store';
import { Features } from '../Features';
import { oglasReducer } from './state/oglas.reducers';
import { EffectsModule } from '@ngrx/effects';
import { OglasEffects } from './state/oglas.effects';
import { HomeModule } from '../home/home.module';
import { NavBarComponent } from '../home/components/navbar/navbar.component';
import { NovOglasComponent } from './components/nov-oglas/nov-oglas.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrijaviOglasDialogComponent } from './components/prijavi-oglas-dialog/prijavi-oglas-dialog.component';
import { PonudaDialogComponent } from './components/ponuda-dialog/ponuda-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { KomentarModule } from '../komentar/komentar.module';
import { SlikaDialogComponent } from './components/slika-dialog/slika-dialog.component';
import { PrihvatanjePonudaDialogComponent } from './components/prihvatanje-ponuda-dialog/prihvatanje-ponuda-dialog.component';








@NgModule({
  declarations: [OglasComponent, 
    OglasListComponent, 
    OglasPreviewComponent, 
    NovOglasComponent, 
    PrijaviOglasDialogComponent, 
    PonudaDialogComponent, 
    SlikaDialogComponent, 
    PonudaDialogComponent, 
    PrihvatanjePonudaDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    KomentarModule,
    StoreModule.forFeature(Features.oglas, oglasReducer, {}),
    EffectsModule.forFeature([OglasEffects]),
    RouterModule,
  ],
  exports: [OglasComponent, OglasListComponent, OglasPreviewComponent],
})
export class OglasModule { }
