"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const storage_enum_1 = require("../../../common/enums/storage.enum");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const file_repository_1 = require("../repository/file.repository");
const local_file_process_service_1 = require("../../file-process/services/local-file-process.service");
const google_file_process_service_1 = require("../../file-process/services/google-file-process.service");
const status_enum_1 = require("../../../common/enums/status.enum");
let FileService = class FileService {
    constructor(repository, config, localFileAccessService, googleFileAccessService) {
        this.repository = repository;
        this.config = config;
        this.localFileAccessService = localFileAccessService;
        this.googleFileAccessService = googleFileAccessService;
    }
    async create(files) {
        try {
            let provider = this.config.get('provider');
            let storageFolder = this.config.get('storageFolder');
            const { privateKey, publicKey } = this.generateKeys();
            let data = files.map((item) => {
                let location = `${storageFolder}/${item.filename}`;
                return {
                    name: item.filename,
                    provider,
                    location,
                    publicKey,
                    privateKey,
                };
            });
            if (provider == storage_enum_1.StorageProviderType.Google) {
                await this.googleFileAccessService.saveFiles(data);
            }
            else if (provider == storage_enum_1.StorageProviderType.Local) {
                await this.localFileAccessService.saveFiles(data);
            }
            await this.repository.save(data);
            return {
                privateKey,
                publicKey,
            };
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Could not save the file!!');
        }
    }
    async findByKey(publicKey) {
        let files = await this.repository.findByPublicKey(publicKey);
        if (!files.length) {
            throw new common_1.BadRequestException('Invalid public key!!');
        }
        return files;
    }
    async remove(privateKey) {
        try {
            let files = await this.repository.findByPrivateKey(privateKey);
            files = files.map((item) => {
                item.status = status_enum_1.StatusType.Deleted;
                return item;
            });
            this.localFileAccessService.removeFiles(files);
            await this.repository.save(files);
            return;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('Could not save the file!!');
        }
    }
    generateKeys() {
        let diffHell = crypto_1.createDiffieHellman(60);
        diffHell.generateKeys('hex');
        let publicKey = diffHell.getPublicKey('hex');
        let privateKey = diffHell.getPrivateKey('hex');
        return {
            publicKey,
            privateKey,
        };
    }
};
FileService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_repository_1.FileRepository,
        config_1.ConfigService,
        local_file_process_service_1.LocalFileAccessService,
        google_file_process_service_1.GoogleFileAccessService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map