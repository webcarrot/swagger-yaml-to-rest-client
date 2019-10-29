import { SchemaArray, RawSchemaArray, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaArray: ParseSchemaFn<
  RawSchemaArray,
  SchemaArray
> = ({
  description,
  example,
  title: name,
  maxItems,
  items,
  type: _,
  ...rest
}) => {
  warnRest(rest, "array");
  return {
    type: "array",
    description,
    example,
    name,
    maxItems,
    items: parseRawSchema(items)
  };
};
