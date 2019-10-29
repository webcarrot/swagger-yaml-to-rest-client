import { RawSchemaObject, SchemaObject, SchemaRef, RawSchemaObjectRef, SchemaAny, SchemaDiscriminator, ParseSchemaFn } from "../../types";
export declare const parseRawSchemaObject: ParseSchemaFn<RawSchemaObject | RawSchemaObjectRef, SchemaObject | SchemaDiscriminator | SchemaRef | SchemaAny>;
