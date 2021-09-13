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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const create_permission_dto_1 = require("../dto/create-permission.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../common/decorators");
const permission_type_enum_1 = require("../../../common/enums/permission-type.enum");
let PermissionController = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    async create(createPermissionDto) {
        return await this.permissionService.create(createPermissionDto);
    }
    async findAll() {
        return await this.permissionService.findAll();
    }
    async remove(id) {
        return await this.permissionService.remove(id);
    }
};
__decorate([
    swagger_1.ApiOperation({ description: 'Creates a new permission' }),
    decorators_1.Permissions(permission_type_enum_1.PermissionType.PermissionCreate),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ description: 'Returns all the permissions' }),
    decorators_1.Permissions(permission_type_enum_1.PermissionType.UserPermissionView),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOperation({ description: 'Deletes a permission' }),
    decorators_1.Permissions(permission_type_enum_1.PermissionType.PermissionDelete),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "remove", null);
PermissionController = __decorate([
    swagger_1.ApiTags('Permission'),
    common_1.Controller('permission'),
    __metadata("design:paramtypes", [services_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map