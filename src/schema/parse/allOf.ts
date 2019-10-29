import { RawSchemaAllOf, SchemaAllOf, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaAllOf: ParseSchemaFn<
  RawSchemaAllOf,
  SchemaAllOf
> = ({ description, example, title: name, allOf, required, ...rest }) => {
  warnRest(rest, "allOf");
  return {
    type: "allOf",
    description,
    example,
    name,
    types: allOf.map(el => parseRawSchema(el, required))
  };
};
