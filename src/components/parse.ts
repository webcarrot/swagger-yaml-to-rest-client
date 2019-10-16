import {
  RawComponentsData,
  Components,
  Component,
  ComponentSchema,
  RawSchema
} from "../types";

import { parseRawSchema } from "../schema";

const parseComponentSchema = (
  id: string,
  rawComponentSchema: RawSchema
): ComponentSchema => ({
  id,
  schema: parseRawSchema(rawComponentSchema)
});

const parseComponent = (
  id: string,
  rawComponent: RawComponentsData
): Component => ({
  id,
  schemas: Object.keys(rawComponent).map(id =>
    parseComponentSchema(id, rawComponent[id])
  )
});

export const parseComponents = (
  rawComponents: { [key in string]: RawComponentsData }
): Components =>
  Object.keys(rawComponents).map<Component>(id =>
    parseComponent(id, rawComponents[id])
  );
