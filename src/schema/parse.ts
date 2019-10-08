import {
  RawSchema,
  Schema,
  RawSchemaString,
  SchemaString,
  SchemaEnum,
  RawSchemaInteger,
  SchemaNumber,
  SchemaArray,
  RawSchemaArray
} from "../types";

const parseRawSchemaString = (
  data: RawSchemaString
): SchemaString | SchemaEnum => {
  if ("enum" in data) {
    return {
      type: "enum",
      description: data.description || null,
      example: data.example || null,
      enum: data.enum
    };
  } else {
    return {
      type: "string",
      description: data.description || null,
      example: data.example || null,
      format: data.format || null,
      maxLength: data.maxLength
    };
  }
};

const parseRawSchemaInteger = (data: RawSchemaInteger): SchemaNumber => {
  return {
    type: "number",
    description: data.description || null,
    example: data.example || null,
    format: data.format || null,
    minimum: data.minimum || null,
    maximum: data.maximum || null,
    default: data.default || null
  };
};

const parseRawSchemaArray = (data: RawSchemaArray): SchemaArray => {
  return {
    type: "array",
    description: data.description || null,
    example: data.example,
    maxItems: data.maxItems,
    items: parseRawSchema(data.items)
  };
};

export const parseRawSchema = (data: RawSchema): Schema => {
  let schema: Schema;
  if ("type" in data) {
    switch (data.type) {
      case "string":
        return parseRawSchemaString(data);
      case "integer":
        return parseRawSchemaInteger(data);
      case "array":
        return parseRawSchemaArray(data);
      case "object":
    }
  }

  return schema;
};
