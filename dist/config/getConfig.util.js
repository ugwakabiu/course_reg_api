"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigUtil = getConfigUtil;
async function getConfigUtil(prisma, key) {
    const config = await prisma.config.findUnique({ where: { key } });
    if (!config)
        return null;
    switch (config.type) {
        case 'BOOLEAN':
            return JSON.parse(config.value);
        case 'NUMBER':
            return Number(config.value);
        case 'JSON':
            return JSON.parse(config.value);
        default:
            return config.value;
    }
}
//# sourceMappingURL=getConfig.util.js.map