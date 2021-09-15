/// <reference types="multer" />
import { FileService } from '../services';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class FileController {
    private readonly fileService;
    private readonly configService;
    constructor(fileService: FileService, configService: ConfigService);
    uploadFile(files: Array<Express.Multer.File>): Promise<{
        message: string;
        privateKey: string;
        publicKey: string;
    }>;
    downloadByKey(publicKey: string, res: Response): Promise<void>;
    remove(privateKey: string): Promise<{
        message: string;
    }>;
}
