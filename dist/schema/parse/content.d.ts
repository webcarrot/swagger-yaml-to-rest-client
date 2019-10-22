import { RawSchemaContent, SchemaContent } from "../../types";
export declare const parseRawSchemaContent: ({ description, example, title: name, required, content, ...rest }: RawSchemaContent) => SchemaContent;
