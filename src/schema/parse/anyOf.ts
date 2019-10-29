import { RawSchemaAnyOf, SchemaAnyOf, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaAnyOf: ParseSchemaFn<
  RawSchemaAnyOf,
  SchemaAnyOf
> = ({ description, example, title: name, anyOf, required, ...rest }) => {
  warnRest(rest, "anyOf");
  return {
    type: "anyOf",
    description,
    example,
    name,
    types: anyOf.map(el => parseRawSchema(el, required))
  };
};
