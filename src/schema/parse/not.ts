import { RawSchemaNot, SchemaNot, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaNot: ParseSchemaFn<RawSchemaNot, SchemaNot> = ({
  description,
  example,
  title: name,
  not: { type: exclude },
  ...rest
}) => {
  warnRest(rest, "not");
  return {
    type: "not",
    description,
    example,
    name,
    exclude: exclude === "integer" ? "number" : exclude
  };
};
