/// <reference types="multer" />
import { FileRepository } from '../repository/file.repository';
export declare class FileService {
    private repository;
    constructor(repository: FileRepository);
    create(files: Array<Express.Multer.File>): Promise<any>;
    findAll(): Promise<any[]>;
    remove(id: number): Promise<void>;
}
