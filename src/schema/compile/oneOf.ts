import { CompileInfo, SchemaOneOf, Schema } from "../../types";

import { compileDocs } from "../../utils";
import { compile } from "./compile";

const compileSchemaOneOfTypes = (types: ReadonlyArray<Schema>): CompileInfo =>
  types.reduce<CompileInfo>(
    (info, schema) => {
      const data = compile(schema, "");
      if (data) {
        return {
          importTypes: info.importTypes.concat(data.importTypes),
          content: `${info.content} | 
${data.content}`
        };
      } else {
        return info;
      }
    },
    {
      importTypes: [],
      content: ""
    }
  );

export const compileSchemaOneOf = (
  schema: SchemaOneOf,
  id: string
): CompileInfo => {
  const docs = compileDocs([
    {
      key: "description",
      content: schema.description
    },
    {
      key: "example",
      content: schema.example
    },
    {
      key: "name",
      content: schema.name
    }
  ]);
  const { content, importTypes } = compileSchemaOneOfTypes(schema.types);
  return {
    importTypes,
    content: `${docs}${id}${content}`
  };
};
