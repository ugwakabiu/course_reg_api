import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './validationSchema/createUser.validationSchema';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { constant } from 'src/constants/constant';
import { UpdatePasswordDto } from './validationSchema/updatePassword.validationSchema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword(password: string): string {
    if (!password) return;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async findManyUser(param?: {
    where?: Prisma.UserFindManyArgs['where'];
    select?: Prisma.UserFindUniqueArgs['select'];
  }): Promise<User[]> {
    return this.userRepository.findManyUser(param);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const hash = this.hashPassword(user.password);

    return this.userRepository.createUser({
      password: hash,
      username: user.username,
      active: user.active,
    });
  }

  async findUniqueUser(param: {
    where?: Prisma.UserFindFirstArgs['where'];
    select?: Prisma.UserFindUniqueArgs['select'];
  }): Promise<User> {
    return this.userRepository.findUniqueUser(param);
  }

  async authAuser(
    cred: CreateUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.findUniqueUser({
      where: {
        username: cred.username,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isMatch = bcrypt.compareSync(cred?.password, user?.password);

    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = { sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: constant.ACCESS_TOKEN_MAX_AGE,
    });

    return { accessToken, user };
  }

  async updateUser(
    key: Prisma.UserUpdateArgs['where'],
    data: Prisma.UserUpdateInput,
  ) {
    if (data.password) {
      data.password = this.hashPassword(String(data.password));
    }

    return this.userRepository.updateUser({ where: key, data });
  }

  async updatePassword(id: string, data: UpdatePasswordDto): Promise<User> {
    const user = await this.findUniqueUser({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = bcrypt.compareSync(data.currentPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid current password');
    }

    return this.updateUser({ id }, { password: data.newPassword });
  }
}
