import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dbConfig } from './config/config';
import { CardModule } from './modules/card/card.module';
import { CronJobModule } from './crons/cron.module';

const configs = [appConfig, dbConfig];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...configs],
    }),
    CardModule,
    DatabaseModule,
    CronJobModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule { }
