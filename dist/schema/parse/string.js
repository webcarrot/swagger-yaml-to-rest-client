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
const enum_1 = require("./enum");
exports.parseRawSchemaString = (data) => {
    if ("enum" in data) {
        return enum_1.parseRawSchemaEnum(data);
    }
    else {
        const { description, example, title: name, format, default: defaulT, minLength, maxLength, type: _ } = data, rest = __rest(data, ["description", "example", "title", "format", "default", "minLength", "maxLength", "type"]);
        utils_1.warnRest(rest, "string");
        return {
            type: "string",
            description,
            example,
            name,
            format,
            default: defaulT,
            minLength,
            maxLength
        };
    }
};
//# sourceMappingURL=string.js.map