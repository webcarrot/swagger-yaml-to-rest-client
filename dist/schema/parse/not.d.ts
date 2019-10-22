import { RawSchemaNot, SchemaNot } from "../../types";
export declare const parseRawSchemaNot: ({ description, example, title: name, not: { type: exclude }, ...rest }: RawSchemaNot) => SchemaNot;
