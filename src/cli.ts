import * as yargs from "yargs";
import axios from "axios";
import * as fs from "fs";
import { generateFromYaml } from "./index";

const argv = yargs
  .scriptName("@omnia/web-client")
  .string("url")
  .describe("url", "URL to swagger.yaml file")
  .string("file")
  .describe("file", "Path to swagger.yaml file")
  .string("output")
  .describe("output", "Output directory")
  .required("output")
  .help().argv;

(async (output: string, url: string, filePath: string): Promise<number> => {
  try {
    let fileContent: string;
    if (url) {
      fileContent = (await axios.get(url, { responseType: "text" })).data;
    } else if (filePath) {
      fileContent = await fs.promises.readFile(filePath, { encoding: "utf8" });
    } else {
      throw new Error("Provide url or file");
    }
    await generateFromYaml(output, fileContent);
  } catch (err) {
    console.error(err.message);
    return 1;
  }

  return 0;
})(argv.output, argv.url, argv.file).then(process.exit);
