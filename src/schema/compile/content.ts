import {
  CompileInfo,
  SchemaContent,
  SchemaContentType,
  CompileSchemaFn
} from "../../types";

import { compileDocs } from "../../utils";
import { compile } from "./compile";

const compileSchemaContentTypes = async (
  contentTypes: ReadonlyArray<SchemaContentType>
): Promise<CompileInfo> =>
  contentTypes.reduce<Promise<CompileInfo>>(
    async (out, contentType) => {
      const info = await out;
      const data = await compile(contentType.schema, "data:");
      if (data) {
        return {
          importTypes: info.importTypes.concat(data.importTypes),
          content: `${info.content} | 
{
  type: ${JSON.stringify(contentType.type)};
  ${data.content};
}`
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

export const compileSchemaContent: CompileSchemaFn<SchemaContent> = async (
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
  const { content, importTypes } = await compileSchemaContentTypes(
    schema.contentTypes
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
    content: `${docs}${id}${content}`
  };
};
