import { CourseRepository } from './course.repository';
import { Course, Prisma } from '@prisma/client';
import { CreateCourseDto } from './validationSchema/course.validationSchema';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CourseService {
    private readonly courseRepository;
    private readonly prismaService;
    constructor(courseRepository: CourseRepository, prismaService: PrismaService);
    findUnique(id: string): Promise<{
        students: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            studentId: string;
            courseId: string;
        }[];
        departments: {
            department: {
                name: string;
                id: string;
            };
        }[];
    } & {
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: number;
        title: string;
        unit: number;
        semester: import(".prisma/client").$Enums.Semister;
        category: import(".prisma/client").$Enums.CourseCategory;
    }>;
    findMany(): Promise<({
        _count: {
            students: number;
            departments: number;
        };
    } & {
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: number;
        title: string;
        unit: number;
        semester: import(".prisma/client").$Enums.Semister;
        category: import(".prisma/client").$Enums.CourseCategory;
    })[]>;
    update(param: {
        where: Prisma.CourseUpdateArgs['where'];
        data: Prisma.CourseUpdateInput;
    }): Promise<Course>;
    delete(id: string | string[]): Promise<Prisma.BatchPayload>;
    create(course: CreateCourseDto): Promise<Course>;
    createMany(course: CreateCourseDto[]): Promise<Prisma.BatchPayload>;
}
