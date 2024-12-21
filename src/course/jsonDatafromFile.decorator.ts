import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const JsonDataFromFile = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    if (!req.files || !req.files?.['file']) {
      throw new BadRequestException('course json file is required');
    }

    const file = req.files?.['file'][0] || req.files['file'];

    const jsonFile = JSON.parse(file?.data?.toString('utf-8'));
    return jsonFile;
  },
);
