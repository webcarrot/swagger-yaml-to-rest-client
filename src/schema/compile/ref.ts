import { SchemaRef, CompileSchemaFn } from "../../types";
import { compileDocs, parseRef } from "../../utils";

export const compileSchemaRef: CompileSchemaFn<SchemaRef> = async (
  schema,
  id,
  registerId,
  register
) => {
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

  if (registerId) {
    await register({
      id: registerId,
      dependencies: [importType],
      schema
    });
  }

  return {
    importTypes: [importType],
    content: `${docs}${id}${importType.id}`
  };
};
