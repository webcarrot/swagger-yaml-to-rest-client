"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
const compileSchemaObjectProperties = async (properties) => properties.reduce(async (out, property) => {
    const info = await out;
    const data = await compileSchemaObjectProperty(property);
    if (data) {
        return {
            importTypes: info.importTypes.concat(data.importTypes),
            content: `${info.content}
${data.content};`
        };
    }
    else {
        return info;
    }
}, Promise.resolve({
    importTypes: [],
    content: ""
}));
const compileSchemaObjectProperty = async (property) => compile_1.compile(property.schema, `"${property.id}"${property.required ? "" : "?"}:`);
exports.compileSchemaObject = async (schema, id, registerId, register) => {
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
    const { content, importTypes } = await compileSchemaObjectProperties(schema.properties);
    if (registerId) {
        await register({
            id: registerId,
            dependencies: importTypes,
            schema
        });
    }
    return {
        importTypes,
        content: `${docs}${id}{${content}}`
    };
};
//# sourceMappingURL=object.js.map