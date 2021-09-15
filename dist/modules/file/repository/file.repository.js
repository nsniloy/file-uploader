"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const file_entity_1 = require("../entities/file.entity");
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../../../common/enums/status.enum");
let FileRepository = class FileRepository extends typeorm_1.Repository {
    async findByPublicKey(publicKey) {
        return await this.find({
            publicKey,
            status: status_enum_1.StatusType.Active
        });
    }
    async findByPrivateKey(privateKey) {
        return await this.find({
            privateKey,
            status: status_enum_1.StatusType.Active
        });
    }
};
FileRepository = __decorate([
    typeorm_1.EntityRepository(file_entity_1.File)
], FileRepository);
exports.FileRepository = FileRepository;
//# sourceMappingURL=file.repository.js.map