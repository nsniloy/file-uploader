import { StorageProviderType } from '@common/enums/storage.enum';
import { BadRequestException, ConflictException, HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDiffieHellman } from 'crypto';
import { IFile } from '../entities/definitions/file.interface';
import { FileRepository } from '../repository/file.repository';
import { LocalFileAccessService } from '@modules/file-process/services/local-file-process.service';
import { GoogleFileAccessService } from '@modules/file-process/services/google-file-process.service';
import { StatusType } from '@common/enums/status.enum';

@Injectable()
export class FileService {
  constructor(
    private repository: FileRepository,
    private config: ConfigService,
    private localFileAccessService: LocalFileAccessService,
    private googleFileAccessService: GoogleFileAccessService,
  ) { }
  async create(files: Array<Express.Multer.File>) {
    try {
      let provider: StorageProviderType = this.config.get('provider');
      let storageFolder: string = this.config.get('storageFolder');
      const { privateKey, publicKey } = this.generateKeys()
      let data: IFile[] = files.map((item) => {
        let location = `${storageFolder}/${item.filename}`
        return {
          name: item.filename,
          provider,
          location,
          publicKey,
          privateKey,
        }
      })
      if (provider == StorageProviderType.Google) {
        await this.googleFileAccessService.saveFiles(data)
      } else if (provider == StorageProviderType.Local) {
        await this.localFileAccessService.saveFiles(data)
      }
      await this.repository.save(data);
      return {
        privateKey,
        publicKey,
      }
    } catch (error) {
      Logger.error(error)
      throw new ConflictException('Could not save the file!!')
    }
  }

  async findByKey(publicKey: string) {
    let files = await this.repository.findByPublicKey(publicKey);
    if (!files.length) {
      throw new BadRequestException('Invalid public key!!')
    }
    return files;
  }

  async remove(privateKey: string) {
    try {
      let files: IFile[] = await this.repository.findByPrivateKey(privateKey);
      files = files.map((item) => {
        item.status = StatusType.Deleted
        return item
      })
      this.localFileAccessService.removeFiles(files)
      await this.repository.save(files);
      return;
    } catch (error) {
      Logger.error(error)
      throw new ConflictException('Could not save the file!!')
    }
  }

  private generateKeys() {
    let diffHell = createDiffieHellman(60);
    diffHell.generateKeys('hex');
    let publicKey = diffHell.getPublicKey('hex');
    let privateKey = diffHell.getPrivateKey('hex');
    return {
      publicKey,
      privateKey,
    }
  }
}
