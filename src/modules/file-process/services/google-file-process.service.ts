import { IFile } from '@modules/file/entities/definitions/file.interface';
import { Injectable } from '@nestjs/common';
import { IFileProcess } from './definitions/file-access.interface';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import { LocalFileProcessService } from './local-file-process.service';

@Injectable()
export class GoogleFileProcessService implements IFileProcess {
    private storage: any;
    private storageFolder: string;
    private bucketName: string;
    constructor(
        private config: ConfigService,
        private localFileProcessService: LocalFileProcessService,
    ) {
        this.bucketName = this.config.get('bucketName');
        this.storageFolder = this.config.get('storageFolder');
        this.storage = new Storage();
        this.storage.bucket(this.bucketName);
    }
    async saveFiles(files: Array<Express.Multer.File>, publicKey: string, privateKey: string): Promise<void> {
        let fileName = `${files[0].filename}`
        let filePath = `${this.storageFolder}/${fileName}`
        if (files.length > 1) {
            this.localFileProcessService.convertToZip(files, publicKey)
            fileName = `${publicKey}.zip`
            filePath = `${this.storageFolder}/${fileName}`
        }
        await this.storage.bucket.upload(filePath, {
            destination: fileName,
        });
        return;
    }

    removeFiles(files: IFile[]): void {
        files.forEach(element => {
            this.storage.file(element.name).delete()
        });
        return;
    }
}
