export interface DatabaseConfig {
  dbUrl?: string;
}

export interface AppConfig {
  /**
   * The name of the environment.
   * @example 'test', 'development', 'staging', 'production'
   */
  env: string;

  appName: string;

  /** The port number of the http server to listen on. */
  port: number;
}

export interface CachingConfig {
  host: string;
  port: number;
  ttl: number;
  max_item: number;
}

export interface Config {
  appConfig: AppConfig;
  dbConfig: DatabaseConfig;
  cachingConfig: CachingConfig;
}
