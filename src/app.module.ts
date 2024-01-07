import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [UsersModule, MailModule, AuthModule, MenuModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
