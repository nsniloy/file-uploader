"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    autoLoadEntities: true,
    charset: 'utf8',
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    database: process.env.DB_NAME,
    synchronize: true,
    cli: {
        migrationsDir: 'migrations',
    },
    migrationsRun: false,
};
//# sourceMappingURL=database.config.js.map