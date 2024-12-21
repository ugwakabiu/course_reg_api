import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { Course, Prisma } from '@prisma/client';
import { CreateCourseDto } from './validationSchema/course.validationSchema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async findUnique(id: string) {
    return this.prismaService.course.findUnique({
      where: { id },
      include: {
        students: true,
        departments: {
          select: {
            department: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async findMany() {
    return this.prismaService.course.findMany({
      include: {
        _count: {
          select: {
            departments: true,
            students: true,
          },
        },
      },
      orderBy: [{ level: 'asc' }, { semester: 'asc' }, { code: 'asc' }],
    });
  }

  async update(param: {
    where: Prisma.CourseUpdateArgs['where'];
    data: Prisma.CourseUpdateInput;
  }): Promise<Course> {
    return this.courseRepository.update(param);
  }
  async delete(id: string | string[]): Promise<Prisma.BatchPayload> {
    return this.courseRepository.delete(id);
  }

  async create(course: CreateCourseDto): Promise<Course> {
    return this.courseRepository.create(course);
  }
  async createMany(course: CreateCourseDto[]): Promise<Prisma.BatchPayload> {
    return this.courseRepository.createMany(course as any);
  }
}
