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
exports.File = void 0;
const status_enum_1 = require("../../../common/enums/status.enum");
const storage_enum_1 = require("../../../common/enums/storage.enum");
const typeorm_1 = require("typeorm");
let File = class File extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: String
    }),
    __metadata("design:type", String)
], File.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: String
    }),
    __metadata("design:type", String)
], File.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({
        type: String,
        default: storage_enum_1.StorageProviderType.Local
    }),
    __metadata("design:type", String)
], File.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column({
        type: String
    }),
    typeorm_1.Index(),
    __metadata("design:type", String)
], File.prototype, "publicKey", void 0);
__decorate([
    typeorm_1.Column({
        type: String
    }),
    typeorm_1.Index(),
    __metadata("design:type", String)
], File.prototype, "privateKey", void 0);
__decorate([
    typeorm_1.Column({
        type: String,
        default: status_enum_1.StatusType.Active
    }),
    typeorm_1.Index(),
    __metadata("design:type", String)
], File.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], File.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], File.prototype, "updatedAt", void 0);
File = __decorate([
    typeorm_1.Entity()
], File);
exports.File = File;
//# sourceMappingURL=file.entity.js.map