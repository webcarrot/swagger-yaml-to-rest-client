"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
const compileSchemaAnyOfTypes = async (types) => types.reduce(async (out, schema) => {
    const info = await out;
    const data = await compile_1.compile(schema, "");
    if (data) {
        return {
            importTypes: info.importTypes.concat(data.importTypes),
            content: `${info.content} & 
${data.content}`
        };
    }
    else {
        return info;
    }
}, Promise.resolve({
    importTypes: [],
    content: ""
}));
exports.compileSchemaAnyOf = async (schema, id, registerId, register) => {
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
    const { content, importTypes } = await compileSchemaAnyOfTypes(schema.types);
    if (registerId) {
        await register({
            id: registerId,
            dependencies: importTypes,
            schema
        });
    }
    return {
        importTypes,
        content: `${docs}${id}${content}`
    };
};
//# sourceMappingURL=anyOf.js.map