/// <reference types="multer" />
import { FileRepository } from '../repository/file.repository';
export declare class FileService {
    private repository;
    constructor(repository: FileRepository);
    create(files: Array<Express.Multer.File>): Promise<void>;
    findAll(): Promise<import("../entities/file.entity").File[]>;
    remove(id: number): Promise<void>;
}
