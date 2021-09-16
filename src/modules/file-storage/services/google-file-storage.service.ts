import { IFile } from '../../file/entities/definitions/file.interface';
import { Injectable } from '@nestjs/common';
import { IFileStorage } from './definitions/file-storage.interface';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import { LocalFileStorageService } from './local-file-storage.service';
import {readFileSync} from 'fs'

@Injectable()
export class GoogleFileStorageService implements IFileStorage {
    private storage: any;
    private storageFolder: string;
    private bucketName: string;
    constructor(
        private config: ConfigService,
        private localFileStorageService: LocalFileStorageService,
    ) {
        this.bucketName = this.config.get('bucketName');
        this.storageFolder = this.config.get('storageFolder');
        this.storage = new Storage({
            credentials: this.getCredentials()
        });
    }

    async saveFiles(files: Array<Express.Multer.File>, publicKey: string): Promise<void> {
        let fileName = `${files[0].filename}`
        let filePath = `${this.storageFolder}/${fileName}`
        
        //converting multiple files in one zip file
        if (files.length > 1) {
            this.localFileStorageService.convertToZip(files, publicKey)
            fileName = `${publicKey}.zip`
            filePath = `${this.storageFolder}/${fileName}`
        }
        
        //uploading to google cloud storage
        await this.storage.bucket(this.bucketName).upload(filePath, {
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

    private getCredentials(){
        let filePath: string = this.config.get('configuration')        
        let cred = JSON.parse(readFileSync(filePath, 'utf-8'))
        return cred
    }
}
