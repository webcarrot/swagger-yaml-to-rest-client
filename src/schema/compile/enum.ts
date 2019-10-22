import { CompileInfo, SchemaEnum } from "../../types";
import { compileDocs } from "../../utils";

export const compileSchemaEnum = (
  schema: SchemaEnum,
  id?: string
): CompileInfo => {
  const docs = compileDocs([
    {
      key: "enum",
      content: `{${typeof schema.enum[0]}}`
    },
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
    content: `${docs}${id}${(schema.enum as any[])
      .map((v: string | number) => (typeof v === "string" ? `"${v}"` : v))
      .join("|")}`
  };
};
