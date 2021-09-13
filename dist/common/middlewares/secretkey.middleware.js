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
exports.SecretKeyMiddleware = void 0;
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SecretKeyMiddleware = class SecretKeyMiddleware {
    constructor(configService) {
        this.configService = configService;
    }
    async use(req, res, next) {
        if (req.headers['secret-key']) {
            if (req.headers['secret-key'] != this.configService.get('secret_key')) {
                throw new http_exception_1.HttpException({ message: 'Invalid Secret Key' }, common_1.HttpStatus.UNAUTHORIZED);
            }
            next();
        }
        else {
            throw new http_exception_1.HttpException({ message: 'Invalid Secret Key' }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
SecretKeyMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SecretKeyMiddleware);
exports.SecretKeyMiddleware = SecretKeyMiddleware;
//# sourceMappingURL=secretkey.middleware.js.map