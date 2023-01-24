import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import worker from "rollup-plugin-worker";
export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "commonjs"
  },
  plugins: [
    nodeResolve({
      // 仅作为模块导入
      modulesOnly: true,
      preferBuiltins: false
    }),
    typescript(),
    worker()
  ]
});
