import { RawData } from "./types";
export declare const generateFromJson: (output: string, data: RawData) => Promise<void>;
export declare const generateFromYaml: (output: string, data: string) => Promise<void>;
