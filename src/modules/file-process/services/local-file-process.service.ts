import { IFile } from '@modules/file/entities/definitions/file.interface';
import { Injectable } from '@nestjs/common';
import { IFileAccess } from './definitions/file-access.interface';
import AdmZip from 'adm-zip';
import { unlinkSync } from 'fs'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalFileAccessService implements IFileAccess {
    constructor(
        private config: ConfigService,
    ) { }
    async saveFiles(files: IFile[]): Promise<void> {
        if (files.length < 2) {
            return;
        }
        let storageFolder: string = this.config.get('storageFolder');
        let zip = new AdmZip()
        files.forEach(element => {
            //adding each file to zip
            zip.addLocalFile(element.location);
        });
        zip.writeZip(`${storageFolder}/${files[0].publicKey}.zip`)
        //return download url
    }

    removeFiles(files: IFile[]): void {
        files.forEach((item) => {
            unlinkSync(item.location)
        })
    }
}
