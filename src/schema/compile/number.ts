import { CompileInfo, SchemaNumber } from "../../types";
import { compileDocs } from "../../utils";

export const compileSchemaNumber = (
  schema: SchemaNumber,
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
      key: "format",
      content: schema.format
    },
    {
      key: "default",
      content: schema.default
    },
    {
      key: "minimum",
      content: schema.minimum
    },
    {
      key: "maximum",
      content: schema.maximum
    }
  ]);
  return {
    importTypes: [],
    content: `${docs}${id}number`
  };
};
