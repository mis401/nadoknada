import { Module } from '@nestjs/common';
import { OglasController } from './oglas.controller';
import { OglasService } from './oglas.service';
import { EmailService } from 'src/email/email.service';
import { EmailController } from 'src/email/email.controller';
import { EmailModule } from 'src/email/email.module';
import { SlikaController } from './slika.controller';

@Module({
  controllers: [OglasController, SlikaController],
  providers: [OglasService],
})
export class OglasModule {}
