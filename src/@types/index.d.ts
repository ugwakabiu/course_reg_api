/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import * as express from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';

// Extend the Express Request interface to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: User;
      files?: FileArray[]; // You can replace `any` with a more specific user type if you have one
    }
  }
}
