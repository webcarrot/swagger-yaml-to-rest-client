import { RawSchema, SchemaAny } from "../../types";

export const parseRawSchemaAny = (data: RawSchema): SchemaAny => {
  console.warn("ANY TYPE", data);
  return {
    type: "any",
    description: data.description,
    example: data.example,
    name: data.title
  };
};
