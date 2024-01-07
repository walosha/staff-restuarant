import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly breakfast: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lunch: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly dinner: string;

  @IsDateString()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly date: Date;
}
