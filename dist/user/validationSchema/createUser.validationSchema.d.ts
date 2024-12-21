import { z } from 'zod';
export declare const createUserValidationSchema: z.ZodObject<{
    username: z.ZodString;
    active: z.ZodOptional<z.ZodBoolean>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username?: string;
    active?: boolean;
    password?: string;
}, {
    username?: string;
    active?: boolean;
    password?: string;
}>;
export type CreateUserDto = z.infer<typeof createUserValidationSchema>;
