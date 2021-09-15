/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { FileRepository } from '../repository/file.repository';
import { LocalFileAccessService } from '@modules/file-process/services/local-file-process.service';
import { GoogleFileAccessService } from '@modules/file-process/services/google-file-process.service';
export declare class FileService {
    private repository;
    private config;
    private localFileAccessService;
    private googleFileAccessService;
    constructor(repository: FileRepository, config: ConfigService, localFileAccessService: LocalFileAccessService, googleFileAccessService: GoogleFileAccessService);
    create(files: Array<Express.Multer.File>): Promise<{
        privateKey: string;
        publicKey: string;
    }>;
    findByKey(publicKey: string): Promise<import("../entities/file.entity").File[]>;
    remove(privateKey: string): Promise<void>;
    private generateKeys;
}
