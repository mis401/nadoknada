import { Module } from '@nestjs/common';
import { OglasController } from './oglas.controller';
import { OglasService } from './oglas.service';
import { EmailService } from 'src/email/email.service';
import { EmailController } from 'src/email/email.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [OglasController],
  providers: [OglasService],
})
export class OglasModule {}
