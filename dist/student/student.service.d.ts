import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './valdationSchemas/student.validationSchema';
import { Prisma } from '@prisma/client';
import { DepartmentService } from 'src/department/department.service';
import { UploadedFile } from 'express-fileupload';
import { UserService } from 'src/user/user.service';
import { CreateCourseDto } from 'src/course/validationSchema/course.validationSchema';
export declare class StudentService {
    private readonly prismaService;
    private readonly departmentService;
    private readonly userService;
    constructor(prismaService: PrismaService, departmentService: DepartmentService, userService: UserService);
    findAll(): Promise<({
        department: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
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
        printedBy: {
            username: string;
        };
        registeredBy: {
            username: string;
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
    })[]>;
    find(params: {
        id: string;
        select?: Prisma.StudentFindUniqueArgs['select'];
        include?: Prisma.StudentFindUniqueArgs['include'];
    }): Promise<{
        registeredCourses: any[];
        department: {
            name: string;
            id: string;
        };
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
        printedBy: {
            username: string;
        };
        registeredBy: {
            username: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string;
        level: number;
        faculty: string;
        departmentId: string;
        printedByUserId: string | null;
        registeredByUserId: string | null;
    }>;
    create(data: CreateStudentDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string;
        level: number;
        faculty: string;
        departmentId: string;
        printedByUserId: string | null;
        registeredByUserId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string;
        level: number;
        faculty: string;
        departmentId: string;
        printedByUserId: string | null;
        registeredByUserId: string | null;
    }>;
    update(id: string, data: UpdateStudentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string;
        level: number;
        faculty: string;
        departmentId: string;
        printedByUserId: string | null;
        registeredByUserId: string | null;
    }>;
    registerCourse(studentId: string, courseId: string | string[]): Promise<Prisma.BatchPayload>;
    deleteRegisteredCourses(studentId: string, courseId: string | string[]): Promise<Prisma.BatchPayload>;
    getRegisteredCourses(studentId: string, select?: Prisma.CourseFindManyArgs['select']): Promise<{
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            students: number;
            departments: number;
        };
        level: number;
        students: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            studentId: string;
            courseId: string;
        }[];
        title: string;
        unit: number;
        semester: import(".prisma/client").$Enums.Semister;
        category: import(".prisma/client").$Enums.CourseCategory;
        departments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string;
            courseId: string;
        }[];
    }[]>;
    getRecommendedCourses(studentId: string, type: 'current' | 'recommended', semester?: CreateCourseDto['semester']): Promise<{
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
    uploadPassport(studentId: string, file: UploadedFile): Promise<{
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
    }>;
    printSlip(studentId: string, userId: string): Promise<{
        registeredCourses: any[];
        department: {
            name: string;
            id: string;
        };
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
        printedBy: {
            username: string;
        };
        registeredBy: {
            username: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        registrationNumber: string;
        level: number;
        faculty: string;
        departmentId: string;
        printedByUserId: string | null;
        registeredByUserId: string | null;
    }>;
    registerRecommendedCourse(studentId: string): Promise<void>;
}
