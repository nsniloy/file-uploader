"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const common_1 = require("@nestjs/common");
const Permissions = (action) => common_1.SetMetadata('permission', { action: action });
exports.Permissions = Permissions;
//# sourceMappingURL=permission.decorator.js.map