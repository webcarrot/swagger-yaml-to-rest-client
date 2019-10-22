"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const ref_1 = require("./ref");
const parse_1 = require("./parse");
const any_1 = require("./any");
exports.parseRawSchemaObject = (data, optRequired) => {
    if ("$ref" in data) {
        const { type: _ } = data, rest = __rest(data, ["type"]);
        return ref_1.parseRawSchemaRef(rest);
    }
    else if ("properties" in data) {
        const { description, example, title: name, properties, required = optRequired, discriminator, type: _ } = data, rest = __rest(data, ["description", "example", "title", "properties", "required", "discriminator", "type"]);
        utils_1.warnRest(rest, "object");
        return {
            type: "object",
            description,
            example,
            name,
            properties: Object.keys(properties).map(id => ({
                id,
                required: !!(required && required.includes(id)),
                schema: parse_1.parseRawSchema(properties[id])
            })),
            discriminator
        };
    }
    else if (data && data.type === "object") {
        const { description, example, title: name, type: _ } = data, rest = __rest(data, ["description", "example", "title", "type"]);
        utils_1.warnRest(rest, "object");
        return {
            type: "object",
            description,
            example,
            name,
            properties: []
        };
    }
    else {
        return any_1.parseRawSchemaAny(data);
    }
};
//# sourceMappingURL=object.js.map