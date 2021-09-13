"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const compression = require("compression");
const helmet = require("helmet");
const _config_1 = require("./config");
const exceptions_1 = require("./common/exceptions");
const http_1 = require("./common/interceptors/http");
const config_1 = require("@nestjs/config");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port');
    const prefix = configService.get('api_prefix');
    app.use(helmet());
    app.use(compression());
    app.enableCors();
    app.useGlobalFilters();
    app.useGlobalFilters(new exceptions_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new http_1.ResponseTransformInterceptor(), new http_1.RequestLoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.setGlobalPrefix(prefix);
    _config_1.configSwagger(app);
    await app.listen(port);
    return port;
};
bootstrap().then((port) => {
    common_1.Logger.log(`Application running on port: ${port}`, 'Main');
});
//# sourceMappingURL=main.js.map