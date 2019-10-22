import { CompileInfo, SchemaRef } from "../../types";
import { compileDocs, parseRef } from "../../utils";

export const compileSchemaRef = (
  schema: SchemaRef,
  id: string
): CompileInfo => {
  const importType = parseRef(schema.ref);
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
    importTypes: [importType],
    content: `${docs}${id}${importType.id}`
  };
};
