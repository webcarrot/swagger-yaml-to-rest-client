import { CompileInfo, SchemaAny } from "../../types";
import { compileDocs } from "../../utils";

export const compileSchemaAny = (
  schema: SchemaAny,
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
  return {
    importTypes: [],
    content: `${docs}${id}any`
  };
};
