"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = require("./boolean");
const string_1 = require("./string");
const number_1 = require("./number");
const array_1 = require("./array");
const object_1 = require("./object");
const ref_1 = require("./ref");
const content_1 = require("./content");
const allOf_1 = require("./allOf");
const anyOf_1 = require("./anyOf");
const oneOf_1 = require("./oneOf");
const any_1 = require("./any");
const not_1 = require("./not");
exports.parseRawSchema = (data, required) => {
    if ("type" in data) {
        switch (data.type) {
            case "boolean":
                return boolean_1.parseRawSchemaBoolean(data);
            case "string":
                return string_1.parseRawSchemaString(data);
            case "integer":
            case "number":
                return number_1.parseRawSchemaNumber(data);
            case "array":
                return array_1.parseRawSchemaArray(data);
            case "object":
                return object_1.parseRawSchemaObject(data, required);
        }
    }
    else if ("$ref" in data) {
        return ref_1.parseRawSchemaRef(data);
    }
    else if ("content" in data) {
        return content_1.parseRawSchemaContent(data);
    }
    else if ("allOf" in data) {
        return allOf_1.parseRawSchemaAllOf(data);
    }
    else if ("anyOf" in data) {
        return anyOf_1.parseRawSchemaAnyOf(data);
    }
    else if ("oneOf" in data) {
        return oneOf_1.parseRawSchemaOneOf(data);
    }
    else if ("not" in data) {
        return not_1.parseRawSchemaNot(data);
    }
    else if ("enum" in data) {
        return string_1.parseRawSchemaString(data);
    }
    else if ("items" in data) {
        return array_1.parseRawSchemaArray(data);
    }
    else if ("properties" in data) {
        return object_1.parseRawSchemaObject(data, required);
    }
    else {
        return any_1.parseRawSchemaAny(data);
    }
};
//# sourceMappingURL=parse.js.map