"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const title = 'JMC ERP';
const description = 'JMC ERP RESTFul API Service Doc.';
const version = '1.0';
const configSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-doc', app, document);
};
exports.configSwagger = configSwagger;
//# sourceMappingURL=swagger.config.js.map