import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from '../../services/chat.service';
import { Conversation } from '../model/conversation.model';
import { filter, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  konverzacije: Conversation[] | null = null;
  constructor(private chat: ChatService, private route: ActivatedRoute, private router: Router) {
  }
  username = this.chat.username;
  privateMessage$ = this.chat.privateMessage$;
  serverMessage$ = this.chat.serverMessage$;
  selectedConversation: Conversation | null = null;
  public selectSubject$ = this.chat.conversationSubject$;
  public selectOb$ = this.chat.conversationSubject$.asObservable().pipe(
    filter((conversation) => conversation.id !== ''),
  );
  ngOnInit(): void {
    this.chat.connectToSocket();
    //this.chat.sendMessage("Hello from angular", 'server');
    this.chat.vratiSkorasnjePoruke().pipe(
      take(1),
    ).subscribe({
      next: (konverzacije) => {
        this.konverzacije = [...konverzacije];
        console.log(this.konverzacije);
      }
    })
    
    //this.chat.sendMessage(`Test from ${this.chat.username}`, 'baki');
  }
  selected(conversation: Conversation) {
    //this.selectSubject$.next(conversation);
    this.router.navigate([`/chat/${conversation.id}`]);
  }

}

