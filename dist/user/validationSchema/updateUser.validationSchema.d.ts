import { z } from 'zod';
export declare const updateUserValidationSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    username?: string;
    active?: boolean;
    password?: string;
}, {
    username?: string;
    active?: boolean;
    password?: string;
}>;
export type UpdateUserDto = z.infer<typeof updateUserValidationSchema>;
