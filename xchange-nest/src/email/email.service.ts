import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(
    @Inject('MAILER_TRANSPORTER')
    private readonly transporter: any,
  ) {}

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'xchange2023@hotmail.com',
      to ,
      subject ,
      text ,
    };
    console.log("asdsada");
    await this.transporter.sendMail(mailOptions);
  }

}

