import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailerService } from '../mailer/mailer.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService, MailerService],
})
export class MailModule {}
