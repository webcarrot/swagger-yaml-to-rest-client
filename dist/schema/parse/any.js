"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRawSchemaAny = (data) => {
    console.warn("ANY TYPE", data);
    return {
        type: "any",
        description: data.description,
        example: data.example,
        name: data.title
    };
};
//# sourceMappingURL=any.js.map