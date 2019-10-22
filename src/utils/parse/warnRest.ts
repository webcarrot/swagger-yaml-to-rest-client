export const warnRest = (rest: any, type: string) => {
  if (rest && Object.keys(rest).length) {
    console.warn(`Rest params in "${type}"`, rest);
  }
};
