import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { constant } from './constants/constant';
import { CourseModule } from './course/course.module';
import { deserializeUserMiddleware } from './user/middleware/deserializeUser.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaExceptionFilter } from './prisma/prisma.exceptionFilter';
import { DepartmentModule } from './department/department.module';
import { StudentModule } from './student/student.module';
import { ConfigModule } from './config/config.module';
import { AllowLoginGuard } from './config/guard/allowLogin.guard';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: constant.JWT_SECRET_KEY }),
    PrismaModule,
    UserModule,
    CourseModule,
    DepartmentModule,
    StudentModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    {
      provide: APP_GUARD,
      useClass: AllowLoginGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(deserializeUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
