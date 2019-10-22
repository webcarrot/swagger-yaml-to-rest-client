"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../schema");
const parseComponentSchema = (id, rawComponentSchema) => ({
    id,
    schema: schema_1.parseRawSchema(rawComponentSchema)
});
const parseComponent = (id, rawComponent) => ({
    id,
    schemas: Object.keys(rawComponent).map(id => parseComponentSchema(id, rawComponent[id]))
});
exports.parseComponents = (rawComponents) => Object.keys(rawComponents).map(id => parseComponent(id, rawComponents[id]));
//# sourceMappingURL=parse.js.map