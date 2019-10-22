import { Schema, CompileInfo } from "../../types";
import { compileSchemaAllOf } from "./allOf";
import { compileSchemaAnyOf } from "./anyOf";
import { compileSchemaOneOf } from "./oneOf";
import { compileSchemaAny } from "./any";
import { compileSchemaArray } from "./array";
import { compileSchemaBoolean } from "./boolean";
import { compileSchemaContent } from "./content";
import { compileSchemaEnum } from "./enum";
import { compileSchemaNumber } from "./number";
import { compileSchemaRef } from "./ref";
import { compileSchemaObject } from "./object";
import { compileSchemaString } from "./string";
import { compileSchemaNot } from "./not";

export const compile = (schema: Schema, id: string): CompileInfo => {
  if (!schema) {
    return null;
  }
  switch (schema.type) {
    case "allOf":
      return compileSchemaAllOf(schema, id);
    case "anyOf":
      return compileSchemaAnyOf(schema, id);
    case "oneOf":
      return compileSchemaOneOf(schema, id);
    case "any":
      return compileSchemaAny(schema, id);
    case "array":
      return compileSchemaArray(schema, id);
    case "boolean":
      return compileSchemaBoolean(schema, id);
    case "content":
      return compileSchemaContent(schema, id);
    case "enum":
      return compileSchemaEnum(schema, id);
    case "not":
      return compileSchemaNot(schema, id);
    case "number":
      return compileSchemaNumber(schema, id);
    case "object":
      return compileSchemaObject(schema, id);
    case "ref":
      return compileSchemaRef(schema, id);
    case "string":
      return compileSchemaString(schema, id);
    default:
      console.log(id, schema);
      break;
  }
  return null;
};
