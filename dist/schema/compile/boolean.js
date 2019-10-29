"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.compileSchemaBoolean = async (schema, id, registerId, register) => {
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
    if (registerId) {
        await register({
            id: registerId,
            dependencies: [],
            schema
        });
    }
    return {
        importTypes: [],
        content: `${docs}${id}boolean`
    };
};
//# sourceMappingURL=boolean.js.map