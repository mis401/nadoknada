import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OglasModule } from './oglas/oglas.module';
import { KomentarModule } from './komentar/komentar.module';
import { PrituzbaModule } from './prituzba/prituzba.module';
import { ConfigModule } from '@nestjs/config';
import { PonudaModule } from './ponuda/ponuda.module';
import { EmailModule } from './email/email.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    PrismaModule, 
    OglasModule,
    KomentarModule, 
    PrituzbaModule,
    ConfigModule.forRoot({ isGlobal: true}),
    PonudaModule,
    EmailModule,
    ChatModule,
  ],
})
export class AppModule {}
