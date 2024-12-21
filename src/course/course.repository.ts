import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prismaService.course.create({ data });
  }

  async createMany(
    data: Prisma.CourseCreateManyInput,
  ): Promise<Prisma.BatchPayload> {
    return this.prismaService.course.createMany({ data, skipDuplicates: true });
  }
  async update(param: {
    where: Prisma.CourseUpdateArgs['where'];
    data: Prisma.CourseUpdateInput;
  }): Promise<Course> {
    return this.prismaService.course.update(param);
  }

  async delete(id: string | string[]): Promise<Prisma.BatchPayload> {
    if (Array.isArray(id)) {
      return this.prismaService.course.deleteMany({
        where: {
          id: {
            in: id,
          },
        },
      });
    }

    return this.prismaService.course.deleteMany({
      where: {
        id,
      },
    });
  }

  async findMany(
    key?: Prisma.CourseFindManyArgs['where'],
    select?: Prisma.CourseFindManyArgs['select'],
  ): Promise<Course[]> {
    return this.prismaService.course.findMany({
      where: key,
      select,
      orderBy: {
        // code: 'asc',
        level: 'desc',
      },
    });
  }
  async findOne(param: {
    where: Prisma.CourseFindUniqueArgs['where'];
    select?: Prisma.CourseFindUniqueArgs['select'];
    include?: Prisma.CourseFindUniqueArgs['include'];
  }): Promise<Course> {
    return this.prismaService.course.findUnique(param);
  }
}
