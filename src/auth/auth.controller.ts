import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { UserResponseDto } from '../users/dto/userResponseDto';
import { plainToClass } from 'class-transformer';
import { TransformDataInterceptor } from 'src/utils/transformData.interceptor';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import LogInDto from './dto/logIn.dto';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @Post('log-in')
  @ApiBody({ type: LogInDto })
  @UseGuards(LocalAuthenticationGuard)
  async logIn(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    const token = this.authenticationService.getToken({ userId: user.id });
    const serialisedUser = plainToClass(UserResponseDto, user);
    return { ...serialisedUser, token };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(new TransformDataInterceptor(UserResponseDto))
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}
