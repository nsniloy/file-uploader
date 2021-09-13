"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenExpiredException = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
class AccessTokenExpiredException extends common_1.UnauthorizedException {
    constructor() {
        super({
            errorType: enums_1.ErrorType.AccessTokenExpired,
            message: 'Access token has expired or invalid',
        });
    }
}
exports.AccessTokenExpiredException = AccessTokenExpiredException;
//# sourceMappingURL=access-token-expired.exception.js.map