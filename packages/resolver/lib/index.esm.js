// src/index.ts
function getSideEffects(dirName, options) {
  const { importStyle = true } = options;
  const path = getPath(options);
  if (importStyle === "sass") {
    return `${path}/${dirName}/style/sass`;
  }
  if (importStyle === "css" || importStyle === true) {
    return `${path}/${dirName}/style/index`;
  }
  return;
}
function getPath(options) {
  return `arkui-mobile-vue/${options.format === "cjs" ? "lib" : "es"}`;
}
function ArkUIResolver(options = {}) {
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith("Ak")) {
        const partialName = name.slice(2);
        return {
          importName: partialName,
          path: getPath(options),
          sideEffects: getSideEffects(partialName, options)
        };
      }
    }
  };
}
export {
  ArkUIResolver
};
