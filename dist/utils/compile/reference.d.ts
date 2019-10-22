import { ImportType } from "../../types";
export declare const parseRef: (ref: string) => ImportType;
export declare const compileImportTypes: (importTypes: readonly ImportType[], path: string) => string;
