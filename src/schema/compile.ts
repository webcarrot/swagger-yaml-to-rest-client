import { Schema, SchemaObject, SchemaObjectPropery } from "../types";

type CompileInfo = {
  importTypes: ReadonlyArray<string>;
  exportTypes: ReadonlyArray<string>;
  content: string;
};

const compileImportTypes = (importTypes: ReadonlyArray<string>): string =>
  importTypes
    .filter((path, index) => importTypes.indexOf(path) === index)
    .map(compileReference)
    .join("\n");

const compileReference = (path: string): string => {
  const parts = path.split("/");
  if (parts[0] === "#") {
    parts.shift();
  }
  const el = parts[parts.length - 1];
  return `import { ${el} } from "${"../".repeat(parts.length - 1)}${parts.join(
    "/"
  )}"`;
};

const compileDocs = (
  data: ReadonlyArray<{ key: string; content: any }>,
  padding: string
): string => {
  const toDisplay = data
    .filter(({ content }) => content !== null && content !== undefined)
    .reduce<string[]>((out, { key, content }) => {
      if (content !== true) {
        const contentValue = `${content}`.split("\n");
        if (contentValue.length > 1) {
          out.push(`@${key}`, ...contentValue);
        } else {
          out.push(`@${key} ${contentValue[0]}`);
        }
      } else {
        out.push(`@${key}`);
      }
      return out;
    }, []);
  if (!toDisplay.length) {
    return "";
  } else {
    return `
${padding}/**
${padding} * ${toDisplay.join(`\n${padding} * `)}
${padding} */`;
  }
};

const compileSchemaObjectProperties = (
  properties: ReadonlyArray<SchemaObjectPropery>,
  padding: string
): CompileInfo =>
  properties.reduce<CompileInfo>((info, property) => {}, {
    importTypes: [],
    exportTypes: [],
    content: ""
  });

const compileSchemaObjectProperty = (
  property: SchemaObjectPropery,
  padding: string
): CompileInfo => {};

const compileSchemaObject = (id: string, schema: SchemaObject): CompileInfo => {
  const docs = compileDocs(
    [
      {
        key: "description",
        content: schema.description
      },
      {
        key: "example",
        content: schema.example
      }
    ],
    ""
  );
  const { content, exportTypes, importTypes } = compileSchemaObjectProperties(
    schema.properties,
    ""
  );
  return {
    exportTypes,
    importTypes,
    content: `${docs}type ${id} {${content}};`
  };
};

export const compileSchema = (id: string, schema: Schema): string => {
  if (!schema) {
    return "";
  }
  let info: CompileInfo;

  switch (schema.type) {
    case "allOf":
      break;
    case "object": {
      info = compileSchemaObject(id, schema);
      break;
    }
  }
  if (info) {
    return `// ${id}.d.ts
${compileImportTypes(info.importTypes)}
${info.content}
export { ${info.exportTypes.join(", ")} }`;
  } else {
    return "";
  }
};
