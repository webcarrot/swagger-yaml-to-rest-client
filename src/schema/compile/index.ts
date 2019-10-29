import { Schema } from "../../types";

import { format } from "prettier";
import { compile } from "./compile";
import { compileImportTypes } from "../../utils/compile/reference";

export const compileSchema = async (
  id: string,
  path: string,
  schema: Schema
): Promise<string> => {
  if (!schema) {
    return "";
  }
  const info = await compile(schema, `export type ${id} = `);
  if (info) {
    return format(
      `// ${path}/${id}
${compileImportTypes(info.importTypes, `${path}/${id}`)}
${info.content};
`,
      { parser: "typescript" }
    );
  } else {
    return "";
  }
};
