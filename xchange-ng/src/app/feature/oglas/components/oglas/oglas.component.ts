import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take, zip } from 'rxjs';
import { Oglas } from '../../models/oglas.model';
import { OglasService } from '../../services/oglas.service';
import { OglasState } from '../../state/oglas.state';
import { Store } from '@ngrx/store';
import { ponudaOglasa, prijavaOglasa, selektovanOglas, zapratiOglas } from '../../state/oglas.actions';
import { kategorijaListSelector, oglasSelector } from '../../state/oglas.selectors';
import { RoundOffsets } from '@popperjs/core/lib/modifiers/computeStyles';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { selectUser } from 'src/app/feature/user/state/user.selector';
import jwtDecode from 'jwt-decode';
import { JWT } from 'src/app/feature/user/models/jwt.model';
import { MatDialog } from '@angular/material/dialog';
import { PrijaviOglasDialogComponent } from '../prijavi-oglas-dialog/prijavi-oglas-dialog.component';
import { PonudaDialogComponent } from '../ponuda-dialog/ponuda-dialog.component';
import { ChatService } from 'src/app/feature/chat/services/chat.service';
import { Kategorija } from '../../models/kategorija.model';

@Component({
  selector: 'app-oglas',
  templateUrl: './oglas.component.html',
  styleUrls: ['./oglas.component.scss']
})
export class OglasComponent implements OnInit, OnDestroy {
  constructor(private oglasService: OglasService,
    private chatService: ChatService,
     private store: Store<AppState>, 
     private router: Router,
     public dialog: MatDialog){}
  // private oglasSub : Subscription = new Subscription();
  // private userSub : Subscription = new Subscription();
  jointStateSub$ : Subscription = new Subscription();
  oglas$ = this.store.select(oglasSelector);
  userId$ = this.store.select(selectUser);
  oglas: Oglas | null = null;
  userId: string | undefined;
  username='';
  kategorije : Kategorija[] = [];
  kategorija: Kategorija = {
    id: '',
    naziv: ''
  }
  redirect(){
    this.router.navigate(['/home']);
  }
  prati: boolean = false;

  jointState$ = zip(this.oglas$, this.userId$);

  ponudi(){
    const ponudaDialog = this.dialog.open(PonudaDialogComponent);
    ponudaDialog.afterClosed().subscribe({
      next: (result) => {
        console.log(`Ponuda je ${result}`);
        if(result !== ''){
          this.store.dispatch(ponudaOglasa({oglas: this.oglas!, ponuda: result}));
        }
      }
    })
  }
  prijavi(){
    const prijavaDialog = this.dialog.open(PrijaviOglasDialogComponent);
    prijavaDialog.afterClosed().subscribe({
      next: (result) => {
        if(result !== ''){
          this.store.dispatch(prijavaOglasa({oglas: this.oglas!, razlog: result}));
        }
      }
    })
  }

  zaprati() {
    console.log(this.oglas?.id, this.username);
    this.store.dispatch(zapratiOglas({oglas: this.oglas!, user: this.username}));
  }
  
  chat(){
    let conversationId = '';
    console.log("Oglas napravio "+this.oglas?.kreiraoKorisnikId!);
    this.chatService.findOrCreateConversation(this.oglas?.kreiraoKorisnikId!).subscribe({
      next: (conversation) => {
        console.log("servis foc "+conversation)
        conversationId = conversation.id;
        console.log("Klik na ikonicu"+conversationId);
        this.router.navigate([`/chat/${conversationId}`]);
      }
    })
  }

  ngOnInit(): void {
    this.store.select(kategorijaListSelector).pipe(
      take(1)
    ).subscribe({
      next: (kategorije) => {
        this.kategorije = kategorije;
      }
    })
    this.jointStateSub$ = this.jointState$.subscribe({
      next: ([oglas, userId]) => {
        if(userId){
          this.userId=jwtDecode<JWT>(userId).sub;
        if(oglas){
          this.oglas = oglas;
          if (!oglas.pretplacujeSeIds)
          this.oglas.pretplacujeSeIds = [];
          this.prati = oglas.pretplacujeSeIds!.includes(this.userId);
          console.log(`debug`);
          console.log(oglas.kategorijaIds);
          if (this.oglas.kreiraoKorisnikId == this.userId){
            this.prati=true;
          }
          let index = this.kategorije.findIndex(kategorija => kategorija.id == oglas.kategorijaIds!.at(0));
          this.kategorija=this.kategorije[index];
          console.log("Kategorija" + this.kategorija.naziv);
        }
      }
      }
    })

    this.oglasService.vidjen(this.oglas!.id);
    console.log(this.userId);
    console.log(this.oglas!.id)
  }
  // private initSubs(){
  //   this.initOglasSub();
  //   this.initUserSub();
  // }
  // private initOglasSub(){
  //   this.oglasSub = this.oglas$.subscribe({
  //     next: (oglas) => {
  //       if(oglas){
  //         this.oglas = oglas;
  //         if (!oglas.pretplacujeSeIds)
  //           this.oglas.pretplacujeSeIds = [];
  //         this.prati = oglas.pretplacujeSeIds!.includes(jwtDecode<JWT>(this.userId!).sub);
  //       }
  //     }
  //   })
  // }
  // private initUserSub(){
  //   this.userSub = this.userId$.pipe(

  //     ).subscribe({
  //     next: (userId) => {
  //       if(userId){
  //         this.userId=jwtDecode<JWT>(userId).sub;
  //         if (userId == this.oglas!.kreiraoKorisnikId){
  //           this.prati=true;
  //         }
  //       }
  //     }
  //   })
  // }

  ngOnDestroy(): void {
    // this.oglasSub.unsubscribe();
    // this.userSub.unsubscribe();
    this.jointStateSub$.unsubscribe();
  }

  izmeni(){}
  obrisi(){}
}
