import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { resMsgUtil } from 'src/utils/resMsg.util';
import {
  CreateCourseDto,
  createCourseValidationSchema,
  UpdateCourseDto,
  updateCourseValidationSchema,
} from './validationSchema/course.validationSchema';
import { RolesAllowed } from 'src/user/guards/rolesAllowed';
import { RoleGuard } from 'src/user/guards/role.guard';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import { FileUploadInterceptor } from './fileUpload.interceptor';
import { AuthGuard } from 'src/user/guards/auth.guard';

@UseGuards(AuthGuard)
@RolesAllowed(['admin'])
@UseGuards(RoleGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  //get all courses
  @Get()
  async getCourses() {
    const courses = await this.courseService.findMany();
    return resMsgUtil('courses fetched successfully', courses);
  }

  @Get(':id')
  async getSingleCourses(@Param('id') id: string) {
    const course = await this.courseService.findUnique(id);
    return resMsgUtil('course fetched successfully', course);
  }

  //create course
  @Post('create')
  @UsePipes(new ZodValidationPipe(createCourseValidationSchema))
  async createCourse(@Body() course: CreateCourseDto) {
    const newCourse = await this.courseService.create(course);
    return resMsgUtil('course created successfully', newCourse);
  }

  //update course
  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateCourseValidationSchema))
  @Bind(Param('id'), Body())
  async updateCourse(id: string, data: UpdateCourseDto) {
    if (!data) return 'no changes found';

    const updatedCourse = await this.courseService.update({
      where: { id },
      data,
    });
    return resMsgUtil('course updated successfully', updatedCourse);
  }
  @Delete('delete')
  @Bind(Body('id'))
  async deleteCourse(id: string | string[]) {
    const deletedCourse = await this.courseService.delete(id);

    const message = `${deletedCourse.count} course${deletedCourse.count > 1 ? 's' : ''} deleted successfully`;

    return resMsgUtil(message);
  }

  //creat multiple course via file upload
  @Post('upload')
  @UseInterceptors(FileUploadInterceptor)
  @UsePipes(new ZodValidationPipe(createCourseValidationSchema))
  async uploadCourse(@Body() course: CreateCourseDto[]) {
    const { count } = await this.courseService.createMany(course);
    return resMsgUtil(
      `${count} course${count > 1 ? 's' : ''} created successfully`,
    );
  }
}
