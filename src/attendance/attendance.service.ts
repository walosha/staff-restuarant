import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StaffMealChoiceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'src/utils/prismaError';

@Injectable()
export class AttendanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAttendanceDto: StaffMealChoiceDto,
    userId: string,
    menuId: string,
  ) {
    try {
      const attendance = await this.prismaService.attendance.create({
        data: {
          user: {
            connect: { id: userId },
          },
          menu: {
            connect: { id: menuId },
          },
          staffMealChoice: {
            create: createAttendanceDto,
          },
        },
        include: {
          staffMealChoice: true,
        },
      });

      return attendance;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.UniqueConstraintFailed
      ) {
        throw new HttpException(
          'You have already subscribed to the menu',
          HttpStatus.CONFLICT,
        );
      }
      throw new NotFoundException('Internal Server Error');
    }
  }

  async findAll() {
    const attendance = await this.prismaService.attendance.findMany({
      include: { user: true, staffMealChoice: true },
    });

    return attendance;
  }

  async findOne(id: string, staffMealChoiceDto: StaffMealChoiceDto) {
    console.log(staffMealChoiceDto);
    const attendance = await this.prismaService.attendance.findMany({
      where: {
        menuId: id,
        staffMealChoice: {
          ...staffMealChoiceDto,
        },
      },
      include: { staffMealChoice: true, user: true },
    });
    return attendance;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${updateAttendanceDto} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
