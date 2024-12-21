import { SemesterEnum } from 'src/course/validationSchema/course.validationSchema';
import { z } from 'zod';

export const updateConfigValidation = z.object({
  session: z.string({
    invalid_type_error: 'session should be string',
    required_error: 'session is required',
  }),
  current_semester: SemesterEnum,
  allow_login: z.boolean({
    invalid_type_error: 'allow login should be boolean',
    required_error: 'allow login is required',
  }),
  allow_data_update: z.boolean({
    invalid_type_error: 'allow data update should be boolean',
    required_error: 'allow data update is required',
  }),
});

export type UpdateConfigDto = z.infer<typeof updateConfigValidation>;
