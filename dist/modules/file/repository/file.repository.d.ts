import { File } from '../entities/file.entity';
import { Repository } from 'typeorm';
export declare class FileRepository extends Repository<File> {
    findByPublicKey(publicKey: string): Promise<File[]>;
    findByPrivateKey(privateKey: string): Promise<File[]>;
}
