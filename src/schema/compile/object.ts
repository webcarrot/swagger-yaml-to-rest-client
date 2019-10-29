import {
  SchemaObject,
  SchemaObjectPropery,
  CompileInfo,
  CompileSchemaFn
} from "../../types";

import { compileDocs } from "../../utils";
import { compile } from "./compile";

const compileSchemaObjectProperties = async (
  properties: ReadonlyArray<SchemaObjectPropery>
): Promise<CompileInfo> =>
  properties.reduce<Promise<CompileInfo>>(
    async (out, property) => {
      const info = await out;
      const data = await compileSchemaObjectProperty(property);
      if (data) {
        return {
          importTypes: info.importTypes.concat(data.importTypes),
          content: `${info.content}
${data.content};`
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

const compileSchemaObjectProperty = async (
  property: SchemaObjectPropery
): Promise<CompileInfo> =>
  compile(property.schema, `"${property.id}"${property.required ? "" : "?"}:`);

export const compileSchemaObject: CompileSchemaFn<SchemaObject> = async (
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

  const { content, importTypes } = await compileSchemaObjectProperties(
    schema.properties
  );

  if (registerId) {
    await register({
      id: registerId,
      dependencies: importTypes,
      schema
    });
  }

  return {
    importTypes,
    content: `${docs}${id}{${content}}`
  };
};
