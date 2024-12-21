import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientValidationError, PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('exception >>>>', exception);

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code == 'P2002') {
        const fields = exception.meta?.target as string | undefined;
        let message = 'record already exists';

        if (fields) {
          message = `${fields.split('_')[1]} already exist`;
        }

        return response.status(HttpStatus.BAD_REQUEST).json({
          message,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (exception.code == 'P2025') {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'record not found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      if (exception.code == 'P2003') {
        const fields = exception.meta?.field_name as string | undefined;
        let message = 'record not found';

        if (fields) {
          message = `${fields} not found`;
        }

        return response.status(HttpStatus.NOT_FOUND).json({
          message,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
    }

    if (exception instanceof PrismaClientValidationError) {
      return response.status(400).json({
        statusCode: 400,
        message: exception.message,
        error: 'Validation Error',
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      return response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'internal server error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
