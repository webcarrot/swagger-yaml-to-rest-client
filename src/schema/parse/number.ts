import {
  RawSchemaNumber,
  SchemaNumber,
  SchemaEnum,
  ParseSchemaFn
} from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchemaEnum } from "./enum";

export const parseRawSchemaNumber: ParseSchemaFn<
  RawSchemaNumber,
  SchemaNumber | SchemaEnum
> = data => {
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
