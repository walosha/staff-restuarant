import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMenuDto: CreateMenuDto, user: User) {
    try {
      const menu = await this.prismaService.menu.create({
        data: { ...createMenuDto, cookId: user.id },
      });
      return menu;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Menu already created for the day',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const menus = await this.prismaService.menu.findMany({});
      return menus;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    try {
      const menu = await this.prismaService.menu.update({
        where: { id },
        data: updateMenuDto,
      });
      console.log({ id, updateMenuDto });

      return menu;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            'Menu with ID not found',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(error.message || 'Internal Server Error', 500);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
