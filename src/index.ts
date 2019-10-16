import * as yaml from "yaml";
import { RawData } from "./types";
import { parseComponents, compileComponents } from "./components";

export const generateFromJson = async (_: string, data: RawData) => {
  if (data.components) {
    console.log(compileComponents(parseComponents(data.components)));
  }
  if (data.paths) {
  }
};

export const generateFromYaml = async (output: string, data: string) =>
  await generateFromJson(output, yaml.parse(data));
