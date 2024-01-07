import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAttendanceDto {}

export class StaffMealChoiceDto {
  @ApiPropertyOptional({ example: true })
  breakfast: boolean;
  @ApiPropertyOptional({ example: false })
  lunch: boolean;
  @ApiPropertyOptional({ example: false })
  dinner: boolean;
}
