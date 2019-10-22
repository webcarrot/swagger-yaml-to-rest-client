import { RawSchema, Schema } from "../../types";
import { parseRawSchemaBoolean } from "./boolean";
import { parseRawSchemaString } from "./string";
import { parseRawSchemaNumber } from "./number";
import { parseRawSchemaArray } from "./array";
import { parseRawSchemaObject } from "./object";
import { parseRawSchemaRef } from "./ref";
import { parseRawSchemaContent } from "./content";
import { parseRawSchemaAllOf } from "./allOf";
import { parseRawSchemaAnyOf } from "./anyOf";
import { parseRawSchemaOneOf } from "./oneOf";
import { parseRawSchemaAny } from "./any";
import { parseRawSchemaNot } from "./not";

export const parseRawSchema = (
  data: RawSchema,
  required?: ReadonlyArray<string>
): Schema => {
  if ("type" in data) {
    switch (data.type) {
      case "boolean":
        return parseRawSchemaBoolean(data);
      case "string":
        return parseRawSchemaString(data);
      case "integer":
      case "number":
        return parseRawSchemaNumber(data);
      case "array":
        return parseRawSchemaArray(data);
      case "object":
        return parseRawSchemaObject(data, required);
    }
  } else if ("$ref" in data) {
    return parseRawSchemaRef(data);
  } else if ("content" in data) {
    return parseRawSchemaContent(data);
  } else if ("allOf" in data) {
    return parseRawSchemaAllOf(data);
  } else if ("anyOf" in data) {
    return parseRawSchemaAnyOf(data);
  } else if ("oneOf" in data) {
    return parseRawSchemaOneOf(data);
  } else if ("not" in data) {
    return parseRawSchemaNot(data);
  } else if ("enum" in data) {
    return parseRawSchemaString(data);
  } else if ("items" in data) {
    return parseRawSchemaArray(data);
  } else if ("properties" in data) {
    return parseRawSchemaObject(data, required);
  } else {
    return parseRawSchemaAny(data);
  }
};
