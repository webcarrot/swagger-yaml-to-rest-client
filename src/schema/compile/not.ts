import { CompileInfo, SchemaNot } from "../../types";

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

export const compileSchemaNot = (
  schema: SchemaNot,
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
  const content = TYPES.filter(v => v !== schema.exclude)
    .map(v => TYPES_TO_TYPE[v])
    .join("|");

  return {
    importTypes: [],
    content: `${docs}${id}${content}`
  };
};
