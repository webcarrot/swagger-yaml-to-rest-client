"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileDocs = (data) => {
    const toDisplay = data
        .filter(({ content }) => content !== null && content !== undefined)
        .reduce((out, { key, content }) => {
        if (content !== true) {
            const contentValue = `${content}`.split("\n");
            if (contentValue.length > 1) {
                out.push(`@${key}`, ...contentValue);
            }
            else {
                out.push(`@${key} ${contentValue[0]}`);
            }
        }
        else {
            out.push(`@${key}`);
        }
        return out;
    }, []);
    if (!toDisplay.length) {
        return "";
    }
    else {
        return `/**
 * ${toDisplay.join(`\n * `)}
 */
`;
    }
};
//# sourceMappingURL=docs.js.map