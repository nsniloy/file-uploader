"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedAuthorizationException = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
class FailedAuthorizationException extends common_1.UnauthorizedException {
    constructor() {
        super({
            errorType: enums_1.ErrorType.FailedAuthorization,
            message: 'Failed to check authorization',
        });
    }
}
exports.FailedAuthorizationException = FailedAuthorizationException;
//# sourceMappingURL=failed-authorization.exception.js.map