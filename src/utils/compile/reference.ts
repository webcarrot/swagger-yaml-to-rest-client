import { ImportType } from "../../types";

export const parseRef = (ref: string): ImportType => {
  const path = ref.split("/");
  if (path[0] === "#") {
    path.shift();
  }
  return {
    id: path[path.length - 1],
    path: path.join("/")
  };
};

export const compileImportTypes = (
  importTypes: ReadonlyArray<ImportType>,
  path: string
): string =>
  importTypes
    .filter(
      (importType, index) =>
        importType.path !== path &&
        importTypes.findIndex(({ id }) => id === importType.id) === index
    )
    .map(importType => compileReference(importType, path))
    .join("\n");

const getRelativePath = (destination: string, source: string) => {
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
  } else {
    return `${"../".repeat(path.length - 1)}${path.join("/")}`;
  }
};

const compileReference = (importType: ImportType, path: string): string =>
  `import { ${importType.id} } from "${getRelativePath(
    importType.path,
    path
  )}"`;
