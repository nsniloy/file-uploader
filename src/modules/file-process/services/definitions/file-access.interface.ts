import { IFile } from "@modules/file/entities/definitions/file.interface";

export interface IFileProcess {
    saveFiles (files: IFile[]): Promise<void>;
    removeFiles (files: IFile[]): void;
}
