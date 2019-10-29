"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
const compileSchemaContentTypes = async (contentTypes) => contentTypes.reduce(async (out, contentType) => {
    const info = await out;
    const data = await compile_1.compile(contentType.schema, "data:");
    if (data) {
        return {
            importTypes: info.importTypes.concat(data.importTypes),
            content: `${info.content} | 
{
  type: ${JSON.stringify(contentType.type)};
  ${data.content};
}`
        };
    }
    else {
        return info;
    }
}, Promise.resolve({
    importTypes: [],
    content: ""
}));
exports.compileSchemaContent = async (schema, id, registerId, register) => {
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
    const { content, importTypes } = await compileSchemaContentTypes(schema.contentTypes);
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
//# sourceMappingURL=content.js.map