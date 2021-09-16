require('dotenv').config()
export default {
  type: 'mysql',
  host: process.env.DB_HOST || '165.232.185.240',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'dev_test',
  password: process.env.DB_PASSWORD || 'Az-12345',
  database: process.env.DB_NAME || 'meldcx',
  autoLoadEntities: true,
  keepConnectionAlive: true,
  charset: 'utf8',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  cli: {
    migrationsDir: 'migrations',
  },
  migrationsRun: false,
};
