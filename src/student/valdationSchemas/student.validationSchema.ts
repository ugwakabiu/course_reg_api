import { levelEnum } from 'src/course/validationSchema/course.validationSchema';
import { z } from 'zod';

// Enums
const Gender = z.enum(['male', 'female'], {
  required_error: 'gender is required',
  invalid_type_error: 'gender should be either male or female',
});
const MaritalStatus = z.enum(['single', 'married'], {
  required_error: 'marital status is required',
  invalid_type_error: 'marital status should be either single or married',
});

// Unified Schema
export const createStudentValidationSchema = z.object({
  registrationNumber: z.string({
    required_error: 'Registration number is required',
    invalid_type_error: 'Registration number must be a string',
  }),
  level: levelEnum, // Assuming `levelEnum` is a Zod enum with proper error messages
  departmentId: z.string({
    required_error: 'Department ID is required',
    invalid_type_error: 'Department ID must be a string',
  }),
  passport: z.string().nullable().optional(),
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }),
  otherNames: z.string().optional(),
  dateOfBirth: z.coerce.date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Invalid date format',
  }),
  gender: Gender, // Assuming `Gender` is a Zod enum with proper error messages
  disability: z.string({
    required_error: 'Disability information is required',
    invalid_type_error: 'Disability information must be a string',
  }),
  maritalStatus: MaritalStatus, // Assuming `MaritalStatus` is a Zod enum with proper error messages
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid email format',
    })
    .email({ message: 'Invalid email address' }),
  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    })
    .min(10, { message: 'Phone number must be at least 10 characters' }),
  NIN: z.string({
    required_error: 'NIN is required',
    invalid_type_error: 'NIN must be a string',
  }),
  state: z.string({
    required_error: 'State is required',
    invalid_type_error: 'State must be a string',
  }),
  lga: z.string({
    required_error: 'LGA is required',
    invalid_type_error: 'LGA must be a string',
  }),
  nationality: z.string({
    required_error: 'Nationality is required',
    invalid_type_error: 'Nationality must be a string',
  }),
  contactAddress: z.string({
    required_error: 'Contact address is required',
    invalid_type_error: 'Contact address must be a string',
  }),
});

export const updateStudentValidationSchema =
  createStudentValidationSchema.partial();

export type CreateStudentDto = Required<
  z.infer<typeof createStudentValidationSchema>
>;
export type UpdateStudentDto = z.infer<typeof updateStudentValidationSchema>;
