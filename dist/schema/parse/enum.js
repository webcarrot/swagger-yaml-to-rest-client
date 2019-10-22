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
exports.parseRawSchemaEnum = (_a) => {
    var { description, example, enum: enuM, title: name, type: _, format: __ } = _a, rest = __rest(_a, ["description", "example", "enum", "title", "type", "format"]);
    utils_1.warnRest(rest, "enum");
    return {
        type: "enum",
        description,
        example,
        name,
        enum: enuM
    };
};
//# sourceMappingURL=enum.js.map