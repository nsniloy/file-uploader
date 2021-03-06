import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileService } from '../services';
import { ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { editFileName } from '../../../common/middlewares/file-rename.middleware';
import { Response } from 'express';
import { IFile } from '../entities/definitions/file.interface';
import { ConfigService } from '@nestjs/config';
import { RateLimit } from 'nestjs-rate-limiter';
import { ApiFile } from '../../../common/decorators/api-file.decorator';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) { }

  @ApiOperation({ description: 'Uploads new files' })
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @Post()
  @RateLimit({ //setting up rate limit and duration
    duration: 60 * 60 * 24,
    points: Number(process.env.UPLOAD_LIMIT) || 1000
  })
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({ //setting up file saving configuration
      filename: editFileName,
      destination: process.env.FOLDER || 'uploads'
    })
  }))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      ...await this.fileService.create(files),
      message: 'Files saved successfully!!'
    };
  }

  @ApiOperation({ description: 'Returns all files for a public key' })
  @RateLimit({ //setting up rate limit and duration
    duration: 60 * 60 * 24,
    points: Number(process.env.DOWNLOAD_LIMIT) || 1000
  })
  @Get(':publicKey')
  async downloadByKey(@Param('publicKey') publicKey: string, @Res() res: Response) {
    let files: IFile[] = await this.fileService.findByKey(publicKey);
    let location:string = files[0]?.location
    if (files.length >1) {
      let folderRoot = this.configService.get('storageFolder')
      location = `${folderRoot}/${publicKey}.zip`
    }
    res.download(location)
  }

  @ApiOperation({ description: 'Deletes a file' })
  @Delete(':privateKey')
  async remove(@Param('privateKey') privateKey: string) {
    await this.fileService.remove(privateKey)
    return {
      message: 'Files deleted successfully!!'
    };
  }

}

