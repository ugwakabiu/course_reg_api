import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: ZodSchema);
    transform(value: any, metadata: ArgumentMetadata): any;
}
