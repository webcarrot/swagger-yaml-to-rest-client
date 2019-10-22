import { SchemaArray, RawSchemaArray } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaArray = ({
  description,
  example,
  title: name,
  maxItems,
  items,
  type: _,
  ...rest
}: RawSchemaArray): SchemaArray => {
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
