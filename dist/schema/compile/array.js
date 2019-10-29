"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
exports.compileSchemaArray = async (schema, id, registerId, register) => {
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
    const { content, importTypes } = await compile_1.compile(schema.items, "");
    if (registerId) {
        await register({
            id: registerId,
            dependencies: importTypes,
            schema
        });
    }
    return {
        importTypes,
        content: `${docs}${id}ReadonlyArray<${content}>`
    };
};
//# sourceMappingURL=array.js.map