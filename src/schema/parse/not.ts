import { RawSchemaNot, SchemaNot } from "../../types";
import { warnRest } from "../../utils";

export const parseRawSchemaNot = ({
  description,
  example,
  title: name,
  not: { type: exclude },
  ...rest
}: RawSchemaNot): SchemaNot => {
  warnRest(rest, "not");
  return {
    type: "not",
    description,
    example,
    name,
    exclude: exclude === "integer" ? "number" : exclude
  };
};
