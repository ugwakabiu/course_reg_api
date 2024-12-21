import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type !== 'body') return value;

      if (Array.isArray(value)) {
        const parsedArray = value.map((item, index) => {
          try {
            return this.schema.parse(item); // Validate each course
          } catch (error) {
            if (error instanceof ZodError) {
              throw new BadRequestException(
                `${error.errors[0].message} at course no.: ${index + 1}`,
              );
            }
          }
        });
        return parsedArray; // Return parsed array if successful
      }

      // Validate the value as a single object
      return this.schema.parse(value);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.log('zod erro >>>', error);
        throw new BadRequestException(error.errors[0].message);
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Invalid request data');
    }
  }
}
