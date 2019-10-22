import { RawSchemaBoolean, SchemaBoolean } from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaBoolean = ({
  description,
  example,
  title: name,
  type: _,
  ...rest
}: RawSchemaBoolean): SchemaBoolean => {
  warnRest(rest, "boolean");
  return {
    type: "boolean",
    description,
    example,
    name
  };
};
