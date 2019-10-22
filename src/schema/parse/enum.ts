import { RawSchemaString, SchemaEnum, RawSchemaNumber } from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaEnum = ({
  description,
  example,
  enum: enuM,
  title: name,
  type: _,
  format: __,
  ...rest
}: RawSchemaString | RawSchemaNumber): SchemaEnum => {
  warnRest(rest, "enum");
  return {
    type: "enum",
    description,
    example,
    name,
    enum: enuM
  };
};
