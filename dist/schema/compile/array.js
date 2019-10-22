"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
exports.compileSchemaArray = (schema, id) => {
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
            key: "maxItems",
            content: schema.maxItems
        }
    ]);
    const { content, importTypes } = compile_1.compile(schema.items, "");
    return {
        importTypes,
        content: `${docs}${id}ReadonlyArray<${content}>`
    };
};
//# sourceMappingURL=array.js.map