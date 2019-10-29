export interface SchemaBase<T extends string> {
  type: T;
  description?: string;
  example?: any;
  name?: string;
}

export interface SchemaBoolean extends SchemaBase<"boolean"> {}

export interface SchemaString extends SchemaBase<"string"> {
  format?: string;
  default?: string;
  minLength?: number;
  maxLength?: number;
}

export interface SchemaNumber extends SchemaBase<"number"> {
  format?: string;
  default?: number;
  minimum?: number;
  maximum?: number;
}

export interface SchemaEnum extends SchemaBase<"enum"> {
  enum?: ReadonlyArray<string> | ReadonlyArray<number>;
}

export interface SchemaArray extends SchemaBase<"array"> {
  maxItems?: number;
  items: Schema;
}

export interface SchemaObjectDiscriminator {
  propertyName: string;
  mapping: {
    [key: string]: string;
  };
}

export interface SchemaObject extends SchemaBase<"object"> {
  properties: ReadonlyArray<SchemaObjectPropery>;
}

export interface SchemaDiscriminator extends SchemaBase<"discriminator"> {
  properties: ReadonlyArray<SchemaObjectPropery>;
  discriminator?: SchemaObjectDiscriminator;
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
  contentTypes: ReadonlyArray<SchemaContentType>;
}

export interface SchemaContentType {
  type: string;
  schema: Schema;
}

export interface SchemaAllOf extends SchemaBase<"allOf"> {
  types: ReadonlyArray<Schema>;
}

export interface SchemaOneOf extends SchemaBase<"oneOf"> {
  types: ReadonlyArray<Schema>;
}

export interface SchemaAnyOf extends SchemaBase<"anyOf"> {
  types: ReadonlyArray<Schema>;
}

export interface SchemaNot extends SchemaBase<"not"> {
  exclude: "array" | "boolean" | "number" | "object" | "string";
}

export interface SchemaAny extends SchemaBase<"any"> {}

export type Schema =
  | SchemaBoolean
  | SchemaString
  | SchemaNumber
  | SchemaEnum
  | SchemaArray
  | SchemaObject
  | SchemaDiscriminator
  | SchemaRef
  | SchemaContent
  | SchemaAllOf
  | SchemaOneOf
  | SchemaAnyOf
  | SchemaNot
  | SchemaAny;
