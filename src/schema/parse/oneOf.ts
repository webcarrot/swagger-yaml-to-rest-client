import { RawSchemaOneOf, SchemaOneOf, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaOneOf: ParseSchemaFn<
  RawSchemaOneOf,
  SchemaOneOf
> = ({ description, example, title: name, oneOf, required, ...rest }) => {
  warnRest(rest, "oneOf");
  return {
    type: "oneOf",
    description,
    example,
    name,
    types: oneOf.map(el => parseRawSchema(el, required))
  };
};
