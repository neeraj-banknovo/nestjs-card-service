import { DataSource, } from 'typeorm';
import { dbConfig, } from '../../config/config';

export const ConnectionSource = new DataSource({
  type: 'postgres',
  url: dbConfig().dbUrl,
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
  database: 'card_service',
  logging: true,
  entities: [
    `${__dirname}../../../modules/**/*.entity{.ts,.js}`,
  ],
  migrations: [ '../../../database/migrations/*.js', ],
});
