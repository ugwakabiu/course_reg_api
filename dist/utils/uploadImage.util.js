"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadedImageExt = void 0;
const path_1 = require("path");
const createDir_util_1 = require("./createDir.util");
exports.uploadedImageExt = process.env.IMAGE_EXT || 'jpg';
const uploadImageUtil = ({ dir, file, fileName, }) => new Promise(async (resolve) => {
    try {
        if (!dir) {
            resolve({
                error: null,
                errorMessage: 'upload dir is required',
                uploaded: false,
                filePath: null,
            });
        }
        if (!fileName) {
            resolve({
                error: null,
                errorMessage: 'file name is required',
                uploaded: false,
                filePath: null,
            });
        }
        const name = `${fileName}.${exports.uploadedImageExt}`;
        const filePath = (0, path_1.join)(dir, `${name}`);
        const dirCheck = await (0, createDir_util_1.default)(dir);
        if (dirCheck.error) {
            resolve({
                error: null,
                errorMessage: null,
                uploaded: false,
                filePath: null,
            });
        }
        await file.mv(filePath, (err) => resolve({
            error: err,
            errorMessage: null,
            uploaded: false,
            filePath: null,
        }));
        resolve({
            error: null,
            errorMessage: null,
            uploaded: true,
            filePath,
            fileName: name,
        });
    }
    catch (error) {
        resolve({
            error,
            errorMessage: null,
            uploaded: false,
            filePath: null,
        });
    }
});
exports.default = uploadImageUtil;
//# sourceMappingURL=uploadImage.util.js.map