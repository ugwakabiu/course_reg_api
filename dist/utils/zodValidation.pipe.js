"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        try {
            if (metadata.type !== 'body')
                return value;
            if (Array.isArray(value)) {
                const parsedArray = value.map((item, index) => {
                    try {
                        return this.schema.parse(item);
                    }
                    catch (error) {
                        if (error instanceof zod_1.ZodError) {
                            throw new common_1.BadRequestException(`${error.errors[0].message} at course no.: ${index + 1}`);
                        }
                    }
                });
                return parsedArray;
            }
            return this.schema.parse(value);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                console.log('zod erro >>>', error);
                throw new common_1.BadRequestException(error.errors[0].message);
            }
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Invalid request data');
        }
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zodValidation.pipe.js.map