import * as yaml from "yaml";
import { RawData, CompileOutput } from "./types";
import { parseComponents, compileComponents } from "./components";
import { promises } from "fs";
import { join, dirname, isAbsolute } from "path";

const getDir = async (dir: string) => {
  try {
    const info = await promises.stat(dir);
    if (info.isDirectory()) {
      return;
    }
  } catch (_) {
    await promises.mkdir(dir, { recursive: true });
    return;
  }
  throw new Error(`Invalid dir path ${dir}`);
};

const getPath = (() => {
  const dirCache = new Map<string, Promise<void>>();

  return async (output: string, info: CompileOutput) => {
    const path = join(output, info.path);
    const dir = dirname(path);
    if (!dirCache.has(dir)) {
      dirCache.set(dir, getDir(dir));
    }
    await dirCache.get(dir);
    return path;
  };
})();

const saveFile = async (output: string, info: CompileOutput) => {
  await promises.writeFile(await getPath(output, info), info.content);
};

export const generateFromJson = async (output: string, data: RawData) => {
  let files: CompileOutput[] = [];
  if (data.components) {
    files = files.concat(compileComponents(parseComponents(data.components)));
  }
  if (data.paths) {
  }
  const outputDir = isAbsolute(output) ? output : join(process.cwd(), output);
  await Promise.all(files.map(info => saveFile(outputDir, info)));
};

export const generateFromYaml = async (output: string, data: string) =>
  await generateFromJson(output, yaml.parse(data));
