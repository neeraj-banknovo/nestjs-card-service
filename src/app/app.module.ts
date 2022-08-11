import { Module, } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';
import { AppController, } from './app.controller';
import { DatabaseModule, } from './database/database.module';
import { appConfig, cachingConfig, dbConfig, } from './config/config';
import { CardModule, } from './modules/card/card.module';
import { CachingModule, } from './caching/caching.module';

const configs = [ appConfig, dbConfig, cachingConfig, ];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ ...configs, ],
    }),
    CardModule,
    DatabaseModule,
    CachingModule,
  ],
  controllers: [ AppController, ],
  providers: [],
})
export class AppModule { }
