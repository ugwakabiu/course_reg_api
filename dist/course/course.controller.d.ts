import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './validationSchema/course.validationSchema';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getCourses(): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    getSingleCourses(id: string): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    createCourse(course: CreateCourseDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    updateCourse(id: string, data: UpdateCourseDto): Promise<{
        message: string;
        success: boolean;
        payload: any;
    } | "no changes found">;
    deleteCourse(id: string | string[]): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
    uploadCourse(course: CreateCourseDto[]): Promise<{
        message: string;
        success: boolean;
        payload: any;
    }>;
}
