import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv.config({
  path: '.env.development',
});

const SqliteTestDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
};

const PostgresDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  subscribers: [],
  synchronize: false,
  logging: false,
  dropSchema: false,
  ssl: {
    rejectUnauthorized: false, 
  },
};

export const postgresDataSourceConfig = registerAs(
  'postgres',
  () => PostgresDataSourceOptions,
);

export const sqliteDataSourceConfig = registerAs(
  'sqlite',
  () => SqliteTestDataSourceOptions,
);

export const SqliteDateSource = new DataSource(SqliteTestDataSourceOptions);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);