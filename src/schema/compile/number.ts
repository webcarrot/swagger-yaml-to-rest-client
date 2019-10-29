import { SchemaNumber, CompileSchemaFn } from "../../types";
import { compileDocs } from "../../utils";

export const compileSchemaNumber: CompileSchemaFn<SchemaNumber> = async (
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

  if (registerId) {
    await register({
      id: registerId,
      dependencies: [],
      schema
    });
  }

  return {
    importTypes: [],
    content: `${docs}${id}number`
  };
};
