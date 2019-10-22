import {
  SchemaObject,
  SchemaObjectPropery,
  CompileInfo,
  SchemaObjectDiscriminator
} from "../../types";

import { compileDocs, parseRef } from "../../utils";
import { compile } from "./compile";

const compileSchemaObjectProperties = (
  properties: ReadonlyArray<SchemaObjectPropery>
): CompileInfo =>
  properties.reduce<CompileInfo>(
    (info, property) => {
      const data = compileSchemaObjectProperty(property);
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
    {
      importTypes: [],
      content: ""
    }
  );

const compileSchemaObjectPropertiesAndDiscriminator = (
  properties: ReadonlyArray<SchemaObjectPropery>,
  { propertyName, mapping }: SchemaObjectDiscriminator
): CompileInfo => {
  const { content, importTypes } = properties.reduce<CompileInfo>(
    (info, property) => {
      if (property.id === propertyName) {
        return info;
      }
      const data = compileSchemaObjectProperty(property);
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
    {
      importTypes: [],
      content: ""
    }
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

const compileSchemaObjectProperty = (
  property: SchemaObjectPropery
): CompileInfo =>
  compile(property.schema, `"${property.id}"${property.required ? "" : "?"}:`);

export const compileSchemaObject = (
  schema: SchemaObject,
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
  if (schema.discriminator) {
    const {
      content,
      importTypes
    } = compileSchemaObjectPropertiesAndDiscriminator(
      schema.properties,
      schema.discriminator
    );
    return {
      importTypes,
      content: `${docs}${id}${content}`
    };
  } else {
    const { content, importTypes } = compileSchemaObjectProperties(
      schema.properties
    );
    return {
      importTypes,
      content: `${docs}${id}{${content}}`
    };
  }
};
