import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findUniqueUser(param: {
    where?: Prisma.UserFindFirstArgs['where'];
    select?: Prisma.UserFindUniqueArgs['select'];
  }): Promise<User> {
    return this.prisma.user.findFirst({
      ...param,
    });
  }

  async findManyUser(param: {
    where?: Prisma.UserFindManyArgs['where'];
    select?: Prisma.UserFindManyArgs['select'];
  }): Promise<User[]> {
    return this.prisma.user.findMany(param);
  }

  async updateUser(param: {
    where: Prisma.UserUpdateArgs['where'];
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return this.prisma.user.update(param);
  }
}
