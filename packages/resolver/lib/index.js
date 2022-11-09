var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  UIResolver: () => UIResolver
});
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
  return `tantalum-ui-mobile/${options.format === "cjs" ? "lib" : "es"}`;
}
function UIResolver(options = {}) {
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith("Ta")) {
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
module.exports = __toCommonJS(src_exports);
