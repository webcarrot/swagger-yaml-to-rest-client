import { RawSchemaAllOf, SchemaAllOf } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaAllOf = ({
  description,
  example,
  title: name,
  allOf,
  required,
  ...rest
}: RawSchemaAllOf): SchemaAllOf => {
  warnRest(rest, "allOf");
  return {
    type: "allOf",
    description,
    example,
    name,
    types: allOf.map(el => parseRawSchema(el, required))
  };
};
