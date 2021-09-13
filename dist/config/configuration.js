"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("./database.config");
exports.default = () => {
    return {
        port: process.env.PORT,
        database: database_config_1.default,
        folderRoot: process.env.FOLDER
    };
};
//# sourceMappingURL=configuration.js.map