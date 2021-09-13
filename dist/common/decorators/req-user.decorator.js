"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqUser = void 0;
const common_1 = require("@nestjs/common");
exports.ReqUser = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=req-user.decorator.js.map