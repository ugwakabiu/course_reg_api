import { z } from 'zod';

export const updatePasswordValidationSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: 'Current password is required',
        invalid_type_error: 'Current password must be a string',
      })
      .min(6, 'Current password must be at least 6 characters long'),
    newPassword: z
      .string({
        required_error: 'New password is required',
        invalid_type_error: 'New password must be a string',
      })
      .min(6, 'New password must be at least 6 characters long'),
    confirmPassword: z
      .string({
        required_error: 'Confirm password is required',
        invalid_type_error: 'Confirm password must be a string',
      })
      .min(6, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'], // Highlight the confirmPassword field on error
  });

export type UpdatePasswordDto = z.infer<typeof updatePasswordValidationSchema>;
