import {
  RawSchemaString,
  SchemaEnum,
  RawSchemaNumber,
  ParseSchemaFn
} from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaEnum: ParseSchemaFn<
  RawSchemaString | RawSchemaNumber,
  SchemaEnum
> = ({
  description,
  example,
  enum: enuM,
  title: name,
  type: _,
  format: __,
  ...rest
}) => {
  warnRest(rest, "enum");
  return {
    type: "enum",
    description,
    example,
    name,
    enum: enuM
  };
};
