import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatestWith, take, zip } from 'rxjs';
import { Oglas } from '../../models/oglas.model';
import { OglasService } from '../../services/oglas.service';
import { OglasState } from '../../state/oglas.state';
import { Store } from '@ngrx/store';
import { ponudaOglasa, prijavaOglasa, selektovanOglas, ucitajOglasPoId, zapratiOglas } from '../../state/oglas.actions';
import { kategorijaListSelector, oglasSelector } from '../../state/oglas.selectors';
import { RoundOffsets } from '@popperjs/core/lib/modifiers/computeStyles';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { selectUser } from 'src/app/feature/user/state/user.selector';
import jwtDecode from 'jwt-decode';
import { JWT } from 'src/app/feature/user/models/jwt.model';
import { MatDialog } from '@angular/material/dialog';
import { PrijaviOglasDialogComponent } from '../prijavi-oglas-dialog/prijavi-oglas-dialog.component';
import { PonudaDialogComponent } from '../ponuda-dialog/ponuda-dialog.component';
import { ChatService } from 'src/app/feature/chat/services/chat.service';
import { Kategorija } from '../../models/kategorija.model';
import { SlikaDialogComponent } from '../slika-dialog/slika-dialog.component';
import { envLocal } from 'src/env';
import { PrihvatanjePonudaDialogComponent } from '../prihvatanje-ponuda-dialog/prihvatanje-ponuda-dialog.component';

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
    public dialog: MatDialog,
    private route: ActivatedRoute){}
  // private oglasSub : Subscription = new Subscription();
  // private userSub : Subscription = new Subscription();
  @Input()
  inputOglas: Oglas | null = null;
  jointStateSub$ : Subscription = new Subscription();
  oglas$ = this.store.select(oglasSelector);
  userId$ = this.store.select(selectUser);
  oglas: Oglas | null = null;
  oglasId: string | null = null;
  userId: string = '';
  username='';
  redirect(){
    this.router.navigate(['/home']);
  }
  prati: boolean = false;
  @Input()
  vlasnik: boolean = false;

  //jointState$ = zip(this.oglas$, this.userId$);

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
  vidiPonude(){
    const ponudeDialog = this.dialog.open(PrihvatanjePonudaDialogComponent, {data: {oglasId: this.oglasId}});
    ponudeDialog.afterClosed().subscribe({
      next: (result) => {
        if (result){
          console.log(`Ponuda je ${result}`);
          this.oglasService.prihvatiPonudu(result).subscribe({
            next: (res) => {
              console.log(res);
            }
          })  
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

  otvoriSliku(){
    const dialogRef = this.dialog.open(SlikaDialogComponent, {
      data: {url: `${envLocal.api}/slika/imeSlike/${this.oglas!.slike}`}});
    }
    
  obrisi(){
    this.oglasService.obrisiOglas(this.oglasId!).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      }
    })
  }

  izmeni(){
    this.router.navigate([`/oglasi/izmeni/${this.oglasId}`]);
  }


  ngOnInit(): void {
    if(this.inputOglas!=null)
      this.oglas = this.inputOglas;
    else{
      this.oglas$.pipe(
        combineLatestWith(this.userId$),
      ).subscribe({
        next: ([oglas, userToken]) => {
          if(userToken != '' && userToken != null){
            this.userId=jwtDecode<JWT>(userToken).sub;
          }
          if(oglas == null) {
            this.route.params.pipe(
              take(1)
            ).subscribe((params : Params) => {
              this.oglasId=params['id'];
              this.store.dispatch(ucitajOglasPoId({id: this.oglasId!}))
            })
          }
          if(oglas != null && oglas != undefined){
            this.oglas = {...oglas};
            this.username = this.oglas.kreiraoKorisnikUsername!;
            this.userId = this.oglas.kreiraoKorisnikId!;
            console.log("Ucitan u this.oglas: " + this.oglas);
            if (!oglas.pretplacujeSeIds)
            this.oglas.pretplacujeSeIds = [];
            this.prati = oglas.pretplacujeSeIds!.includes(this.userId);
            console.log(`debug`);
            console.log(this.oglas.kategorijaIds);
            if (this.oglas.kreiraoKorisnikId == this.userId){
              this.vlasnik=true;
            }
            this.oglasService.vidjen(this.oglas!.id);
            console.log("vidjen");
            if(this.oglas.kategorije == null)
            this.oglas!.kategorije = [];
          }
        }
      })
    }
  }

  // ngOnInit(): void {
  //   console.log(this.route.snapshot)
  //   if(this.inputOglas != null)
  //     this.oglas = this.inputOglas;
  //   else{ 
  //     this.userId$.pipe(
  //       combineLatestWith(this.oglas$),
  //     ).subscribe({
  //       next: ([userToken, oglas]) => {
  //         console.log("oba emituju");
  //         if(userToken != '' && userToken != null){
  //           this.userId=jwtDecode<JWT>(userToken).sub;
  //           if (oglas == null){
  //             this.route.params.pipe(
  //               take(1)
  //             ).subscribe((params : Params) => {
  //               this.oglasId=params['id'];
  //               this.store.dispatch(ucitajOglasPoId({id: this.oglasId!}))
  //             })
  //           }
  //           if(oglas !== null)
  //           {
  //             this.oglas = {...oglas};
  //             console.log("Ucitan u this.oglas: " + this.oglas);
  //             if (!oglas.pretplacujeSeIds)
  //             this.oglas.pretplacujeSeIds = [];
  //             this.prati = oglas.pretplacujeSeIds!.includes(this.userId);
  //             console.log(`debug`);
  //             console.log(this.oglas.kategorijaIds);
  //             if (this.oglas.kreiraoKorisnikId == this.userId){
  //               this.vlasnik=true;
  //             }
  //             this.oglasService.vidjen(this.oglas!.id);
  //             console.log("vidjen");
  //             if(this.oglas.kategorije == null)
  //               this.oglas!.kategorije = [];
              
  //           }
  //         }
  //       }
  //     })
  //   }
  // }
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

}
