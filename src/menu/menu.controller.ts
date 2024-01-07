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
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';
import { HasRoles } from 'src/auth/decorator/role.decorator';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('menu')
@ApiTags('menu')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@HasRoles(Role.COOK)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(
    @Body() createMenuDto: CreateMenuDto,
    @Req() request: RequestWithUser,
  ) {
    return this.menuService.create(createMenuDto, request.user);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
