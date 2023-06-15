import { Global, Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { APP_CONFIG } from './app.config';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'xchange2023@hotmail.com',
    pass: 'posadam84xchange',
  },
  pool: true,
  maxConnections: 3,
  port: 587,
});

@Global()
@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: 'MAILER_TRANSPORTER',
      useValue: transporter,
    },
  ],
  exports: [EmailService],
  
})
export class EmailModule {}
