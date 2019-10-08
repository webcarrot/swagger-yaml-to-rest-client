export type SchemaBase<T extends string> = {
  type: T;
  description?: string;
  example?: any;
};

export type SchemaString = SchemaBase<"string"> & {
  maxLength?: number;
  format?: string;
};

export type SchemaNumber = SchemaBase<"number"> & {
  format?: string;
  minimum?: number;
  maximum?: number;
  default?: number;
};

export type SchemaEnum = SchemaBase<"enum"> & {
  enum?: ReadonlyArray<string>;
};

export type SchemaArray = SchemaBase<"array"> & {
  maxItems?: number;
  items: Schema;
};

export type Schema = SchemaString | SchemaNumber | SchemaEnum | SchemaArray;
