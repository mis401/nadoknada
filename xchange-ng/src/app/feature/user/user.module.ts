import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Store, StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducers';
import { Features } from '../Features';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserEffects } from './state/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CardModule, FormModule, GridModule } from '@coreui/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDeleteDialogComponent } from './components/user-delete-dialog/user-delete-dialog.component';
import { MojiOglasiComponent } from './components/moji-oglasi/moji-oglasi.component';
import { OglasModule } from '../oglas/oglas.module';
import { ZapraceniOglasiComponent } from './components/zapraceni-oglasi/zapraceni-oglasi.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    UserDeleteDialogComponent,
    MojiOglasiComponent,
    ZapraceniOglasiComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    OglasModule,
    StoreModule.forFeature(Features.user, userReducer, {}),
    EffectsModule.forFeature([UserEffects]),

  ]
})
export class UserModule { }
