import { IFile } from "@modules/file/entities/definitions/file.interface";

export interface IFileProcess {
    saveFiles (files: Array<Express.Multer.File>, publicKey: string, privateKey: string): Promise<void>;
    removeFiles (files: IFile[]): void;
}
