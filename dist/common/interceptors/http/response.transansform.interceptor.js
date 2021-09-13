"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseTransformInterceptor = class ResponseTransformInterceptor {
    intercept(context, next) {
        if (context.getType() === 'http') {
            const ctx = context.switchToHttp();
            const response = ctx.getResponse();
            return next.handle().pipe(operators_1.map((data) => {
                let message = null;
                let statusCode = null;
                let success = true;
                if (data === null || data === void 0 ? void 0 : data.message) {
                    message = data.message;
                    delete data.message;
                }
                if (data === null || data === void 0 ? void 0 : data.statusCode) {
                    statusCode = data.statusCode;
                    delete data.statusCode;
                }
                if (data === null || data === void 0 ? void 0 : data.success) {
                    success = data.success;
                    delete data.success;
                }
                if (data === null || data === void 0 ? void 0 : data.password) {
                    data === null || data === void 0 ? true : delete data.password;
                }
                statusCode = statusCode || response.statusCode;
                response.status(statusCode);
                return {
                    success: success,
                    message: message || response.statusMessage || 'OK',
                    data: data || {},
                };
            }));
        }
        else {
            return next.handle().pipe(operators_1.map((data) => data));
        }
    }
};
ResponseTransformInterceptor = __decorate([
    common_1.Injectable()
], ResponseTransformInterceptor);
exports.ResponseTransformInterceptor = ResponseTransformInterceptor;
//# sourceMappingURL=response.transansform.interceptor.js.map