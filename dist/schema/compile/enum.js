"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.compileSchemaEnum = async (schema, id, registerId, register) => {
    const docs = utils_1.compileDocs([
        {
            key: "enum",
            content: `{${typeof schema.enum[0]}}`
        },
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
        content: `${docs}${id}${schema.enum
            .map((v) => (typeof v === "string" ? `"${v}"` : v))
            .join("|")}`
    };
};
//# sourceMappingURL=enum.js.map