import {
  SchemaDiscriminator,
  SchemaObjectPropery,
  CompileInfo,
  SchemaObjectDiscriminator,
  CompileSchemaFn
} from "../../types";

import { compileDocs, parseRef } from "../../utils";
import { compile } from "./compile";

const compileSchemaObjectPropertiesAndDiscriminator = async (
  properties: ReadonlyArray<SchemaObjectPropery>,
  { propertyName, mapping }: SchemaObjectDiscriminator
): Promise<CompileInfo> => {
  const { content, importTypes } = await properties.reduce<
    Promise<CompileInfo>
  >(
    async (out, property) => {
      const info = await out;
      if (property.id === propertyName) {
        return info;
      }
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

  const {
    content: mappingContent,
    importTypes: mappingImportTypes
  } = Object.keys(mapping).reduce<CompileInfo>(
    (info, value) => {
      const importType = parseRef(mapping[value]);

      return {
        importTypes: info.importTypes.concat([importType]),
        content: `${info.content} | 
        (
          {
            "${propertyName}": ${JSON.stringify(value)};
          } & ${importType.id}
        )`
      };
    },
    {
      importTypes: [],
      content: ""
    }
  );

  return {
    content: `{${content}} & (${mappingContent})`,
    importTypes: importTypes.concat(mappingImportTypes)
  };
};

const compileSchemaObjectProperty = async (
  property: SchemaObjectPropery
): Promise<CompileInfo> =>
  compile(property.schema, `"${property.id}"${property.required ? "" : "?"}:`);

export const compileSchemaDiscriminator: CompileSchemaFn<
  SchemaDiscriminator
> = async (schema, id, registerId, register) => {
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
  const {
    content,
    importTypes
  } = await compileSchemaObjectPropertiesAndDiscriminator(
    schema.properties,
    schema.discriminator
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
