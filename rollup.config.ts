import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es"
  },
  plugins: [
    nodeResolve({
      // 仅作为模块导入
      modulesOnly: true,
      preferBuiltins: false
    }),
    typescript({
      exclude: ["rollup.config.ts"],
      compilerOptions: {
        declaration: true,
        declarationDir: "dist"
      }
    }),
    /**
     * 自定义ts全局注入reference插件，解决declare module无法自动注册的问题
     * 使用 /// reference的语法,可实现declare module自定义module的注册
     */
    {
      name: "rollup-plugin-custom-module",
      generateBundle(opts, bundle) {
        const globalTypes = ["../types/module.d.ts"];
        for (const key in bundle) {
          // 注入reference
          if (key === "index.d.ts") {
            const chunk = bundle[key];
            if (chunk.type === "asset") {
              // chunk.source
              chunk.source =
                globalTypes
                  .map((p) => `/// <reference path="${p}" />\n`)
                  .join("") + chunk.source;
            }
          }
        }
      }
    }
  ]
});
