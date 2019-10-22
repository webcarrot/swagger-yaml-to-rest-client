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
exports.parseRawSchemaBoolean = (_a) => {
    var { description, example, title: name, type: _ } = _a, rest = __rest(_a, ["description", "example", "title", "type"]);
    utils_1.warnRest(rest, "boolean");
    return {
        type: "boolean",
        description,
        example,
        name
    };
};
//# sourceMappingURL=boolean.js.map