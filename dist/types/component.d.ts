import { Schema } from "./schema";

export type ComponentSchema = { id: string; schema: Schema };

export type Component = {
  id: string;
  schemas: ReadonlyArray<ComponentSchema>;
};

export type Components = ReadonlyArray<Component>;
