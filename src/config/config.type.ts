import { MailConfig } from 'src/mail/config/mail-config.type';
import { AppConfig } from './app-config.type';
export type AllConfigType = {
  //   database: DatabaseConfig;
  app: AppConfig;
  mail: MailConfig;
};
