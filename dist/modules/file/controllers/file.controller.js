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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_rename_middleware_1 = require("../../../common/middlewares/file-rename.middleware");
const config_1 = require("@nestjs/config");
const nestjs_rate_limiter_1 = require("nestjs-rate-limiter");
let FileController = class FileController {
    constructor(fileService, configService) {
        this.fileService = fileService;
        this.configService = configService;
    }
    async uploadFile(files) {
        return Object.assign(Object.assign({}, await this.fileService.create(files)), { message: 'Files saved successfully!!' });
    }
    async downloadByKey(publicKey, res) {
        let files = await this.fileService.findByKey(publicKey);
        if (files.length == 1) {
            res.download(files[0].location);
        }
        else {
            let folderRoot = this.configService.get('storageFolder');
            res.download(`${folderRoot}/${publicKey}.zip`);
        }
    }
    async remove(privateKey) {
        await this.fileService.remove(privateKey);
        return {
            message: 'Files deleted successfully!!'
        };
    }
};
__decorate([
    swagger_1.ApiOperation({ description: 'Uploads new files' }),
    common_1.Post(),
    nestjs_rate_limiter_1.RateLimit({
        duration: 60 * 60 * 24,
        points: Number(process.env.UPLOAD_LIMIT) || 1000
    }),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 10, {
        storage: multer_1.diskStorage({
            filename: file_rename_middleware_1.editFileName,
            destination: process.env.FOLDER
        })
    })),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    swagger_1.ApiOperation({ description: 'Returns all files for a public key' }),
    nestjs_rate_limiter_1.RateLimit({
        duration: 60 * 60 * 24,
        points: Number(process.env.DOWNLOAD_LIMIT) || 1000
    }),
    common_1.Get(':publicKey'),
    __param(0, common_1.Param('publicKey')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "downloadByKey", null);
__decorate([
    swagger_1.ApiOperation({ description: 'Deletes a file' }),
    common_1.Delete(':privateKey'),
    __param(0, common_1.Param('privateKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "remove", null);
FileController = __decorate([
    swagger_1.ApiTags('Files'),
    common_1.Controller('files'),
    __metadata("design:paramtypes", [services_1.FileService,
        config_1.ConfigService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map