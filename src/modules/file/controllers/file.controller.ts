import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from '../services';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { editFileName } from '@common/middlewares/file-rename.middleware';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @ApiOperation({ description: 'Uploads new file(s)' })
  @Post()
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      filename: editFileName,
    })
  }))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.fileService.create(files);
  }

  @ApiOperation({ description: 'Returns all the files' })
  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  @ApiOperation({ description: 'Deletes a file' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.fileService.remove(id);
  }
}

