import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../components/model/poruka.model';
import jwtDecode from 'jwt-decode';
import { JWT } from '../../user/models/jwt.model';
import { HttpClient } from '@angular/common/http';
import { Conversation } from '../components/model/conversation.model';
import { envLocal, envNet } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  BASE_URL = `${envLocal.api}/chat`;
  public serverMessage$: Observable<Message> = new Observable<Message>();
  public privateMessage$: Observable<Message> = new Observable<Message>();
  username: string = jwtDecode<JWT>(localStorage.getItem('token') || '').username;

  emptyMessage : Message = {
      tekst: '',
      konverzacijaId: '',
      sender: '',
      receiver: '',
      vremeSlanja: new Date()
  }

  constructor(private http: HttpClient) {
    this.serverMessage$ = this.serverMessages$.asObservable(); 
    this.privateMessage$ = this.privateMessages$.asObservable();
    this.socket.on(`messageFor${this.username}`, (message: Message) => {
      console.log(message);
      this.privateMessages$.next(message);
    })
      this.socket.on('messageFromServer', (message: Message) => {
      console.log(message);
      this.serverMessages$.next(message);
    })
  }
  socket = io(`${envLocal.api}`);
  private serverMessages$: BehaviorSubject<Message> = new BehaviorSubject<Message>(this.emptyMessage);
  public privateMessages$: BehaviorSubject<Message> = new BehaviorSubject<Message>(this.emptyMessage);
  public conversationSubject$: BehaviorSubject<Conversation> = new BehaviorSubject<Conversation>({
    id: '',
    usernames:[],
    poruke:[],
    vremeIzmene: new Date(),
    datumPocetka: new Date(),
    userIds: []
  });

  connectToSocket(){
    this.socket.emit('hello', this.username);
  }

  sendMessage(message: Message){
    console.log(message);
    this.socket.emit('messageFromClient', message);
  }

  vratiSkorasnjePoruke() : Observable<Conversation[]>{ 
    return this.http.get<Conversation[]>(`${this.BASE_URL}/skorasnje`);
  }

  loadMessages(konverzacija: string): Observable<Message[]>{
    return this.http.get<Message[]>(`${this.BASE_URL}/vratiPoruke?konverzacija=${konverzacija}`);
  }

  getConversation(id: string): Observable<Conversation>{
    return this.http.get<Conversation>(`${this.BASE_URL}/vratiKonverzaciju?id=${id}`);
  }

  findOrCreateConversation(otherId: string): Observable<Conversation>{
    console.log(otherId);
    return this.http.get<Conversation>(`${this.BASE_URL}/vratiKonverzacijuSaKorisnikom?other=${otherId}`);
  }

}
