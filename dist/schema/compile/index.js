"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettier_1 = require("prettier");
const compile_1 = require("./compile");
const reference_1 = require("../../utils/compile/reference");
exports.compileSchema = async (id, path, schema) => {
    if (!schema) {
        return "";
    }
    const info = await compile_1.compile(schema, `export type ${id} = `);
    if (info) {
        return prettier_1.format(`// ${path}/${id}
${reference_1.compileImportTypes(info.importTypes, `${path}/${id}`)}
${info.content};
`, { parser: "typescript" });
    }
    else {
        return "";
    }
};
//# sourceMappingURL=index.js.map