import { SchemaArray, CompileSchemaFn } from "../../types";

import { compileDocs } from "../../utils";
import { compile } from "./compile";

export const compileSchemaArray: CompileSchemaFn<SchemaArray> = async (
  schema,
  id,
  registerId,
  register
) => {
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
  const { content, importTypes } = await compile(schema.items, "");
  if (registerId) {
    await register({
      id: registerId,
      dependencies: importTypes,
      schema
    });
  }
  return {
    importTypes,
    content: `${docs}${id}ReadonlyArray<${content}>`
  };
};
