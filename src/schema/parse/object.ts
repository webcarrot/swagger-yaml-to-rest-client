import {
  RawSchemaObject,
  SchemaObject,
  SchemaRef,
  RawSchemaObjectRef,
  SchemaAny,
  SchemaDiscriminator,
  ParseSchemaFn
} from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchemaRef } from "./ref";
import { parseRawSchema } from "./parse";
import { parseRawSchemaAny } from "./any";

export const parseRawSchemaObject: ParseSchemaFn<
  RawSchemaObject | RawSchemaObjectRef,
  SchemaObject | SchemaDiscriminator | SchemaRef | SchemaAny
> = (data, optRequired) => {
  if ("$ref" in data) {
    const { type: _, ...rest } = data;
    return parseRawSchemaRef(rest);
  } else if ("properties" in data) {
    const {
      description,
      example,
      title: name,
      properties,
      required = optRequired,
      discriminator,
      type: _,
      ...rest
    } = data;
    warnRest(rest, "object");
    if (discriminator) {
      return {
        type: "discriminator",
        description,
        example,
        name,
        properties: Object.keys(properties).map(id => ({
          id,
          required: !!(required && required.includes(id)),
          schema: parseRawSchema(properties[id])
        })),
        discriminator
      };
    } else {
      return {
        type: "object",
        description,
        example,
        name,
        properties: Object.keys(properties).map(id => ({
          id,
          required: !!(required && required.includes(id)),
          schema: parseRawSchema(properties[id])
        }))
      };
    }
  } else if (data && data.type === "object") {
    const { description, example, title: name, type: _, ...rest } = data;
    warnRest(rest, "object");
    return {
      type: "object",
      description,
      example,
      name,
      properties: []
    };
  } else {
    return parseRawSchemaAny(data);
  }
};
