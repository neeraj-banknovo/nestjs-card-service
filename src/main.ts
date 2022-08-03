import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import {
  INestApplication,
  NestApplicationOptions,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseTransformInterceptor } from './app/interceptors/response.interceptor';
import { appConfig } from './app/config/config';
import { LoggerService } from './app/shared/services/logger.service';

async function bootstrap() {
  const opts: NestApplicationOptions = {};
  const app: INestApplication = await NestFactory.create<INestApplication>(
    AppModule,
    opts,
  );
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.enableCors();

  await app.listen(appConfig().port);
  new LoggerService('APP').log(
    `Application :: ${appConfig().appName} is running and pointing to => ${
      appConfig().env
    }`,
  );
}
bootstrap();
