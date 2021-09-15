import { StorageProviderType } from '@common/enums/storage.enum';
import { BadRequestException, ConflictException, HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDiffieHellman } from 'crypto';
import { IFile } from '../entities/definitions/file.interface';
import { FileRepository } from '../repository/file.repository';
import { LocalFileStorageService } from '@modules/file-storage/services/local-file-storage.service';
import { GoogleFileStorageService } from '@modules/file-storage/services/google-file-storage.service';
import { StatusType } from '@common/enums/status.enum';
import { LessThan, MoreThan } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class FileService {
  private storageFolder: string;
  private activePeriod: number;
  constructor(
    private repository: FileRepository,
    private config: ConfigService,
    private localFileStorageService: LocalFileStorageService,
    private googleFileStorageService: GoogleFileStorageService,
  ) {
    this.storageFolder = this.config.get('storageFolder');
    this.activePeriod = this.config.get('activePeriod');
  }
  async create(files: Array<Express.Multer.File>) {
    try {
      let provider: StorageProviderType = this.config.get('provider');
      const { privateKey, publicKey } = this.generateKeys()
      let data: IFile[] = files.map((item) => {
        let location = `${this.storageFolder}/${item.filename}`
        return {
          name: item.filename,
          provider,
          location,
          publicKey,
          privateKey,
        }
      })
      if (provider == StorageProviderType.Google) {
        await this.googleFileStorageService.saveFiles(files, publicKey)
      } else if (provider == StorageProviderType.Local) {
        await this.localFileStorageService.saveFiles(files, publicKey)
      }
      await this.repository.save(data);
      return {
        privateKey,
        publicKey,
      }
    } catch (error) {
      Logger.error(error)
      throw new ConflictException(error.message || 'Could not save the file!!')
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
      if (files[0].provider == StorageProviderType.Local) {
        this.localFileStorageService.removeFiles(files)
      } else {
        this.googleFileStorageService.removeFiles(files)
      }
      await this.repository.save(files);
      return;
    } catch (error) {
      Logger.error(error.message)
      throw new ConflictException(error.message || 'Could not remove the file!!')
    }
  }

  async findExpired() {
    let date = new Date(moment().subtract(this.activePeriod, 'days').format())
    let files = await this.repository.findExpired(date);
    return files;
  }

  async removeExpired() {
    try {
      //getting files that will be deleted
      let files: IFile[] = await this.findExpired();
      if (!files.length) {
        return;
      }
      let localFiles: IFile[] = []
      let googleFiles: IFile[] = []

      files = files.map((item) => {
        //updating status to deleted
        item.status = StatusType.Deleted;

        //seperating the array by provider type
        if (item.provider == StorageProviderType.Local) {
          localFiles.push(item)
        } else {
          googleFiles.push(item)
        }
        return item;
      })

      this.localFileStorageService.removeFiles(localFiles);
      this.googleFileStorageService.removeFiles(googleFiles);
      await this.repository.save(files);

      return;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Could not save the file!!');
    }
  }

  private generateKeys() {
    //create public key and private key
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
