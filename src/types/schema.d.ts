export interface SchemaBase<T extends string> {
  type: T;
  description?: string;
  example?: any;
}

export interface SchemaString extends SchemaBase<"string"> {
  maxLength?: number;
  format?: string;
}

export interface SchemaNumber extends SchemaBase<"number"> {
  format?: string;
  minimum?: number;
  maximum?: number;
  default?: number;
}

export interface SchemaEnum extends SchemaBase<"enum"> {
  enum?: ReadonlyArray<string>;
}

export interface SchemaArray extends SchemaBase<"array"> {
  maxItems?: number;
  items: Schema;
}

export interface SchemaObject extends SchemaBase<"object"> {
  properties: ReadonlyArray<SchemaObjectPropery>;
}

export interface SchemaObjectPropery {
  id: string;
  required: boolean;
  schema: Schema;
}

export interface SchemaRef extends SchemaBase<"ref"> {
  ref: string;
}

export interface SchemaContent extends SchemaBase<"content"> {
  required: boolean;
  properties: ReadonlyArray<SchemaContentPropery>;
}

export interface SchemaContentPropery {
  id: string;
  schema: Schema;
}

export interface SchemaAllOf extends SchemaBase<"allOf"> {
  types: ReadonlyArray<Schema>;
}

export interface SchemaAny extends SchemaBase<"any"> {}

export type Schema =
  | SchemaString
  | SchemaNumber
  | SchemaEnum
  | SchemaArray
  | SchemaObject
  | SchemaRef
  | SchemaContent
  | SchemaAllOf
  | SchemaAny;
