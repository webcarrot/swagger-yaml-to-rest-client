import {
  RawSchema,
  Schema,
  RawSchemaString,
  SchemaString,
  SchemaEnum,
  RawSchemaInteger,
  SchemaNumber,
  SchemaArray,
  RawSchemaArray,
  RawSchemaObject,
  SchemaObject,
  RawSchemaContent,
  SchemaContent,
  RawSchemaRef,
  SchemaRef,
  RawSchemaAllOf,
  SchemaAllOf,
  RawSchemaObjectRef,
  SchemaAny
} from "../types";

const parseRawSchemaString = (
  data: RawSchemaString
): SchemaString | SchemaEnum => {
  if ("enum" in data) {
    return {
      type: "enum",
      description: data.description,
      example: data.example,
      enum: data.enum
    };
  } else {
    return {
      type: "string",
      description: data.description,
      example: data.example,
      format: data.format,
      maxLength: data.maxLength
    };
  }
};

const parseRawSchemaInteger = (data: RawSchemaInteger): SchemaNumber => {
  return {
    type: "number",
    description: data.description,
    example: data.example,
    format: data.format,
    minimum: data.minimum,
    maximum: data.maximum,
    default: data.default
  };
};

const parseRawSchemaArray = (data: RawSchemaArray): SchemaArray => {
  return {
    type: "array",
    description: data.description,
    example: data.example,
    maxItems: data.maxItems,
    items: parseRawSchema(data.items)
  };
};

const parseRawSchemaObject = (
  data: RawSchemaObject | RawSchemaObjectRef
): SchemaObject | SchemaRef | SchemaAny => {
  if ("$ref" in data) {
    return parseRawSchemaRef(data);
  } else if ("properties" in data) {
    return {
      type: "object",
      description: data.description,
      example: data.example,
      properties: Object.keys(data.properties).map(id => ({
        id,
        required: !!(data.required && data.required.includes(id)),
        schema: parseRawSchema(data.properties[id])
      }))
    };
  } else {
    return parseRawSchemaAny(data);
  }
};

const parseRawSchemaRef = (data: RawSchemaRef): SchemaRef => {
  return {
    type: "ref",
    description: data.description,
    example: data.example,
    ref: data.$ref
  };
};

const parseRawSchemaContent = (data: RawSchemaContent): SchemaContent => {
  return {
    type: "content",
    description: data.description,
    example: data.example,
    required: data.required || false,
    properties: Object.keys(data.content).map(id => ({
      id,
      schema: parseRawSchema(data.content[id].schema)
    }))
  };
};

const parseRawSchemaAllOf = (data: RawSchemaAllOf): SchemaAllOf => {
  return {
    type: "allOf",
    description: data.description,
    example: data.example,
    types: data.allOf.map(parseRawSchema)
  };
};

const parseRawSchemaAny = (data: RawSchema): SchemaAny => ({
  type: "any",
  description: data.description,
  example: data.example
});

export const parseRawSchema = (data: RawSchema): Schema => {
  if ("type" in data) {
    switch (data.type) {
      case "string":
        return parseRawSchemaString(data);
      case "integer":
        return parseRawSchemaInteger(data);
      case "array":
        return parseRawSchemaArray(data);
      case "object":
        return parseRawSchemaObject(data);
    }
  } else if ("$ref" in data) {
    return parseRawSchemaRef(data);
  } else if ("content" in data) {
    return parseRawSchemaContent(data);
  } else if ("allOf" in data) {
    return parseRawSchemaAllOf(data);
  } else if ("enum" in data) {
    return parseRawSchemaString(data);
  } else if ("items" in data) {
    return parseRawSchemaArray(data);
  } else if ("properties" in data) {
    return parseRawSchemaObject(data);
  } else {
    return parseRawSchemaAny(data);
  }
};
