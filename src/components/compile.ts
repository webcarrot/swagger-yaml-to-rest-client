import {
  Components,
  Component,
  ComponentSchema,
  CompileOutput
} from "../types";

import { compileSchema } from "../schema";

const compileComponentSchema = (
  componentId: string,
  { id, schema }: ComponentSchema
): CompileOutput => ({
  path: `components/${componentId}/${id}.d.ts`,
  content: compileSchema(id, `components/${componentId}`, schema)
});

const compileComponent = ({ id, schemas }: Component): CompileOutput[] => [
  {
    path: `components/${id}/index.d.ts`,
    content: schemas
      .map(({ id }) => `export { ${id} } from "./${id}";`)
      .join("\n")
  },
  ...schemas.map(schema => compileComponentSchema(id, schema))
];

export const compileComponents = (comonents: Components): CompileOutput[] =>
  comonents.reduce(
    (out, component) => out.concat(compileComponent(component), []),
    []
  );
