import { RawSchemaContent, SchemaContent, ParseSchemaFn } from "../../types";
import { warnRest } from "../../utils";
import { parseRawSchema } from "./parse";

export const parseRawSchemaContent: ParseSchemaFn<
  RawSchemaContent,
  SchemaContent
> = ({
  description,
  example,
  title: name,
  required = false,
  content,
  ...rest
}) => {
  warnRest(rest, "content");
  return {
    type: "content",
    description,
    example,
    name,
    required,
    contentTypes: Object.keys(content).map(type => ({
      type,
      schema: parseRawSchema(content[type].schema)
    }))
  };
};
