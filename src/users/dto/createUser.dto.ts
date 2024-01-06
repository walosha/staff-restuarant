import { AddressDto } from './address.dto';

export class CreateUserDto {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  // address?: AddressDto;
}
