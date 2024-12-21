import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.files || !req.files?.['file']) {
      throw new BadRequestException('course json file is required');
    }

    const file: UploadedFile = req.files?.['file'][0] || req.files['file'];

    if (file?.mimetype != 'application/json') {
      throw new BadRequestException(
        'Invalid file type. Only JSON files are allowed.',
      );
    }

    const jsonFile = JSON.parse(file?.data?.toString('utf-8'));
    req.body = jsonFile;

    return next.handle();
  }
}
