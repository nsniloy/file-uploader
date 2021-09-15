import { IFile } from '@modules/file/entities/definitions/file.interface';
import { Injectable } from '@nestjs/common';
import { IFileAccess } from './definitions/file-access.interface';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class GoogleFileAccessService implements IFileAccess {
    private storage: any;
    constructor(
        private config: ConfigService,
    ) {
        this.storage = new Storage();
        this.storage.bucket(this.config.get('bucketName'))
    }
    saveFiles(files: IFile[]): Promise<void> {
        files.forEach(element => {
            this.storage.upload(element.location, {
                destination: element.name,
            });
        });
        //return download url
        return;
    }

    removeFiles(files: IFile[]): void {
        files.forEach(element => {
            this.storage.file(element.name).delete()
        });
        return;
    }
}
