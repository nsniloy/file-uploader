import { Injectable } from '@nestjs/common';
import { IFile } from '../entities/definitions/file.interface';
import { FileRepository } from '../repository/file.repository';

@Injectable()
export class FileService {
  constructor(private repository: FileRepository) {}
  async create(files: Array<Express.Multer.File>) {
    console.log(files);
    // return await this.repository.save({});
  }

  async findAll() {
    return await this.repository.find();
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return;
  }
}
