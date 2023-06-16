import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureModule } from './feature/feature.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './feature/user/components/login/login.component';
import { SignupComponent } from './feature/user/components/signup/signup.component';
import { HomeComponent } from './feature/home/components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './feature/user/state/user.reducers';
import { oglasReducer } from './feature/oglas/state/oglas.reducers';
import * as fromOglas from './feature/oglas/state/oglas.reducers';
import { OglasComponent } from './feature/oglas/components/oglas/oglas.component';
import { OglasListComponent } from './feature/oglas/components/oglas-list/oglas-list.component';
import { OglasModule } from './feature/oglas/oglas.module';
import { HomeModule } from './feature/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { UserProfileComponent } from './feature/user/components/user-profile/user-profile.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NovOglasComponent } from './feature/oglas/components/nov-oglas/nov-oglas.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ChatListComponent } from './feature/chat/components/chat-list/chat-list.component';
import { ChatComponent } from './feature/chat/components/chat/chat.component';
import { MojiOglasiComponent } from './feature/user/components/moji-oglasi/moji-oglasi.component';
import { ZapraceniOglasiComponent } from './feature/user/components/zapraceni-oglasi/zapraceni-oglasi.component';
import { PrijaveComponent } from './feature/korisnicka-podrska/components/prijave/prijave.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { komentarReducer } from './feature/komentar/state/komentar.reducer';
import { chatReducer } from './feature/chat/state/chat.reducers';

@NgModule({
  declarations: [
    AppComponent,
    PonudaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({user: userReducer, oglas: oglasReducer, komentar: komentarReducer, chat: chatReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    MatMomentDateModule,
    FeatureModule,
    EffectsModule.forRoot([]),
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'napravioglas', component: NovOglasComponent},
      {path: 'oglasi/:id', component: OglasComponent},
      {path: 'profil', component: UserProfileComponent},
      {path: 'home', component: HomeComponent},
      {path: 'chat', component: ChatListComponent, children: [
         {path: ':id', component: ChatComponent}],
       },
      {path: 'moji-oglasi', component: MojiOglasiComponent},
      {path: 'zapraceni-oglasi', component: ZapraceniOglasiComponent},
      {path: 'korisnicka-podrska', component: PrijaveComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: '**', redirectTo: '/'}
    ],
    {scrollPositionRestoration: 'enabled'}),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule,
  ],
  exports:[
    OglasListComponent,
  ],
  providers: [httpInterceptorProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'sr-sp'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
