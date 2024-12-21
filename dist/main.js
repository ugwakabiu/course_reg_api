"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const expressFileUpload = require("express-fileupload");
const express_1 = require("express");
const path_1 = require("path");
const constant_1 = require("./constants/constant");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.use(expressFileUpload());
    app.use('/uploads', (0, express_1.static)((0, path_1.join)(process.cwd(), constant_1.constant.UPLOAD_DIR)));
    await app.listen(constant_1.constant.PORT, () => console.log(`app listening on port: ${constant_1.constant.PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map