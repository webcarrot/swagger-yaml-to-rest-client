import { SchemaBoolean, CompileSchemaFn } from "../../types";
import { compileDocs } from "../../utils";

export const compileSchemaBoolean: CompileSchemaFn<SchemaBoolean> = async (
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
    }
  ]);
  if (registerId) {
    await register({
      id: registerId,
      dependencies: [],
      schema
    });
  }
  return {
    importTypes: [],
    content: `${docs}${id}boolean`
  };
};
