import { IFile } from '@modules/file/entities/definitions/file.interface';
import { Injectable } from '@nestjs/common';
import { IFileProcess } from './definitions/file-access.interface';
import * as AdmZip from 'adm-zip';
import { unlinkSync } from 'fs'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalFileProcessService implements IFileProcess {
    private storageFolder: string;
    constructor(
        private config: ConfigService,
    ) {
        this.storageFolder = this.config.get('storageFolder');
    }
    async saveFiles(files: Array<Express.Multer.File>, publicKey: string, privateKey: string): Promise<void> {
        if (files.length < 2) {
            return;
        }
        this.convertToZip(files, publicKey)
        return;
    }

    removeFiles(files: IFile[]): void {
        files.forEach((item) => {
            unlinkSync(item.location)
        })
    }

    convertToZip(files: Array<Express.Multer.File>, publicKey: string) {
        let zip = new AdmZip()
        //adding each file to zip
        files.forEach(element => {
            let location = `${this.storageFolder}/${element.filename}`
            zip.addLocalFile(location);
        });
        zip.writeZip(`${this.storageFolder}/${publicKey}.zip`)
    }
}
