import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { DropdownModule, NavModule, GridModule, CollapseModule, ButtonModule, CardModule, NavbarModule, NavbarComponent, } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OglasEffects } from '../oglas/state/oglas.effects';
import { Features } from '../Features';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { OglasModule } from '../oglas/oglas.module';
import { oglasReducer } from '../oglas/state/oglas.reducers';
import { OglasListComponent } from '../oglas/components/oglas-list/oglas-list.component';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    HomeComponent, NavBarComponent, WelcomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(Features.oglas, oglasReducer),
    EffectsModule.forFeature([OglasEffects]),
    FormsModule,
    DropdownModule,
    MatListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    NavModule,
    NavbarModule,
    GridModule,
    CollapseModule,
    ButtonModule,
    RouterModule.forChild([{path: 'home', component: HomeComponent}]),
    CardModule,
    OglasModule,
  ],
  exports:[
    HomeComponent, WelcomeComponent, NavBarComponent,
  ]
})
export class HomeModule { }
