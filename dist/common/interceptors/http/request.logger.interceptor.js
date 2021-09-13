"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
const common_2 = require("@nestjs/common");
let RequestLoggingInterceptor = class RequestLoggingInterceptor {
    intercept(context, next) {
        if (context.getType() === 'http') {
            const ctx = context.switchToHttp();
            const request = ctx.getRequest();
            const response = ctx.getResponse();
            const request_id = uuid_1.v4().split('-').join('');
            request.headers['X-Request-Id'] = request_id;
            response.set('X-Request-Id', request_id);
            return next.handle().pipe(operators_1.tap((data) => {
                const requestDetails = {
                    method: request.method,
                    query_params: request.query,
                    body: request.body,
                    requested_endpoint: request.originalUrl,
                    response_body: data,
                    status: response.statusCode,
                };
                const logString = JSON.stringify(requestDetails) +
                    '\n' +
                    [request.method, request.originalUrl, response.statusCode].join(' ');
                common_2.Logger.log(logString, 'RequestLoggingInterceptor');
            }));
        }
    }
};
RequestLoggingInterceptor = __decorate([
    common_1.Injectable()
], RequestLoggingInterceptor);
exports.RequestLoggingInterceptor = RequestLoggingInterceptor;
//# sourceMappingURL=request.logger.interceptor.js.map