import { SchemaString, CompileSchemaFn } from "../../types";
import { compileDocs } from "../../utils";

export const compileSchemaString: CompileSchemaFn<SchemaString> = async (
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
      key: "minLength",
      content: schema.minLength
    },
    {
      key: "maxLength",
      content: schema.maxLength
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
    content: `${docs}${id}string`
  };
};
