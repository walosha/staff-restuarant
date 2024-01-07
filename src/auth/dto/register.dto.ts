import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from '@nestjs/class-validator';

class RegisterDto {
  @ApiProperty({ example: 'walosha@yahoo.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Olawale' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Afuye' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export default RegisterDto;
