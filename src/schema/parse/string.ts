import { RawSchemaString, SchemaString, SchemaEnum } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchemaEnum } from "./enum";

export const parseRawSchemaString = (
  data: RawSchemaString
): SchemaString | SchemaEnum => {
  if ("enum" in data) {
    return parseRawSchemaEnum(data);
  } else {
    const {
      description,
      example,
      title: name,
      format,
      default: defaulT,
      minLength,
      maxLength,
      type: _,
      ...rest
    } = data;
    warnRest(rest, "string");
    return {
      type: "string",
      description,
      example,
      name,
      format,
      default: defaulT,
      minLength,
      maxLength
    };
  }
};
