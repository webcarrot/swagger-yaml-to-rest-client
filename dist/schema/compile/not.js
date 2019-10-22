"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const TYPES = [
    "array",
    "boolean",
    "number",
    "object",
    "string"
];
const TYPES_TO_TYPE = {
    array: "Array<any>",
    boolean: "boolean",
    number: "number",
    object: "object",
    string: "string"
};
exports.compileSchemaNot = (schema, id) => {
    const docs = utils_1.compileDocs([
        {
            key: "description",
            content: schema.description
        },
        {
            key: "example",
            content: schema.example
        },
        {
            key: "name",
            content: schema.name
        }
    ]);
    const content = TYPES.filter(v => v !== schema.exclude)
        .map(v => TYPES_TO_TYPE[v])
        .join("|");
    return {
        importTypes: [],
        content: `${docs}${id}${content}`
    };
};
//# sourceMappingURL=not.js.map