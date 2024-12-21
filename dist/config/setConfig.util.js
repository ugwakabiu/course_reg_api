"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfigUtil = setConfigUtil;
async function setConfigUtil({ key, prisma, value }) {
    const type = (typeof value).toUpperCase();
    const formattedValue = type === 'STRING' ? value : JSON.stringify(value);
    await prisma.config.upsert({
        where: { key },
        update: { value: formattedValue },
        create: { key, value: formattedValue, type },
    });
}
//# sourceMappingURL=setConfig.util.js.map