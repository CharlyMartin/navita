const orderRegex = /^((\d+)-)?(.*)$/;

export const urlFromFlattenedPath = (filePath: string) => {
  return filePath
    .replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + `${match.toLowerCase()}`)
    .toLowerCase()
    .split("/")
    .map((x) => x.replace(orderRegex, "$3"))
    .join("/");
};

export const getPathSegments = (flattenedPath: string) => flattenedPath.split("/").slice(1).map((dirName, index) => {
  const [, , orderStr, pathName] = dirName.match(orderRegex) ?? [];

  return {
    order: orderStr ? parseInt(orderStr) : 0,
    pathName,
    index,
  };
});
