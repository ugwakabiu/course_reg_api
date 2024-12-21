import { z } from 'zod';
export declare const updateConfigValidation: z.ZodObject<{
    session: z.ZodString;
    current_semester: z.ZodEnum<["first", "second", "third"]>;
    allow_login: z.ZodBoolean;
    allow_data_update: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    session?: string;
    current_semester?: "first" | "second" | "third";
    allow_login?: boolean;
    allow_data_update?: boolean;
}, {
    session?: string;
    current_semester?: "first" | "second" | "third";
    allow_login?: boolean;
    allow_data_update?: boolean;
}>;
export type UpdateConfigDto = z.infer<typeof updateConfigValidation>;
