"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnRest = (rest, type) => {
    if (rest && Object.keys(rest).length) {
        console.warn(`Rest params in "${type}"`, rest);
    }
};
//# sourceMappingURL=warnRest.js.map