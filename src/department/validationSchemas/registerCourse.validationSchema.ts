import { z, ZodType } from 'zod';

export const registerCourseValidationSchema = z.object({
  courseId: z.any({ required_error: 'course id is required' }).refine(
    (data) => {
      if (typeof data === 'string') {
        return true;
      }
      return (
        Array.isArray(data) && data.every((item) => typeof item === 'string')
      );
    },
    {
      message: 'courseId should be a string or array of strings',
    },
  ) as ZodType<string | string[]>, // Explicitly cast as ZodType<string | string[]>
});

export type RegisterCourseDto = Required<
  z.infer<typeof registerCourseValidationSchema>
>;
