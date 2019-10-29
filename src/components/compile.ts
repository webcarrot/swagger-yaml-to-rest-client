import {
  Components,
  Component,
  ComponentSchema,
  CompileOutput
} from "../types";

import { compileSchema } from "../schema";

const compileComponentSchema = async (
  componentId: string,
  { id, schema }: ComponentSchema
): Promise<CompileOutput> => ({
  path: `components/${componentId}/${id}.d.ts`,
  content: await compileSchema(id, `components/${componentId}`, schema)
});

const compileComponent = async ({
  id,
  schemas
}: Component): Promise<CompileOutput[]> => [
  {
    path: `components/${id}/index.d.ts`,
    content: schemas
      .map(({ id }) => `export { ${id} } from "./${id}";`)
      .join("\n")
  },
  ...(await Promise.all(
    schemas.map(schema => compileComponentSchema(id, schema))
  ))
];

export const compileComponents = (comonents: Components): CompileOutput[] =>
  comonents.reduce(
    (out, component) => out.concat(compileComponent(component), []),
    []
  );
