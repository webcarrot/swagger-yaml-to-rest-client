import { SchemaNot, CompileSchemaFn } from "../../types";

import { compileDocs } from "../../utils";

const TYPES: ReadonlyArray<SchemaNot["exclude"]> = [
  "array",
  "boolean",
  "number",
  "object",
  "string"
];

const TYPES_TO_TYPE: { [key in SchemaNot["exclude"]]: string } = {
  array: "Array<any>",
  boolean: "boolean",
  number: "number",
  object: "object",
  string: "string"
};

export const compileSchemaNot: CompileSchemaFn<SchemaNot> = async (
  schema: SchemaNot,
  id: string,
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

  const content = TYPES.filter(v => v !== schema.exclude)
    .map(v => TYPES_TO_TYPE[v])
    .join("|");

  if (registerId) {
    await register({
      id: registerId,
      dependencies: [],
      schema
    });
  }

  return {
    importTypes: [],
    content: `${docs}${id}${content}`
  };
};
