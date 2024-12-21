import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { DepartmentModule } from 'src/department/department.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DepartmentModule, UserModule],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
