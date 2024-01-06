import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponseDto implements User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;
}
