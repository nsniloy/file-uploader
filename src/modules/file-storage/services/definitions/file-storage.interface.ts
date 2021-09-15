import { IFile } from "@modules/file/entities/definitions/file.interface";

export interface IFileStorage {
    saveFiles (files: Array<Express.Multer.File>, publicKey: string): Promise<void>;
    removeFiles (files: IFile[]): void;
}
