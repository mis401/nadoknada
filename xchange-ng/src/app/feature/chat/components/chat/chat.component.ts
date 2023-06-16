import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Conversation } from '../model/conversation.model';
import { Message } from '../model/poruka.model';
import { BehaviorSubject, Observable, Subscription, from, take } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NovKomentarDialogComponent } from 'src/app/feature/komentar/components/nov-komentar-dialog/nov-komentar-dialog.component';
import { KomentarService } from 'src/app/feature/komentar/services/komentar.service';
import jwtDecode from 'jwt-decode';
import { JWT } from 'src/app/feature/user/models/jwt.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  messages: Message[] = [];

  konverzacija: Conversation = {
    id: '0',
    usernames: [],
    poruke: [],
    vremeIzmene: new Date(),
    datumPocetka: new Date(),
    userIds: []
  }
  constructor(protected chatService: ChatService, 
    private route: ActivatedRoute, 
    private router: Router,
    public dialog: MatDialog,
    private komentarService: KomentarService) {
  }
  public username : string = localStorage.getItem('token') == null ? '' : jwtDecode<JWT>(localStorage.getItem('token')!).username;
  other: string = '';
  messages$ : Subscription = new Subscription();
  convSub : Subscription = new Subscription();
  messageLimit$ : BehaviorSubject<Message> = this.chatService.privateMessages$;
  @ViewChild('scrollable') private myScrollContainer: ElementRef = new ElementRef('scrollable');

  id : string = '';

  scrollToBottom():void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngOnInit(): void {
    // this.convSub = this.chatService.conversationSubject$.subscribe({
    //   next: (conversation) => {
    //     console.log("Chat slusa sub");
    //     console.log(conversation);
    //     this.konverzacija = {...conversation};
    // }})
    this.scrollToBottom();
    this.convSub = this.route.params.subscribe
    ((params: Params) => {
      this.id = params['id'];
      console.log("this id " + this.id);
      this.chatService.getConversation(this.id).pipe(
        take(1),
      ).subscribe({
        next: (conversation) => {
          this.konverzacija = {...conversation};
          this.username = this.chatService.username;
          this.other = this.konverzacija.usernames[0] === this.chatService.username ? this.konverzacija.usernames[1] : this.konverzacija.usernames[0];
          console.log(this.konverzacija);
        }
    });
    });

    // this.chatService.loadMessages(this.konverzacija.id).pipe(
    //   take(1),
    // ).subscribe({
    //   next: (messages) => {
    //     this.konverzacija.poruke = [...this.konverzacija.poruke, ...messages];
    //   }
    // })
    this.messages$ = this.chatService.privateMessage$.subscribe({
      next: (message) => {
        this.konverzacija.poruke.unshift(message);
        console.log(message);
      }
    })

   
    console.log(this.konverzacija.usernames);
  }

  ngOnDestroy(): void {
    console.log("destroy chat");
    this.messages$.unsubscribe();
    this.convSub.unsubscribe();
  }
  
  messageText : string = '';

  sendMessage() {
    if(this.messageText.trim().length == 0) return;
    const newMessage : Message = {
      sender: this.username,
      receiver: this.other,
      tekst: this.messageText,
      konverzacijaId: this.konverzacija.id,
      vremeSlanja: new Date(),
    }
    this.chatService.sendMessage(newMessage);
    this.messageLimit$.next(newMessage);
    this.messageText = '';
    console.log(this.konverzacija.poruke);
  }

  oceni(){
    console.log(this.username, this.other);
    const novKomentarDialog = this.dialog.open(NovKomentarDialogComponent, {
      data: {
        userKojiOstavljaId: this.username,
        userKomSeOstavljaId: this.other,
        userKomSeOstavljaUsername: this.other
      }
    })
    novKomentarDialog.afterClosed().subscribe( {
      next: (result) => {
        if (result != null && result != undefined) {
          console.log(result);
          this.komentarService.dodajKomentar(result).subscribe({});
        }
      }
    })
  }


  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
}
