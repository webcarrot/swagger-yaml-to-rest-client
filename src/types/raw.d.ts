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
};

export type RawSchemaString = RawSchemaBase & {
  type?: "string";
  maxLength?: number;
  format?: string;
  enum?: ReadonlyArray<string>;
};

export type RawSchemaInteger = RawSchemaBase & {
  type: "integer";
  format?: string;
  minimum?: number;
  maximum?: number;
  default?: number;
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
};

export type RawSchema =
  | RawSchemaString
  | RawSchemaInteger
  | RawSchemaArray
  | RawSchemaObject
  | RawSchemaObjectRef
  | RawSchemaRef
  | RawSchemaContent
  | RawSchemaAllOf;

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
