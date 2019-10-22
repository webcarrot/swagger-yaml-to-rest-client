import { RawSchemaRef, SchemaRef } from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaRef = ({
  description,
  example,
  title: name,
  $ref: ref,
  ...rest
}: RawSchemaRef): SchemaRef => {
  warnRest(rest, "ref");
  return {
    type: "ref",
    description,
    example,
    name,
    ref
  };
};
