"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allOf_1 = require("./allOf");
const anyOf_1 = require("./anyOf");
const oneOf_1 = require("./oneOf");
const any_1 = require("./any");
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const content_1 = require("./content");
const enum_1 = require("./enum");
const number_1 = require("./number");
const ref_1 = require("./ref");
const object_1 = require("./object");
const string_1 = require("./string");
const not_1 = require("./not");
exports.compile = (schema, id) => {
    if (!schema) {
        return null;
    }
    switch (schema.type) {
        case "allOf":
            return allOf_1.compileSchemaAllOf(schema, id);
        case "anyOf":
            return anyOf_1.compileSchemaAnyOf(schema, id);
        case "oneOf":
            return oneOf_1.compileSchemaOneOf(schema, id);
        case "any":
            return any_1.compileSchemaAny(schema, id);
        case "array":
            return array_1.compileSchemaArray(schema, id);
        case "boolean":
            return boolean_1.compileSchemaBoolean(schema, id);
        case "content":
            return content_1.compileSchemaContent(schema, id);
        case "enum":
            return enum_1.compileSchemaEnum(schema, id);
        case "not":
            return not_1.compileSchemaNot(schema, id);
        case "number":
            return number_1.compileSchemaNumber(schema, id);
        case "object":
            return object_1.compileSchemaObject(schema, id);
        case "ref":
            return ref_1.compileSchemaRef(schema, id);
        case "string":
            return string_1.compileSchemaString(schema, id);
        default:
            console.log(id, schema);
            break;
    }
    return null;
};
//# sourceMappingURL=compile.js.map