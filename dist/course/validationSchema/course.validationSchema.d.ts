import { z } from 'zod';
export declare const SemesterEnum: z.ZodEnum<["first", "second", "third"]>;
export declare const levelEnum: z.ZodEffects<z.ZodEffects<z.ZodAny, number, any>, number, any>;
export declare const createCourseValidationSchema: z.ZodObject<{
    title: z.ZodString;
    code: z.ZodString;
    level: z.ZodEffects<z.ZodEffects<z.ZodAny, number, any>, number, any>;
    unit: z.ZodNumber;
    semester: z.ZodEnum<["first", "second", "third"]>;
    category: z.ZodEnum<["core", "elective"]>;
}, "strip", z.ZodTypeAny, {
    code?: string;
    level?: number;
    title?: string;
    unit?: number;
    semester?: "first" | "second" | "third";
    category?: "elective" | "core";
}, {
    code?: string;
    level?: any;
    title?: string;
    unit?: number;
    semester?: "first" | "second" | "third";
    category?: "elective" | "core";
}>;
export declare const updateCourseValidationSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodAny, number, any>, number, any>>;
    unit: z.ZodOptional<z.ZodNumber>;
    semester: z.ZodOptional<z.ZodEnum<["first", "second", "third"]>>;
    category: z.ZodOptional<z.ZodEnum<["core", "elective"]>>;
}, "strip", z.ZodTypeAny, {
    code?: string;
    level?: number;
    title?: string;
    unit?: number;
    semester?: "first" | "second" | "third";
    category?: "elective" | "core";
}, {
    code?: string;
    level?: any;
    title?: string;
    unit?: number;
    semester?: "first" | "second" | "third";
    category?: "elective" | "core";
}>;
export type UpdateCourseDto = Required<z.infer<typeof updateCourseValidationSchema>>;
export type CreateCourseDto = Required<z.infer<typeof createCourseValidationSchema>>;
