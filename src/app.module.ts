import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { FileModule } from './modules/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { FileStorageModule } from './modules/file-storage/file-storage.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let dest = configService.get('storageFolder')
        if (!existsSync(dest)) {
          mkdirSync(dest);
        }
        return {
          dest,
        }
      },
      inject: [ConfigService],
    }),
    HttpModule,
    FileModule,
    FileStorageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
