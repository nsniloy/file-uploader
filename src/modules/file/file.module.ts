import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './repository/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
