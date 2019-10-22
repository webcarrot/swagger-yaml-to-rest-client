import { RawSchemaAnyOf, SchemaAnyOf } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaAnyOf = ({
  description,
  example,
  title: name,
  anyOf,
  required,
  ...rest
}: RawSchemaAnyOf): SchemaAnyOf => {
  warnRest(rest, "anyOf");
  return {
    type: "anyOf",
    description,
    example,
    name,
    types: anyOf.map(el => parseRawSchema(el, required))
  };
};
