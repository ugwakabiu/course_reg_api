"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const createDirUtil = (dir) => new Promise(async (resolve) => {
    try {
        if (!dir) {
            resolve({ created: false, error: true, path: dir });
        }
        const dirExist = await (0, fs_1.existsSync)(dir);
        if (dirExist) {
            resolve({
                created: false,
                error: false,
                alreadyExist: true,
                path: dir,
            });
        }
        await (0, fs_1.mkdirSync)(dir, { recursive: true });
        resolve({ created: true, error: false, alreadyExist: false, path: dir });
    }
    catch (error) {
        resolve({ created: false, error: error, path: dir });
    }
});
exports.default = createDirUtil;
//# sourceMappingURL=createDir.util.js.map