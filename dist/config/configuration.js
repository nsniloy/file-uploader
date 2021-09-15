"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_enum_1 = require("../common/enums/storage.enum");
const database_config_1 = require("./database.config");
exports.default = () => {
    return {
        port: process.env.PORT,
        database: database_config_1.default,
        storageFolder: process.env.FOLDER || 'uploads',
        provider: process.env.PROVIDER || storage_enum_1.StorageProviderType.Local,
        downloadLimit: process.env.DOWNLOAD_LIMIT || 100,
        uploadLimit: process.env.UPLOAD_LIMIT || 100,
        bucketName: process.env.BUCKET_NAME,
    };
};
//# sourceMappingURL=configuration.js.map