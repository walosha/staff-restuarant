import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { UserNotFoundException } from './exceptions/userNotFound.exception';

describe('The UsersService', () => {
  let usersService: UsersService;
  let findUniqueMock: jest.Mock;
  beforeEach(async () => {
    findUniqueMock = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: findUniqueMock,
            },
          },
        },
      ],
    }).compile();

    usersService = await module.get(UsersService);
  });
  describe('when the getByEmail function is called', () => {
    describe('and the findUnique method returns the user', () => {
      let user: User;
      beforeEach(() => {
        user = {
          id: '1',
          email: 'john@smith.com',
          firstname: 'John',
          lastname: 'akeem',
          password: 'strongPassword123',
          role: Role.COOK,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        findUniqueMock.mockResolvedValue(user);
      });
      it('should return the user', async () => {
        const result = await usersService.getByEmail(user.email);
        expect(result).toBe(user);
      });
    });
    describe('and the findUnique method does not return the user', () => {
      beforeEach(() => {
        findUniqueMock.mockResolvedValue(undefined);
      });
      it('should throw the UserNotFoundException', async () => {
        return expect(async () => {
          await usersService.getByEmail('john@smith.com');
        }).rejects.toThrow(UserNotFoundException);
      });
    });
  });
});
