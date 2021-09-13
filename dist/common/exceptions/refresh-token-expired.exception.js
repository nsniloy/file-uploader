"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenExpiredException = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
class RefreshTokenExpiredException extends common_1.UnauthorizedException {
    constructor() {
        super({
            errorType: enums_1.ErrorType.RefreshTokenExpired,
            message: 'Refresh token has expired',
        });
    }
}
exports.RefreshTokenExpiredException = RefreshTokenExpiredException;
//# sourceMappingURL=refresh-token-expired.exception.js.map