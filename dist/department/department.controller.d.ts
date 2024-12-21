import { createDepartmentDto } from './validationSchemas/department.validationSchema';
import { DepartmentService } from './department.service';
import { RegisterCourseDto } from './validationSchemas/registerCourse.validationSchema';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    getDepartments(): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    getSingleDepartment(id: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    createDepartment(body: createDepartmentDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    updateDepartment(id: string, body: createDepartmentDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    deleteDepartment(id: string): Promise<{
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
}
