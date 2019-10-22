"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.compileSchemaNumber = (schema, id) => {
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
        },
        {
            key: "format",
            content: schema.format
        },
        {
            key: "default",
            content: schema.default
        },
        {
            key: "minimum",
            content: schema.minimum
        },
        {
            key: "maximum",
            content: schema.maximum
        }
    ]);
    return {
        importTypes: [],
        content: `${docs}${id}number`
    };
};
//# sourceMappingURL=number.js.map