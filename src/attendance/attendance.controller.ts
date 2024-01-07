import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { StaffMealChoiceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';
import { HasRoles } from 'src/auth/decorator/role.decorator';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('attendance')
@ApiTags('attendance')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@HasRoles(Role.COOK, Role.STAFF)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post(':menuId')
  create(
    @Req() request: RequestWithUser,
    @Param('menuId') menuId: string,
    @Body() createAttendanceDto: StaffMealChoiceDto,
  ) {
    return this.attendanceService.create(
      createAttendanceDto,
      request.user.id,
      menuId,
    );
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':menuId')
  @ApiQuery({
    name: 'breakfast',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'lunch',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'dinner',
    type: Boolean,
    required: false,
  })
  findOne(
    @Param('menuId') menuId: string,
    @Query('breakfast') breakfast?: string,
    @Query('lunch') lunch?: string,
    @Query('dinner') dinner?: string,
  ) {
    const obj = {
      breakfast,
      lunch,
      dinner,
    };
    const staffMealChoiceDto: any = Object.fromEntries(
      Object.entries(obj)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, value === 'true']),
    );
    return this.attendanceService.findOne(menuId, staffMealChoiceDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
