"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const axios_1 = require("axios");
const fs = require("fs");
const index_1 = require("./index");
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
(async (output, url, filePath) => {
    try {
        let fileContent;
        if (url) {
            fileContent = (await axios_1.default.get(url, { responseType: "text" })).data;
        }
        else if (filePath) {
            fileContent = await fs.promises.readFile(filePath, { encoding: "utf8" });
        }
        else {
            throw new Error("Provide url or file");
        }
        await index_1.generateFromYaml(output, fileContent);
    }
    catch (err) {
        console.error(err.message);
        return 1;
    }
    return 0;
})(argv.output, argv.url, argv.file).then(process.exit);
//# sourceMappingURL=cli.js.map