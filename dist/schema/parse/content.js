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
const parse_1 = require("./parse");
exports.parseRawSchemaContent = (_a) => {
    var { description, example, title: name, required = false, content } = _a, rest = __rest(_a, ["description", "example", "title", "required", "content"]);
    utils_1.warnRest(rest, "content");
    return {
        type: "content",
        description,
        example,
        name,
        required,
        contentTypes: Object.keys(content).map(type => ({
            type,
            schema: parse_1.parseRawSchema(content[type].schema)
        }))
    };
};
//# sourceMappingURL=content.js.map