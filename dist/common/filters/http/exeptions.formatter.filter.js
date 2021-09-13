"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const data = {
            success: false,
            message: exceptionResponse['message'],
            data: null,
        };
        const requestDetails = {
            method: request.method,
            headers: request.headers,
            query_params: request.query,
            body: request.body,
            requested_endpoint: request.originalUrl,
            response_body: data,
            status: response.statusCode,
        };
        const logString = JSON.stringify(requestDetails) +
            '\n' +
            [request.method, request.originalUrl, response.statusCode].join(' ');
        common_2.Logger.log(logString, 'HttpExceptionFilter');
        response.status(status).json(data);
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=exeptions.formatter.filter.js.map