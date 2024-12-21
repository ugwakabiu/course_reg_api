import { z } from 'zod';

export const createDepartmentValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name should be string',
      required_error: 'name is required',
    })
    .min(2, 'department sholud be atleast 2 letters'),
});

export const updateDepartmentValidationSchema =
  createDepartmentValidationSchema.partial();

export type createDepartmentDto = Required<
  z.infer<typeof createDepartmentValidationSchema>
>;

export type UpdateDepartmentDto = z.infer<
  typeof updateDepartmentValidationSchema
>;
