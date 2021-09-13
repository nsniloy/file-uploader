/// <reference types="multer" />
import { FileService } from '../services';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(files: Array<Express.Multer.File>): Promise<any>;
    findAll(): Promise<any[]>;
    remove(id: number): Promise<void>;
}
