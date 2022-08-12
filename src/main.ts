import { NestFactory, } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import {
  INestApplication,
  NestApplicationOptions,
} from '@nestjs/common';
import { AppModule, } from './app.module';
import { ResponseTransformInterceptor, } from './common/interceptors/response.interceptor';
import { appConfig, } from './config/config';
import { LoggerService, } from './shared/services/logger.service';
import { ClusterService } from './cluster';

const env: NodeJS.ProcessEnv = process.env;

async function bootstrap() {
  const opts: NestApplicationOptions = {};
  const app: INestApplication = await NestFactory.create<INestApplication>(
    AppModule,
    opts
  );
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.enableCors();

  await app.listen(appConfig().port);
  new LoggerService('APP').log(
    `Application :: ${appConfig().appName} is running and pointing to => ${
      appConfig().env
    }`
  );
}

ClusterService.scale(bootstrap);
