"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSecretKeyException = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
class InvalidSecretKeyException extends common_1.UnauthorizedException {
    constructor() {
        super({ errorType: enums_1.ErrorType.InvalidSecretKey });
    }
}
exports.InvalidSecretKeyException = InvalidSecretKeyException;
//# sourceMappingURL=invalid-secret-key.exception.js.map