"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRef = (ref) => {
    const path = ref.split("/");
    if (path[0] === "#") {
        path.shift();
    }
    return {
        id: path[path.length - 1],
        path: path.join("/")
    };
};
exports.compileImportTypes = (importTypes, path) => importTypes
    .filter((importType, index) => importType.path !== path &&
    importTypes.findIndex(({ id }) => id === importType.id) === index)
    .map(importType => compileReference(importType, path))
    .join("\n");
const getRelativePath = (destination, source) => {
    const sourcePath = source.split("/");
    const destinationPath = destination.split("/");
    const path = [];
    let i = 0;
    while (i < destinationPath.length) {
        if (path.length || sourcePath[i] !== destinationPath[i]) {
            path.push(destinationPath[i]);
        }
        i++;
    }
    if (path.length === 1) {
        return `./${path[0]}`;
    }
    else {
        return `${"../".repeat(path.length - 1)}${path.join("/")}`;
    }
};
const compileReference = (importType, path) => `import { ${importType.id} } from "${getRelativePath(importType.path, path)}"`;
//# sourceMappingURL=reference.js.map