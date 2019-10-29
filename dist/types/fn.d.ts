import { RawSchema } from "./raw";
import { Schema } from "./schema";
import { CompileInfo, ImportType } from "./compile";

export type ParseSchemaFn<RS extends RawSchema, S extends Schema> = (
  data: RS,
  optRequired?: ReadonlyArray<string>
) => S;

export type SchemaDependencies<S extends Schema> = {
  id: string;
  schema: S;
  dependencies: ReadonlyArray<ImportType>;
};

export type CompileSchemaFn<S extends Schema> = (
  data: S,
  id: string,
  registerId?: string,
  register?: (data: SchemaDependencies<S>) => Promise<void>
) => Promise<CompileInfo>;
