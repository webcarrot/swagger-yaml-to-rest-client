import { RawSchema, SchemaAny, ParseSchemaFn } from "../../types";

export const parseRawSchemaAny: ParseSchemaFn<RawSchema, SchemaAny> = (
  data
): SchemaAny => {
  console.warn("ANY TYPE", data);
  return {
    type: "any",
    description: data.description,
    example: data.example,
    name: data.title
  };
};
