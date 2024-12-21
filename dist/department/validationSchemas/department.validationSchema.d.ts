import { z } from 'zod';
export declare const createDepartmentValidationSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export declare const updateDepartmentValidationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export type createDepartmentDto = Required<z.infer<typeof createDepartmentValidationSchema>>;
export type UpdateDepartmentDto = z.infer<typeof updateDepartmentValidationSchema>;
