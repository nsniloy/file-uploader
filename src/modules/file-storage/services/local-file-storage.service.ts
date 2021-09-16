import { IFile } from '../../file/entities/definitions/file.interface';
import { Injectable } from '@nestjs/common';
import { IFileStorage } from './definitions/file-storage.interface';
import * as AdmZip from 'adm-zip';
import { unlinkSync } from 'fs'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalFileStorageService implements IFileStorage {
    private storageFolder: string;
    constructor(
        private config: ConfigService,
    ) {
        this.storageFolder = this.config.get('storageFolder');
    }
    async saveFiles(files: Array<Express.Multer.File>, publicKey: string): Promise<void> {
        if (files.length < 2) {
            return;
        }
        //converting multiple files in one zip file
        this.convertToZip(files, publicKey)
        return;
    }

    removeFiles(files: IFile[]): void {
        files.forEach((item) => {
            unlinkSync(item.location)
        })
        return;
    }

    convertToZip(files: Array<Express.Multer.File>, publicKey: string): void {
        let zip = new AdmZip()
        //adding each file to zip
        files.forEach(element => {
            let location = `${this.storageFolder}/${element.filename}`
            zip.addLocalFile(location);
        });
        //saving zip file to disk
        zip.writeZip(`${this.storageFolder}/${publicKey}.zip`)
        return;
    }
}
