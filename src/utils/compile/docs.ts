export const compileDocs = (
  data: ReadonlyArray<{ key: string; content: any }>
): string => {
  const toDisplay = data
    .filter(({ content }) => content !== null && content !== undefined)
    .reduce<string[]>((out, { key, content }) => {
      if (content !== true) {
        const contentValue = `${content}`.split("\n");
        if (contentValue.length > 1) {
          out.push(`@${key}`, ...contentValue);
        } else {
          out.push(`@${key} ${contentValue[0]}`);
        }
      } else {
        out.push(`@${key}`);
      }
      return out;
    }, []);
  if (!toDisplay.length) {
    return "";
  } else {
    return `/**
 * ${toDisplay.join(`\n * `)}
 */
`;
  }
};
