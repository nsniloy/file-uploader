import { StatusType } from '@common/enums/status.enum';
import { StorageProviderType } from '@common/enums/storage.enum';
import { BaseEntity } from 'typeorm';
export declare class File extends BaseEntity {
    id: number;
    name: string;
    location: string;
    provider: StorageProviderType;
    publicKey: string;
    privateKey: string;
    status: StatusType;
    createdAt: Date;
    updatedAt: Date;
}
