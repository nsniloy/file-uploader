import { StatusType } from "@common/enums/status.enum";
import { StorageProviderType } from "@common/enums/storage.enum";

export class IFile {
  id?: number;
  name: string;
  location: string;
  provider: StorageProviderType;
  publicKey: string;
  privateKey: string;
  status?: StatusType;
  createdAt?: Date;
  updatedAt?: Date;
}