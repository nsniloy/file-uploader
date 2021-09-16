import { StatusType, StorageProviderType } from "../../../../common/enums";

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