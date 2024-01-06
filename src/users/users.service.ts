import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByEmail(email: string) {
    console.log({ email });
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(user: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...user,
        role: Role.STAFF,
      },
      // include: {
      //   address: true,
      // },
    });
  }
}
