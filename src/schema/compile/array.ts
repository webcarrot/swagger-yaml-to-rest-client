import { CompileInfo, SchemaArray } from "../../types";

import { compileDocs } from "../../utils";
import { compile } from "./compile";

export const compileSchemaArray = (
  schema: SchemaArray,
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
    },
    {
      key: "maxItems",
      content: schema.maxItems
    }
  ]);
  const { content, importTypes } = compile(schema.items, "");
  return {
    importTypes,
    content: `${docs}${id}ReadonlyArray<${content}>`
  };
};
