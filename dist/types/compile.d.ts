export type CompileOutput = {
  path: string;
  content: string;
};

export type ImportType = {
  id: string;
  path: string;
};

export type CompileInfo = {
  importTypes: ReadonlyArray<ImportType>;
  content: string;
};
