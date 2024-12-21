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
  UsePipes,
} from '@nestjs/common';
import { RoleGuard } from 'src/user/guards/role.guard';
import { RolesAllowed } from 'src/user/guards/rolesAllowed';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import {
  createDepartmentDto,
  createDepartmentValidationSchema,
  updateDepartmentValidationSchema,
} from './validationSchemas/department.validationSchema';
import { DepartmentService } from './department.service';
import { resMsgUtil } from 'src/utils/resMsg.util';
import {
  RegisterCourseDto,
  registerCourseValidationSchema,
} from './validationSchemas/registerCourse.validationSchema';
import { AuthGuard } from 'src/user/guards/auth.guard';

@UseGuards(AuthGuard)
@RolesAllowed(['admin'])
@UseGuards(RoleGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  //get all department
  @Get()
  async getDepartments() {
    const departments = await this.departmentService.getDepartments();
    return resMsgUtil('departments fetched successfully', departments);
  }

  @Get(':id')
  async getSingleDepartment(@Param('id') id: string) {
    const department = await this.departmentService.getSingleDepartment(id);
    const transformedDep = {
      ...department,
      courses: department.courses.map((course) => course.course),
    };
    return resMsgUtil('department fetched successfully', transformedDep);
  }

  //create department
  @UsePipes(new ZodValidationPipe(createDepartmentValidationSchema))
  @Post('create')
  async createDepartment(@Body() body: createDepartmentDto) {
    const department = await this.departmentService.create(body);

    return resMsgUtil('department created successfully', department);
  }
  @Put(':id')
  @Bind(Param('id'), Body())
  @UsePipes(new ZodValidationPipe(updateDepartmentValidationSchema))
  async updateDepartment(id: string, body: createDepartmentDto) {
    const department = await this.departmentService.update(id, body);
    return resMsgUtil('department updated successfully', department);
  }
  @Delete(':id')
  @Bind(Param('id'), Body())
  async deleteDepartment(id: string) {
    const department = await this.departmentService.delete(id);
    return resMsgUtil('department deleted successfully', department);
  }

  @UsePipes(new ZodValidationPipe(registerCourseValidationSchema))
  @Post(':id/register-course')
  @Bind(Param('id'), Body())
  async registerCourse(id: string, body: RegisterCourseDto) {
    const { count } = await this.departmentService.registerCourse(
      id,
      body.courseId,
    );

    const message = `${count} course${count > 1 ? 's' : ''} registered successfully`;

    return resMsgUtil(message);
  }
  @UsePipes(new ZodValidationPipe(registerCourseValidationSchema))
  @Delete(':id/delete-registered-course')
  @Bind(Param('id'), Body())
  async deleteRegisteredCourse(id: string, body: RegisterCourseDto) {
    const { count } = await this.departmentService.deleteRegisteredCourse(
      id,
      body.courseId,
    );

    const message = `${count} course${count > 1 ? 's' : ''} deleted successfully`;

    return resMsgUtil(message);
  }
}
