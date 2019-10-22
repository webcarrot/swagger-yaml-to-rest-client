import { RawSchemaOneOf, SchemaOneOf } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaOneOf = ({
  description,
  example,
  title: name,
  oneOf,
  required,
  ...rest
}: RawSchemaOneOf): SchemaOneOf => {
  warnRest(rest, "oneOf");
  return {
    type: "oneOf",
    description,
    example,
    name,
    types: oneOf.map(el => parseRawSchema(el, required))
  };
};
