import { RawSchemaString, SchemaEnum, RawSchemaNumber } from "../../types";
export declare const parseRawSchemaEnum: ({ description, example, enum: enuM, title: name, type: _, format: __, ...rest }: RawSchemaString | RawSchemaNumber) => SchemaEnum;
