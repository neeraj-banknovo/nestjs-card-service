import {
  AppConfig, CachingConfig, Config, DatabaseConfig,
} from './config.interface';

const { env, } = process;

const DEFAULT_CONFIG: Config = {
  appConfig: {
    env: 'local',
    port: 3000,
    appName: 'NestApp',
  },
  dbConfig: {
    dbUrl: null,
  },
  cachingConfig: {
    host: 'localhost',
    max_item: 300,
    ttl: 300,
    port: 6379,
  },
};

export const appConfig = (): AppConfig => ({
  env: env.NODE_ENV || DEFAULT_CONFIG.appConfig.env,
  port: Number(env.PORT || DEFAULT_CONFIG.appConfig.port),
  appName: env.APP_NAME || DEFAULT_CONFIG.appConfig.appName,
});

export const dbConfig = (): DatabaseConfig => ({
  dbUrl: env.DATABASE_URL || DEFAULT_CONFIG.dbConfig.dbUrl,
});

export const cachingConfig = (): CachingConfig => ({
  host: env.CACHING_HOST || DEFAULT_CONFIG.cachingConfig.host,
  max_item: Number(env.CACHING_MAX_ITEM || DEFAULT_CONFIG.cachingConfig.max_item),
  ttl: Number(env.CACHING_TTL || DEFAULT_CONFIG.cachingConfig.ttl),
  port: Number(env.CACHING_PORT || DEFAULT_CONFIG.cachingConfig.port),
});

export const configFun = {
  isDevEnvironment: () => appConfig().env !== 'production',
  isProduction: () => appConfig().env === 'production',
};
