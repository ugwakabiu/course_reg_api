import { PrismaService } from 'src/prisma/prisma.service';
import { createDepartmentDto } from './validationSchemas/department.validationSchema';
import { Prisma } from '@prisma/client';
export declare class DepartmentService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getDepartments(): Promise<({
        _count: {
            students: number;
            courses: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getSingleDepartment(id: string): Promise<{
        _count: {
            students: number;
            courses: number;
        };
        students: ({
            PersonalInformation: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                passport: string | null;
                firstName: string;
                lastName: string;
                otherNames: string | null;
                dateOfBirth: Date;
                gender: import(".prisma/client").$Enums.Gender;
                disability: string;
                maritalStatus: import(".prisma/client").$Enums.MaritalStatus;
                email: string;
                phoneNumber: string;
                NIN: string;
                state: string;
                lga: string;
                nationality: string;
                contactAddress: string;
                studentId: string;
            };
            registeredBy: {
                username: string;
                active: boolean | null;
                password: string;
                id: string;
                role: import(".prisma/client").$Enums.Role | null;
                token: number;
                usedToken: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            registrationNumber: string;
            level: number;
            faculty: string;
            departmentId: string;
            printedByUserId: string | null;
            registeredByUserId: string | null;
        })[];
        courses: {
            course: {
                code: string;
                id: string;
                level: number;
                title: string;
                unit: number;
                semester: import(".prisma/client").$Enums.Semister;
                category: import(".prisma/client").$Enums.CourseCategory;
            };
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getRegisteredCourses(departmentId: string): Promise<{
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: number;
        title: string;
        unit: number;
        semester: import(".prisma/client").$Enums.Semister;
        category: import(".prisma/client").$Enums.CourseCategory;
    }[]>;
    create(data: createDepartmentDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: createDepartmentDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    registerCourse(departmentId: string, courseId: string | string[]): Promise<Prisma.BatchPayload>;
    deleteRegisteredCourse(departmentId: string, courseId: string | string[]): Promise<Prisma.BatchPayload>;
}
