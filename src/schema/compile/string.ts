import { CompileInfo, SchemaString } from "../../types";
import { compileDocs } from "../../utils";

export const compileSchemaString = (
  schema: SchemaString,
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
      key: "minLength",
      content: schema.minLength
    },
    {
      key: "maxLength",
      content: schema.maxLength
    }
  ]);
  return {
    importTypes: [],
    content: `${docs}${id}string`
  };
};
