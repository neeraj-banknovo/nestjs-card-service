import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dbConfig } from './config/config';
import { CardModule } from './modules/card/card.module';

const configs = [appConfig, dbConfig];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...configs],
    }),
    CardModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule { }

// What is NestJs -> IOC/DI

// Graph ->

// module -> root module (AppModule)

// module
// providers
// controllers


// appModule  -> CardModule -> CardTransactionModule