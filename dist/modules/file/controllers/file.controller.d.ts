/// <reference types="multer" />
import { FileService } from '../services';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(files: Array<Express.Multer.File>): Promise<void>;
    findAll(): Promise<import("../entities/file.entity").File[]>;
    remove(id: number): Promise<void>;
}
