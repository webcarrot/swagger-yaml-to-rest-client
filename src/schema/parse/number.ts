import { RawSchemaNumber, SchemaNumber, SchemaEnum } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchemaEnum } from "./enum";

export const parseRawSchemaNumber = (
  data: RawSchemaNumber
): SchemaNumber | SchemaEnum => {
  if ("enum" in data) {
    return parseRawSchemaEnum(data);
  } else {
    const {
      description,
      example,
      title: name,
      format,
      minimum,
      maximum,
      default: defaulT,
      type: _,
      ...rest
    } = data;
    warnRest(rest, "number");
    return {
      type: "number",
      description,
      example,
      name,
      format,
      minimum,
      maximum,
      default: defaulT
    };
  }
};
