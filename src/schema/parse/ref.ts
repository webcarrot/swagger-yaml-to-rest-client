import { RawSchemaRef, SchemaRef, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaRef: ParseSchemaFn<RawSchemaRef, SchemaRef> = ({
  description,
  example,
  title: name,
  $ref: ref,
  ...rest
}) => {
  warnRest(rest, "ref");
  return {
    type: "ref",
    description,
    example,
    name,
    ref
  };
};
