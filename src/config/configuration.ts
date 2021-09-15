import { StorageProviderType } from '@common/enums/storage.enum';
import dbConfig from './database.config';

export default () => {
  return {
    port: process.env.PORT,
    database: dbConfig,
    storageFolder: process.env.FOLDER || 'uploads',
    provider: process.env.PROVIDER || StorageProviderType.Local,
    downloadLimit: process.env.DOWNLOAD_LIMIT || 100,
    uploadLimit: process.env.UPLOAD_LIMIT || 100,
    bucketName: process.env.BUCKET_NAME,
  }
};
