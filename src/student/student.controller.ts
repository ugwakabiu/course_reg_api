import {
  BadRequestException,
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  CreateStudentDto,
  createStudentValidationSchema,
  UpdateStudentDto,
  updateStudentValidationSchema,
} from './valdationSchemas/student.validationSchema';
import { StudentService } from './student.service';
import { AuthenticatedUser } from 'src/user/authenticatedUser.decorator';
import { resMsgUtil } from 'src/utils/resMsg.util';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import {
  RegisterCourseDto,
  registerCourseValidationSchema,
} from 'src/department/validationSchemas/registerCourse.validationSchema';
import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ActiveGuard } from 'src/user/guards/active.guard';
import { TokenGuard } from 'src/user/guards/token.guard';
import { AllowDataUpdateGuard } from 'src/config/guard/allowDataUpdate.guard';

@UseGuards(AuthGuard, ActiveGuard, TokenGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAll() {
    const students = await this.studentService.findAll();
    return resMsgUtil('Students fetched successfully', students);
  }

  @Post('create')
  @Bind(Body(), AuthenticatedUser('id'))
  @UsePipes(new ZodValidationPipe(createStudentValidationSchema))
  async create(body: CreateStudentDto, userId: string) {
    const createdStudent = await this.studentService.create(body, userId);
    await this.studentService.registerRecommendedCourse(createdStudent.id);
    return resMsgUtil('Student created successfully', createdStudent);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedStudent = await this.studentService.delete(id);
    return resMsgUtil('Student deleted successfully', deletedStudent);
  }

  @Post(':id/passport')
  @Bind(Param('id'), Req())
  async uploadLoadPassport(id: string, req: Request) {
    const file: UploadedFile = (
      Array.isArray(req.files) ? req.files[0] : req.files
    )?.['passport'];

    if (!file) {
      throw new BadRequestException('Passport file is required');
    }

    const uploadRes = await this.studentService.uploadPassport(id, file);

    return resMsgUtil('passport updated successfull', uploadRes);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const student = await this.studentService.find({ id });

    if (!student) throw new NotFoundException('student not found');

    return resMsgUtil('Student fetched successfully', student);
  }

  @Put(':id')
  @UseGuards(AllowDataUpdateGuard)
  @Bind(Param('id'), Body())
  @UsePipes(new ZodValidationPipe(updateStudentValidationSchema))
  async update(id: string, body: UpdateStudentDto) {
    const updatedUser = await this.studentService.update(id, body);
    return resMsgUtil('Student updated successfully', updatedUser);
  }

  @Post(':id/register-course')
  @Bind(Param('id'), Body())
  @UsePipes(new ZodValidationPipe(registerCourseValidationSchema))
  async registerCourse(id: string, body: RegisterCourseDto) {
    const { count } = await this.studentService.registerCourse(
      id,
      body.courseId,
    );
    return resMsgUtil(
      `${count} course${count > 1 ? 's' : ''} registered successfully`,
    );
  }
  @Delete(':id/registered-course')
  @Bind(Param('id'), Body())
  @UsePipes(new ZodValidationPipe(registerCourseValidationSchema))
  async deleteRegisteredCourse(id: string, body: RegisterCourseDto) {
    const { count } = await this.studentService.deleteRegisteredCourses(
      id,
      body.courseId,
    );
    return resMsgUtil(
      `${count} course${count > 1 ? 's' : ''} deleted successfully`,
    );
  }

  @Get(':id/recomended-courses')
  async getRecomendedCourses(@Param('id') id: string) {
    const recommendedCourses = await this.studentService.getRecommendedCourses(
      id,
      'recommended',
    );
    return resMsgUtil(
      'Recommended courses fetched successfully',
      recommendedCourses,
    );
  }
  @Get(':id/registered-courses')
  async getRegisteredCourses(@Param('id') id: string) {
    const registeredCourses =
      await this.studentService.getRegisteredCourses(id);
    return resMsgUtil(
      'Registered courses fetched successfully',
      registeredCourses,
    );
  }

  @Post(':id/print')
  @HttpCode(HttpStatus.OK)
  @Bind(Param('id'), AuthenticatedUser('id'))
  async printSlip(studentId: string, userId: string) {
    const student = await this.studentService.printSlip(studentId, userId);

    return resMsgUtil('print slip success', student);
  }
}
