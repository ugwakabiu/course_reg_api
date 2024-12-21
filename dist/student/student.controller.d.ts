import { CreateStudentDto, UpdateStudentDto } from './valdationSchemas/student.validationSchema';
import { StudentService } from './student.service';
import { RegisterCourseDto } from 'src/department/validationSchemas/registerCourse.validationSchema';
import { Request } from 'express';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    getAll(): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    create(body: CreateStudentDto, userId: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    delete(id: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    uploadLoadPassport(id: string, req: Request): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    get(id: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    update(id: string, body: UpdateStudentDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    registerCourse(id: string, body: RegisterCourseDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    deleteRegisteredCourse(id: string, body: RegisterCourseDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    getRecomendedCourses(id: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    getRegisteredCourses(id: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    printSlip(studentId: string, userId: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
}
