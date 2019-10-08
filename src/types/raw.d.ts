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

export type RawSchemaString = {
  type: "string";
  maxLength?: number;
  format?: string;
  enum?: ReadonlyArray<string>;
  description?: string;
  example?: string;
};

export type RawSchemaInteger = {
  type: "integer";
  format?: string;
  minimum?: number;
  maximum?: number;
  default?: number;
  description?: string;
  example?: string | number;
};

export type RawSchemaArray = {
  type: "array";
  maxItems?: number;
  description?: string;
  example?: ReadonlyArray<any>;
  items: RawSchema;
};

export type RawSchemaObject = {
  type?: "object";
  required?: ReadonlyArray<string>;
  description?: string;
  example?: any;
  properties: {
    [key in string]: RawSchema;
  };
};

export type RawSchemaRef = {
  $ref: string;
};

export type RawSchemaContent = {
  content: {
    [key in string]: {
      schema: RawSchema;
    };
  };
  description?: string;
  required?: boolean;
};

export type RawSchemaAllOf = {
  allOf: ReadonlyArray<RawSchema>;
};

export type RawSchema =
  | RawSchemaString
  | RawSchemaInteger
  | RawSchemaArray
  | RawSchemaObject
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
