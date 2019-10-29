import { Schema, CompileSchemaFn } from "../../types";
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
import { compileSchemaDiscriminator } from "./discriminator";

export const compile: CompileSchemaFn<Schema> = async (
  schema,
  id,
  registerId,
  register
) => {
  if (!schema) {
    return null;
  }
  switch (schema.type) {
    case "allOf":
      return compileSchemaAllOf(schema, id, registerId, register);
    case "anyOf":
      return compileSchemaAnyOf(schema, id, registerId, register);
    case "oneOf":
      return compileSchemaOneOf(schema, id, registerId, register);
    case "any":
      return compileSchemaAny(schema, id, registerId, register);
    case "array":
      return compileSchemaArray(schema, id, registerId, register);
    case "boolean":
      return compileSchemaBoolean(schema, id, registerId, register);
    case "content":
      return compileSchemaContent(schema, id, registerId, register);
    case "enum":
      return compileSchemaEnum(schema, id, registerId, register);
    case "not":
      return compileSchemaNot(schema, id, registerId, register);
    case "number":
      return compileSchemaNumber(schema, id, registerId, register);
    case "object":
      return compileSchemaObject(schema, id, registerId, register);
    case "discriminator":
      return compileSchemaDiscriminator(schema, id, registerId, register);
    case "ref":
      return compileSchemaRef(schema, id, registerId, register);
    case "string":
      return compileSchemaString(schema, id, registerId, register);
    default:
      console.log(id, schema);
      break;
  }
  return null;
};
