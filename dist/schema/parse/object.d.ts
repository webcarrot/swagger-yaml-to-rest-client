import { RawSchemaObject, SchemaObject, SchemaRef, RawSchemaObjectRef, SchemaAny } from "../../types";
export declare const parseRawSchemaObject: (data: RawSchemaObject | RawSchemaObjectRef, optRequired?: readonly string[]) => SchemaObject | SchemaRef | SchemaAny;
