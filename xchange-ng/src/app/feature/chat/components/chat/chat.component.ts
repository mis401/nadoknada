import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Conversation } from '../model/conversation.model';
import { Message } from '../model/poruka.model';
import { BehaviorSubject, Observable, Subscription, from, take } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];

  konverzacija: Conversation = {
    id: '0',
    usernames: [],
    poruke: [],
    vremeIzmene: new Date(),
    datumPocetka: new Date(),
    userIds: []
  }
  constructor(protected chatService: ChatService, private route: ActivatedRoute, private router: Router) {
  }
  public username : string = '';
  other: string = '';
  messages$ : Subscription = new Subscription();
  convSub : Subscription = new Subscription();
  messageLimit$ : BehaviorSubject<Message> = this.chatService.privateMessages$;

  id : string = '';

  ngOnInit(): void {
    // this.convSub = this.chatService.conversationSubject$.subscribe({
    //   next: (conversation) => {
    //     console.log("Chat slusa sub");
    //     console.log(conversation);
    //     this.konverzacija = {...conversation};
    // }})

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
}
