"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.compileSchemaString = async (schema, id, registerId, register) => {
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
            key: "minLength",
            content: schema.minLength
        },
        {
            key: "maxLength",
            content: schema.maxLength
        }
    ]);
    if (registerId) {
        await register({
            id: registerId,
            dependencies: [],
            schema
        });
    }
    return {
        importTypes: [],
        content: `${docs}${id}string`
    };
};
//# sourceMappingURL=string.js.map