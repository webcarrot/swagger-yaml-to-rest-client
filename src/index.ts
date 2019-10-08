import * as yaml from "yaml";
import { RawData } from "./types";

export const generateFromJson = async (_: string, data: RawData) => {
  if (data.components) {
  }
};

export const generateFromYaml = async (output: string, data: string) =>
  await generateFromJson(output, yaml.parse(data));
