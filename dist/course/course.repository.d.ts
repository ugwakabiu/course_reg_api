import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CourseRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(data: Prisma.CourseCreateInput): Promise<Course>;
    createMany(data: Prisma.CourseCreateManyInput): Promise<Prisma.BatchPayload>;
    update(param: {
        where: Prisma.CourseUpdateArgs['where'];
        data: Prisma.CourseUpdateInput;
    }): Promise<Course>;
    delete(id: string | string[]): Promise<Prisma.BatchPayload>;
    findMany(key?: Prisma.CourseFindManyArgs['where'], select?: Prisma.CourseFindManyArgs['select']): Promise<Course[]>;
    findOne(param: {
        where: Prisma.CourseFindUniqueArgs['where'];
        select?: Prisma.CourseFindUniqueArgs['select'];
        include?: Prisma.CourseFindUniqueArgs['include'];
    }): Promise<Course>;
}
