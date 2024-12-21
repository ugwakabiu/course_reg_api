import {
  BadRequestException,
  Bind,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import {
  CreateUserDto,
  createUserValidationSchema,
} from './validationSchema/createUser.validationSchema';
import { UserService } from './user.service';
import { resMsgUtil } from 'src/utils/resMsg.util';
import { omitObjUtil } from 'src/utils/omitObj.util';
import { Response } from 'express';
import { constant } from 'src/constants/constant';
import { parseAndConvertUnitUtil } from 'src/utils/parseAndConvertUnit.util';
import { Prisma } from '@prisma/client';
import { updateUserValidationSchema } from './validationSchema/updateUser.validationSchema';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RolesAllowed } from './guards/rolesAllowed';
import {
  UpdatePasswordDto,
  updatePasswordValidationSchema,
} from './validationSchema/updatePassword.validationSchema';
import { AuthenticatedUser } from './authenticatedUser.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @RolesAllowed(['admin'])
  @UseGuards(RoleGuard)
  async getSingleUsers(@Param('id') id: string) {
    const selectFiled = {
      id: true,
      registrationNumber: true,
      department: {
        select: {
          name: true,
        },
      },
      level: true,
      PersonalInformation: {
        select: {
          firstName: true,
          lastName: true,
          otherNames: true,
        },
      },
    };

    const user = await this.userService.findUniqueUser({
      where: {
        id,
      },
      select: {
        active: true,
        role: true,
        username: true,
        token: true,
        usedToken: true,
        registeredStudents: {
          select: selectFiled,
        },
        printedStudents: {
          select: selectFiled,
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return resMsgUtil('user fetched successfully', user);
  }
  @Get()
  @RolesAllowed(['admin'])
  @UseGuards(RoleGuard)
  async getMannyUsers() {
    const users = await this.userService.findManyUser({
      select: {
        id: true,
        active: true,
        role: true,
        username: true,
        token: true,
        usedToken: true,
        registeredStudents: true,
        printedStudents: true,
        _count: {
          select: {
            printedStudents: true,
            registeredStudents: true,
          },
        },
      },
    });
    return resMsgUtil('users fetched successfully', users);
  }

  @Post('create')
  @RolesAllowed(['admin'])
  @UseGuards(RoleGuard)
  @UsePipes(new ZodValidationPipe(createUserValidationSchema))
  async createUser(@Body() user: CreateUserDto) {
    const createRes = await this.userService.createUser(user);

    return resMsgUtil(
      'user created successfully',
      omitObjUtil(createRes, ['password']),
    );
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(createUserValidationSchema))
  @HttpCode(HttpStatus.OK)
  @Bind(Body(), Res({ passthrough: true }))
  async userLogin(cred: CreateUserDto, res: Response) {
    res.clearCookie(constant.ACCESS_TOKEN_NAME);
    const data = await this.userService.authAuser(cred);

    if (!data) {
      throw new NotFoundException('Invalid credentials');
    }

    res.cookie(constant.ACCESS_TOKEN_NAME, data.accessToken, {
      maxAge: parseAndConvertUnitUtil(constant.ACCESS_TOKEN_MAX_AGE, 'ms'),
    });

    return resMsgUtil('login success', omitObjUtil(data.user, ['password']));
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(constant.ACCESS_TOKEN_NAME);

    return resMsgUtil('logout success');
  }

  @Put('update-password')
  @UsePipes(new ZodValidationPipe(updatePasswordValidationSchema))
  @Bind(AuthenticatedUser('id'), Body())
  async updateUserpassword(userId: string, body: UpdatePasswordDto) {
    await this.userService.updatePassword(userId, body);
    return resMsgUtil('password updated successfully');
  }

  @Put(':id')
  @RolesAllowed(['admin'])
  @UseGuards(RoleGuard)
  @UsePipes(new ZodValidationPipe(updateUserValidationSchema))
  @Bind(Param('id'), Body())
  async updateUser(id: string, body: Prisma.UserUpdateInput) {
    const res = await this.userService.updateUser({ id }, body);

    return resMsgUtil(
      'user updated successfully',
      omitObjUtil(res, ['password']),
    );
  }

  @Put('increment-token/:id')
  @RolesAllowed(['admin'])
  @UseGuards(RoleGuard)
  async addUserToken(
    @Param('id')
    id: string,
    @Body(
      'token',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException('token should be number'),
      }),
    )
    token: number,
  ) {
    const res = await this.userService.updateUser(
      { id },
      { token: { increment: token } },
    );

    return resMsgUtil(
      'user token updated successfully',
      omitObjUtil(res, ['password']),
    );
  }

  @Put('decrement-token/:id')
  @RolesAllowed(['admin'])
  @UseGuards(RoleGuard)
  async subtractUserToken(
    @Param('id')
    id: string,
    @Body(
      'token',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException('token should be number'),
      }),
    )
    token: number,
  ) {
    const res = await this.userService.updateUser(
      { id },
      { token: { decrement: token } },
    );

    return resMsgUtil(
      'user token updated successfully',
      omitObjUtil(res, ['password']),
    );
  }
}
