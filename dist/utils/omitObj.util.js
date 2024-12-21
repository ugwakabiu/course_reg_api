"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitObjUtil = omitObjUtil;
function omitObjUtil(obj, keys) {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}
//# sourceMappingURL=omitObj.util.js.map