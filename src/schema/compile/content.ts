import { CompileInfo, SchemaContent, SchemaContentType } from "../../types";

import { compileDocs } from "../../utils";
import { compile } from "./compile";

const compileSchemaContentTypes = (
  contentTypes: ReadonlyArray<SchemaContentType>
): CompileInfo =>
  contentTypes.reduce<CompileInfo>(
    (info, contentType) => {
      const data = compile(contentType.schema, "data:");
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
    {
      importTypes: [],
      content: ""
    }
  );

export const compileSchemaContent = (
  schema: SchemaContent,
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
    }
  ]);
  const { content, importTypes } = compileSchemaContentTypes(
    schema.contentTypes
  );
  return {
    importTypes,
    content: `${docs}${id}${content}`
  };
};
