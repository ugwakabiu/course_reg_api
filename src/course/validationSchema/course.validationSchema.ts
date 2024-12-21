import { z } from 'zod';

const level = [100, 200, 300, 400];

export const SemesterEnum = z.enum(['first', 'second', 'third'], {
  required_error: 'semester is required',
  message: 'semester should be either first, second or third',
  invalid_type_error: 'semester should be either first, second or third',
});

const CourseCategoryEnum = z.enum(['core', 'elective'], {
  required_error: 'course category is required',
  message: 'Course category should be either core or elective',
  invalid_type_error: 'Course category should be either core or elective',
});

export const levelEnum = z
  .any()
  .transform((val) => +val)
  .refine((value) => level.includes(value), {
    message: 'level should be either 100, 200, 300, or 400',
  });

export const createCourseValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      message: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, 'Title cannot be empty')
    .max(355, 'Title cannot exceed 355 characters'),

  code: z
    .string({
      required_error: 'Code is required',
      invalid_type_error: 'Code must be a string',
    })
    .min(1, 'Code cannot be empty')
    .max(20, 'Code cannot exceed 20 characters'),

  level: levelEnum,

  unit: z.coerce
    .number({
      required_error: 'Unit is required',
      invalid_type_error: 'Unit must be a number',
    })
    .int('Unit must be an integer')
    .positive('Unit must be a positive number'),

  semester: SemesterEnum,

  category: CourseCategoryEnum,
});

export const updateCourseValidationSchema =
  createCourseValidationSchema.partial();

export type UpdateCourseDto = Required<
  z.infer<typeof updateCourseValidationSchema>
>;

export type CreateCourseDto = Required<
  z.infer<typeof createCourseValidationSchema>
>;
