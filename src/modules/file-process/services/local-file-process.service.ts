import { IFile } from '@modules/file/entities/definitions/file.interface';
import { Injectable } from '@nestjs/common';
import { IFileProcess } from './definitions/file-access.interface';
import * as AdmZip from 'adm-zip';
import { unlinkSync } from 'fs'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalFileProcessService implements IFileProcess {
    constructor(
        private config: ConfigService,
    ) { }
    async saveFiles(files: IFile[]): Promise<void> {
        if (files.length < 2) {
            return;
        }
        console.log(1211);
        
        let storageFolder: string = this.config.get('storageFolder');
        let zip = new AdmZip()
        console.log(zip);
        
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
