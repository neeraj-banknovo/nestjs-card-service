import { Module, } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig, } from '@nestjs/apollo';
import { GraphQLModule, } from '@nestjs/graphql';
import { GraphQLError, } from 'graphql';
import { AppController, } from './app.controller';
import { DatabaseModule, } from './providers/database/database.module';
import { appConfig, cachingConfig, dbConfig, } from './config/config';
import { CardModule, } from './modules/card/card.module';
import { CachingModule, } from './providers/caching/caching.module';

const configs = [ appConfig, dbConfig, cachingConfig, ];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // or set it to true if you want the schema to be generated in memory
      sortSchema: true,
      debug: true,
      useGlobalPrefix: true,
      path: '/graphql/app',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: any = {
          ...error.extensions,
        };
        return graphQLFormattedError;
      },
    }),
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
