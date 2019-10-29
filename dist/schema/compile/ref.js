"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.compileSchemaRef = async (schema, id, registerId, register) => {
    const importType = utils_1.parseRef(schema.ref);
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
            dependencies: [importType],
            schema
        });
    }
    return {
        importTypes: [importType],
        content: `${docs}${id}${importType.id}`
    };
};
//# sourceMappingURL=ref.js.map