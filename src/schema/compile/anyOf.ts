import { CompileInfo, SchemaAnyOf, Schema, CompileSchemaFn } from "../../types";

import { compileDocs } from "../../utils";
import { compile } from "./compile";

const compileSchemaAnyOfTypes = async (
  types: ReadonlyArray<Schema>
): Promise<CompileInfo> =>
  types.reduce<Promise<CompileInfo>>(
    async (out, schema) => {
      const info = await out;
      const data = await compile(schema, "");
      if (data) {
        return {
          importTypes: info.importTypes.concat(data.importTypes),
          content: `${info.content} & 
${data.content}`
        };
      } else {
        return info;
      }
    },
    Promise.resolve({
      importTypes: [],
      content: ""
    })
  );

export const compileSchemaAnyOf: CompileSchemaFn<SchemaAnyOf> = async (
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
  const { content, importTypes } = await compileSchemaAnyOfTypes(schema.types);
  if (registerId) {
    await register({
      id: registerId,
      dependencies: importTypes,
      schema
    });
  }
  return {
    importTypes,
    content: `${docs}${id}${content}`
  };
};
