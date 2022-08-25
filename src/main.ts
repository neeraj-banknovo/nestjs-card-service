import { NestFactory, } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import {
  INestApplication,
  NestApplicationOptions,
} from '@nestjs/common';
import { AppModule, } from './app.module';
import { appConfig, } from './config/config';
import { LoggerService, } from './shared/services/logger.service';

async function bootstrap() {
  const opts: NestApplicationOptions = {};
  const app: INestApplication = await NestFactory.create<INestApplication>(
    AppModule,
    opts
  );
  app.setGlobalPrefix('api');
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false, }));
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
bootstrap();

// to run in cluster mode with max core(s)
// ClusterService.scale(bootstrap);
