import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import {Server} from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from 'src/chat/models/message.model';
import { Observable, map, of } from 'rxjs';
import { Konverzacija, Poruka } from '@prisma/client';
import { Conversation } from './models';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway{
    constructor(private prismaService: PrismaService){}
    @WebSocketServer()
    server: Server;
    users: string[] = [];

    @SubscribeMessage('hello')
    async handleConnection(@MessageBody() data: string): Promise<Observable<WsResponse<string>>>{
        const response = "Uspesno povezan na server";
        console.log("Konektovan na server");
        this.users.push(data);
        return of(response).pipe(
            map((msg) => ({event: 'hello', data: msg})
            ),
        );
    }

    @SubscribeMessage('disconnect')
    async handleDisconnect(@MessageBody() data: string): Promise<Observable<WsResponse<string>>>{
        const response = "Uspesno diskonektovan sa servera";
        this.users.splice(this.users.indexOf(data), 1);
        return of(response).pipe(
            map((msg) => ({event: 'disconnect', data: msg})
            ),
        );        
    }



    @SubscribeMessage('messageFromClient')
    async handleMessage(@MessageBody() data: Message) : Promise<Observable<WsResponse<string>>>{
            console.log(`Primljeno od ${data.sender} za ${data.receiver} sa tekstom ${data.tekst}`);
            const sender = await this.findSender(data.sender);
            const receiver = await this.findReceiver(data.receiver);
            
            let konverzacija = await this.findConversation(sender, receiver);
            if(!konverzacija){
                konverzacija = await this.createConversation(sender, receiver);
            }
            console.log(konverzacija.id);
            const poruka = await this.createMessage(konverzacija, data.tekst, sender, receiver);
            //convert poruka to message of type Message
            const msg: Message = {
                id: poruka.id,
                sender: data.sender,
                receiver: data.receiver,
                tekst: data.tekst,
                vremeSlanja: poruka.vremeSlanja,
            }    
            const response = "Poruka primljena na serveru";
            if (this.users.find((user) => user === data.receiver))
                this.server.emit(`messageFor${data.receiver}`, msg);
            else {

            }
            return of(response).pipe(
                map((msg) => ({event: 'messageFromServer', data: msg})
                ),
            );
        }


    async findSender(sender: string): Promise<string>{
        const user = await this.prismaService.user.findUnique({
            where:{
                username: sender,
            }
        });
        return user.id;
    }

    async findReceiver(receiver: string): Promise<string>{
        const user = await this.prismaService.user.findFirst({
            where:{
                username: receiver,
            },
        });
        return user.id;
    }
        
    async createMessage(conversation: Konverzacija, msg: string, sender: string, receiver: string) : Promise<Poruka>{
        const poruka = await this.prismaService.poruka.create({
            data:{
                tekst: msg,
                konverzacija: {connect: {id: conversation.id}},
                sender: {connect: {id: sender}},
                receiver: {connect: {id: receiver}},
                vremeSlanja: new Date(),
            },
        });
        await this.prismaService.konverzacija.update({
            where:{
                id: conversation.id,
            },
            data:{
                vremeIzmene: new Date(),
            },
        });
        console.log(poruka);
        return poruka;
    }

    async findConversation(user1: string, user2: string): Promise<Konverzacija>{
        try{
            const konverzacija = await this.prismaService.konverzacija.findFirst({
                where:{
                    AND:[
                        {
                            userIds: {
                                has: user1,
                            },
                        },
                        {
                            userIds: {
                                has:user2,
                            },
                        },
                    ],
                }
            });
            return konverzacija;
        }
        catch(error){
            console.log(error);
        }
    }

    async createConversation(user1: string, user2: string): Promise<Konverzacija>{
        const konverzacija = this.prismaService.konverzacija.create({
            data:{
                vodiKonverzacije: {
                    connect: [{id: user1}, {id: user2}],
                },
                datumPocetka: new Date(),
                vremeIzmene: new Date(),
            },
        });
        return konverzacija;
    }

    async getMessagesFromConversation(conversation: string): Promise<Message[]>{
        const konverzacija = await this.prismaService.konverzacija.findFirst({ //nadji konverzaciju
            where:{
                id: conversation,
            },
        });
        const poruke = await this.prismaService.poruka.findMany({//nadji poruke
            where:{
                konverzacija: {
                    id: konverzacija.id,
                },
            },
            orderBy:{
                vremeSlanja: 'desc',
            },
            take: 10,
        });
        console.log(poruke);
        console.log("poruke.length"+poruke.length)
        if (poruke.length == 0)
            return [];
        const user1 = await this.prismaService.user.findFirst({//nadji korisnika1
            where:{
                id: {
                    equals: konverzacija.userIds[0],
                },
            },
        });
        const user2 = await this.prismaService.user.findFirst({//nadji korisnika2
            where:{
                id: {
                    equals: konverzacija.userIds[1],
                },
            },
        });
        const msgs: Message[] = [];
        for (let p of poruke){//konvertuj Poruka u Message
            msgs.push({
                id: p.id,
                tekst: p.tekst,
                sender: p.senderId == user1.id ? user1.username : user2.username,
                receiver: p.receiverId == user1.id ? user1.username : user2.username,
                vremeSlanja: p.vremeSlanja,
            })
        }
        return msgs;
    }

    async getRecentConversationsWithMessages(user: string): Promise<Conversation[]>{
        const konverzacije = await this.prismaService.konverzacija.findMany({
            where:{
                userIds: {
                    has: user,
                },
            },
            orderBy:{
                vremeIzmene: 'desc',
            },
            take: 10,
        });
        console.log("212 "+konverzacije)
        if(konverzacije.length == 0)
            return [];
        const conversations: Conversation[] = [];
        for (let k of konverzacije){
            const msgs = await this.getMessagesFromConversation(k.id);
            if(msgs.length == 0){
                continue;
            }
            conversations.push({
                id: k.id, 
                poruke: msgs,
                userIds: [...k.userIds],
                datumPocetka: k.datumPocetka,
                vremeIzmene: k.vremeIzmene,
                usernames: [msgs[0].sender, msgs[0].receiver]
            });
        }
        return conversations;
    }

    async getMessages(conversationId: string): Promise<Poruka[]>{
        const poruke = await this.prismaService.poruka.findMany({
            where:{
                konverzacijaId: conversationId,
            },
            orderBy:{
                vremeSlanja: 'desc',
            },
            take: 10,
        });
        return poruke;
    }

    async getConversation(conversationId: string): Promise<Conversation>{
        const konv = await this.prismaService.konverzacija.findUnique({
            where:{
                id: conversationId,
            },
        });
        const user1 = await this.prismaService.user.findFirst({
            where:{
                id: {
                    equals: konv.userIds[0],
                },
            },
        });
        const user2 = await this.prismaService.user.findFirst({
            where:{
                id: {
                    equals: konv.userIds[1],
                },
            },
        });
        const msgs = await this.getMessagesFromConversation(conversationId);
        const conv : Conversation = {
            id: konv.id,
            poruke: (msgs.length) == 0 ? [] : msgs,
            userIds: [...konv.userIds],
            datumPocetka: konv.datumPocetka,
            vremeIzmene: konv.vremeIzmene,
            usernames: [user1.username, user2.username]
        }
        console.log("276 conv"+conv);
        return conv;
    }

    async getConversationOrCreateWithUserIds(user1: string, user2: string){
        console.log(user1 + " " + user2)
        let konv = await this.prismaService.konverzacija.findFirst({
            where:{
                AND:[
                    {
                        userIds: {
                            has: user1,
                        },
                    },
                    {
                        userIds: {
                            has:user2,
                        },
                    },
                ]
            },
        });
        if (konv != null)
            return konv;
        konv = await this.prismaService.konverzacija.create({
            data:{
                vodiKonverzacije: {
                    connect: [{id: user1}, {id: user2}],
                },
                datumPocetka: new Date(),
                vremeIzmene: new Date(),
            },
        });
        return konv;
    }
}