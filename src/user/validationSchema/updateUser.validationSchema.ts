import { z } from 'zod';

export const updateUserValidationSchema = z.object({
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username should be string',
    })
    .optional(),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password should be string',
    })
    .min(6, { message: 'password should be at least 6 characters' })
    .optional(),
  active: z
    .boolean({ invalid_type_error: 'active should be boolean' })
    .optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserValidationSchema>;
