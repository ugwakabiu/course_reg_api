import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as expressFileUpload from 'express-fileupload';
import * as cors from 'cors';
import { static as expressStatic } from 'express';
import { join as pathJoin } from 'path';
import { constant } from './constants/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cors());
  app.use(cookieParser());
  app.use(expressFileUpload());

  app.use(
    '/uploads',
    expressStatic(pathJoin(process.cwd(), constant.UPLOAD_DIR)),
  );

  await app.listen(constant.PORT, () =>
    console.log(`app listening on port: ${constant.PORT}`),
  );
}
bootstrap();
