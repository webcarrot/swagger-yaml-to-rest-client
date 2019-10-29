import { RawSchemaBoolean, SchemaBoolean, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaBoolean: ParseSchemaFn<
  RawSchemaBoolean,
  SchemaBoolean
> = ({ description, example, title: name, type: _, ...rest }) => {
  warnRest(rest, "boolean");
  return {
    type: "boolean",
    description,
    example,
    name
  };
};
