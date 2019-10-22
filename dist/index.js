"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("yaml");
const components_1 = require("./components");
const fs_1 = require("fs");
const path_1 = require("path");
const getDir = async (dir) => {
    try {
        const info = await fs_1.promises.stat(dir);
        if (info.isDirectory()) {
            return;
        }
    }
    catch (_) {
        await fs_1.promises.mkdir(dir, { recursive: true });
        return;
    }
    throw new Error(`Invalid dir path ${dir}`);
};
const getPath = (() => {
    const dirCache = new Map();
    return async (output, info) => {
        const path = path_1.join(output, info.path);
        const dir = path_1.dirname(path);
        if (!dirCache.has(dir)) {
            dirCache.set(dir, getDir(dir));
        }
        await dirCache.get(dir);
        return path;
    };
})();
const saveFile = async (output, info) => {
    await fs_1.promises.writeFile(await getPath(output, info), info.content);
};
exports.generateFromJson = async (output, data) => {
    let files = [];
    if (data.components) {
        files = files.concat(components_1.compileComponents(components_1.parseComponents(data.components)));
    }
    if (data.paths) {
    }
    const outputDir = path_1.isAbsolute(output) ? output : path_1.join(process.cwd(), output);
    await Promise.all(files.map(info => saveFile(outputDir, info)));
};
exports.generateFromYaml = async (output, data) => await exports.generateFromJson(output, yaml.parse(data));
//# sourceMappingURL=index.js.map