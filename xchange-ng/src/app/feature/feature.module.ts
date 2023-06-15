import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { OglasModule } from './oglas/oglas.module';
import { OglasListComponent } from './oglas/components/oglas-list/oglas-list.component';
import { NavBarComponent } from './home/components/navbar/navbar.component';
import { HomeComponent } from './home/components/home/home.component';
import { WelcomeComponent } from './home/components/welcome/welcome.component';
import { OglasComponent } from './oglas/components/oglas/oglas.component';
import { OglasPreviewComponent } from './oglas/components/oglas-preview/oglas-preview.component';
import { ChatModule } from './chat/chat.module';
import { KorisnickaPodrskaModule } from './korisnicka-podrska/korisnicka-podrska.module';
import { KomentarModule } from './komentar/komentar.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    UserModule,
    OglasModule,
    ChatModule,
    KorisnickaPodrskaModule,
    KomentarModule,
  ],
  exports: [OglasListComponent,
      OglasComponent,
      OglasPreviewComponent,
      HomeComponent,
      WelcomeComponent,
      NavBarComponent,]
})
export class FeatureModule { }
