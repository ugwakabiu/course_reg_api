"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAndConvertUnitUtil = parseAndConvertUnitUtil;
const convert = require("convert-units");
function parseAndConvertUnitUtil(input, toUnit) {
    const match = input.match(/^(\d+)([a-zA-Z]+)$/);
    if (!match) {
        throw new Error('Invalid input format. Expected format: <value><unit>, e.g., 24h');
    }
    const value = parseFloat(match[1]);
    const unit = match[2];
    const result = convert(value).from(unit).to(toUnit);
    return result;
}
//# sourceMappingURL=parseAndConvertUnit.util.js.map