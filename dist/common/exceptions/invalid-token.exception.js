"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenException = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
class InvalidTokenException extends common_1.UnauthorizedException {
    constructor() {
        super({
            errorType: enums_1.ErrorType.InvalidToken,
            message: 'Invalid access token',
        });
    }
}
exports.InvalidTokenException = InvalidTokenException;
//# sourceMappingURL=invalid-token.exception.js.map