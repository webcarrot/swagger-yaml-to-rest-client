import { RawSchemaRef, SchemaRef } from "../../types";
export declare const parseRawSchemaRef: ({ description, example, title: name, $ref: ref, ...rest }: RawSchemaRef) => SchemaRef;
