"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../schema");
const compileComponentSchema = async (componentId, { id, schema }) => ({
    path: `components/${componentId}/${id}.d.ts`,
    content: await schema_1.compileSchema(id, `components/${componentId}`, schema)
});
const compileComponent = async ({ id, schemas }) => [
    {
        path: `components/${id}/index.d.ts`,
        content: schemas
            .map(({ id }) => `export { ${id} } from "./${id}";`)
            .join("\n")
    },
    ...(await Promise.all(schemas.map(schema => compileComponentSchema(id, schema))))
];
exports.compileComponents = (comonents) => comonents.reduce((out, component) => out.concat(compileComponent(component), []), []);
//# sourceMappingURL=compile.js.map