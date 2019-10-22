"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
const compileSchemaContentTypes = (contentTypes) => contentTypes.reduce((info, contentType) => {
    const data = compile_1.compile(contentType.schema, "data:");
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
}, {
    importTypes: [],
    content: ""
});
exports.compileSchemaContent = (schema, id) => {
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
    const { content, importTypes } = compileSchemaContentTypes(schema.contentTypes);
    return {
        importTypes,
        content: `${docs}${id}${content}`
    };
};
//# sourceMappingURL=content.js.map