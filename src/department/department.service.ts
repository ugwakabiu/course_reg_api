import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createDepartmentDto } from './validationSchemas/department.validationSchema';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDepartments() {
    return this.prismaService.department.findMany({
      include: {
        _count: {
          select: {
            courses: true,
            students: true,
          },
        },
      },
    });
  }
  async getSingleDepartment(id: string) {
    return this.prismaService.department.findUnique({
      where: {
        id,
      },
      include: {
        courses: {
          orderBy: [
            { course: { level: 'asc' } },
            { course: { semester: 'asc' } },
            { course: { code: 'asc' } },
          ],
          select: {
            course: {
              select: {
                id: true,
                title: true,
                category: true,
                code: true,
                unit: true,
                semester: true,
                level: true,
              },
            },
          },
        },
        students: {
          include: {
            PersonalInformation: true,
            registeredBy: true,
          },
        },
        _count: {
          select: {
            courses: true,
            students: true,
          },
        },
      },
    });
  }

  async getRegisteredCourses(departmentId: string) {
    return this.prismaService.course.findMany({
      where: {
        departments: {
          some: {
            departmentId,
          },
        },
      },
    });
  }

  async create(data: createDepartmentDto) {
    return this.prismaService.department.create({ data });
  }
  async update(id: string, data: createDepartmentDto) {
    return this.prismaService.department.update({ where: { id }, data });
  }
  async delete(id: string) {
    return this.prismaService.department.delete({ where: { id } });
  }

  async registerCourse(departmentId: string, courseId: string | string[]) {
    if (Array.isArray(courseId)) {
      const data = courseId.map<Prisma.departmentsOnCoursesCreateManyInput>(
        (id) => ({ departmentId, courseId: id }),
      );

      return this.prismaService.departmentsOnCourses.createMany({
        data,
        skipDuplicates: true,
      });
    }

    return this.prismaService.departmentsOnCourses.createMany({
      data: { courseId, departmentId },
    });
  }
  async deleteRegisteredCourse(
    departmentId: string,
    courseId: string | string[],
  ) {
    if (Array.isArray(courseId)) {
      return this.prismaService.departmentsOnCourses.deleteMany({
        where: {
          departmentId,
          courseId: {
            in: courseId,
          },
        },
      });
    }

    return this.prismaService.departmentsOnCourses.deleteMany({
      where: {
        departmentId,
        courseId: courseId,
      },
    });
  }
}
