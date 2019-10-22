export type RawData = {
  paths?: { [key in string]: RawPathData };
  components?: { [key in string]: RawComponentsData };
};

export type RawPathMethod = "get" | "post" | "put" | "delete";

export type RawPathData = {
  [key in RawPathMethod]: RawPathMethodData;
};

export type RawComponentsData = {
  [key in string]: RawSchema;
};

export type RawPathMethodParameterIn = "path" | "query";

export type RawSchemaBase = {
  description?: string;
  example?: any;
  title?: string;
};

export type RawSchemaBoolean = RawSchemaBase & {
  type: "boolean";
};

export type RawSchemaString = RawSchemaBase & {
  type?: "string";
  format?: string;
  default?: string;
  minLength?: number;
  maxLength?: number;
  enum?: ReadonlyArray<string>;
};

export type RawSchemaNumber = RawSchemaBase & {
  type: "integer" | "number";
  format?: string;
  default?: number;
  minimum?: number;
  maximum?: number;
  enum?: ReadonlyArray<number>;
};

export type RawSchemaArray = RawSchemaBase & {
  type?: "array";
  maxItems?: number;
  items: RawSchema;
};

export type RawSchemaObject = RawSchemaBase & {
  type?: "object";
  required?: ReadonlyArray<string>;
  properties: {
    [key in string]: RawSchema;
  };
  discriminator?: {
    propertyName: string;
    mapping: {
      [key: string]: string;
    };
  };
};

export type RawSchemaObjectRef = RawSchemaBase & {
  type?: "object";
  $ref: string;
};

export type RawSchemaRef = RawSchemaBase & {
  $ref: string;
};

export type RawSchemaContent = RawSchemaBase & {
  content: {
    [key in string]: {
      schema: RawSchema;
    };
  };
  required?: boolean;
};

export type RawSchemaAllOf = RawSchemaBase & {
  allOf: ReadonlyArray<RawSchema>;
  required?: ReadonlyArray<string>;
};

export type RawSchemaOneOf = RawSchemaBase & {
  oneOf: ReadonlyArray<RawSchema>;
  required?: ReadonlyArray<string>;
};

export type RawSchemaAnyOf = RawSchemaBase & {
  anyOf: ReadonlyArray<RawSchema>;
  required?: ReadonlyArray<string>;
};

export type RawSchemaNot = RawSchemaBase & {
  not: {
    type: "array" | "boolean" | "integer" | "number" | "object" | "string";
  };
};

export type RawSchema =
  | RawSchemaBoolean
  | RawSchemaString
  | RawSchemaNumber
  | RawSchemaArray
  | RawSchemaObject
  | RawSchemaObjectRef
  | RawSchemaRef
  | RawSchemaContent
  | RawSchemaAllOf
  | RawSchemaOneOf
  | RawSchemaNot
  | RawSchemaAnyOf;

export type RawResponse = "200" | "default";

export type RawPathMethodParameter = {
  name: string;
  in: RawPathMethodParameterIn;
  description: string;
  required: boolean;
  schema: RawSchema;
};

export type RawPathMethodData = {
  tags?: ReadonlyArray<string>;
  summary?: string;
  operationId?: string;
  parameters?: ReadonlyArray<RawPathMethodParameter>;
  responses: {
    [key in RawResponse]: {
      description: string;
      content?: {
        [key in string]: {
          schema: RawSchema;
          examples?: {
            [key in string]: {
              summary: string;
              value: any;
            };
          };
        };
      };
    };
  };
  requestBody?: RawSchema;
};
