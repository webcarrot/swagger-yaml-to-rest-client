"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
const compileSchemaAnyOfTypes = (types) => types.reduce((info, schema) => {
    const data = compile_1.compile(schema, "");
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
}, {
    importTypes: [],
    content: ""
});
exports.compileSchemaAnyOf = (schema, id) => {
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
    const { content, importTypes } = compileSchemaAnyOfTypes(schema.types);
    return {
        importTypes,
        content: `${docs}${id}${content}`
    };
};
//# sourceMappingURL=anyOf.js.map