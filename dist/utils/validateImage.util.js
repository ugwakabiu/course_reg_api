"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validImageType = exports.convertFileSizeToByte = void 0;
const convertFileSizeToByte = (size) => {
    const actualSize = +size.substring(0, size.length - 2);
    const format = size.substring(size.length - 2, size.length);
    if (format.toLowerCase() == 'kb') {
        return actualSize * 1024;
    }
    if (format.toLowerCase() == 'mb') {
        return actualSize * 1024 * 1024;
    }
    if (format.toLowerCase() == 'gb') {
        return actualSize * 1024 * 1024 * 1024;
    }
    return +size;
};
exports.convertFileSizeToByte = convertFileSizeToByte;
exports.validImageType = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
];
const validateImageUtil = ({ file, maxSize, }) => {
    const maxSizeInByte = (0, exports.convertFileSizeToByte)(maxSize);
    if (!exports.validImageType.includes(file.mimetype.toLowerCase())) {
        return {
            isValid: false,
            message: `invalid image format`,
        };
    }
    if (file.size > maxSizeInByte) {
        return {
            isValid: false,
            message: `maximum image size should be [${maxSize}]`,
        };
    }
    return { isValid: true, message: 'success' };
};
exports.default = validateImageUtil;
//# sourceMappingURL=validateImage.util.js.map