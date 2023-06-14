import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('chat')
export class ChatController {
    constructor(private service: ChatGateway) {}
        
    @UseGuards(AuthGuard('jwt'))
    @Get('skorasnje')
    skorasnjePoruke(@GetUser() user: User){
        return this.service.getRecentConversationsWithMessages(user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('vratiPoruke')
    vratiPoruke(@Query('konverzacija') konverzacija: string){
        return this.service.getMessagesFromConversation(konverzacija);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(`vratiKonverzaciju`)
    async vratiKonverzaciju(@Query('id') id: string){
        return await this.service.getConversation(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('vratiKonverzacijuSaKorisnikom')
    async vratiKonverzacijuIliNapraviSaKorisnikom(@GetUser() user: User, @Query('other') other: string){
        console.log("other" + other);
        return await this.service.getConversationOrCreateWithUserIds(user.id, other);
    }

}

