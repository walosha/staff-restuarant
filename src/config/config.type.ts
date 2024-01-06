import { MailConfig } from 'src/mail/config/mail-config.type';
import { AppConfig } from './app-config.type';
import { AuthConfig } from 'src/auth/config/auth-config.type';
export type AllConfigType = {
  //   database: DatabaseConfig;
  auth: AuthConfig;
  app: AppConfig;
  mail: MailConfig;
};
