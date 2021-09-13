"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPermissionExeption = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
class InvalidPermissionExeption extends common_1.UnauthorizedException {
    constructor() {
        super({
            errorType: enums_1.ErrorType.FailedAuthorization,
            message: 'You do not have access to this action',
        });
    }
}
exports.InvalidPermissionExeption = InvalidPermissionExeption;
//# sourceMappingURL=unauthorization.exception.js.map