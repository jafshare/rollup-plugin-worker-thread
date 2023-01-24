import type { NormalizedInputOptions, Plugin } from "rollup";
const WORKER_FLAG = "?worker";
/**
 * 提供rollup对nodejs的worker_threads的支持
 */
function rollupPluginWorker(): Plugin {
  let opts!: NormalizedInputOptions;
  return {
    name: "rollup-plugin-worker",
    buildStart(config) {
      opts = config;
    },
    resolveId(source, importer) {
      if (source.endsWith(WORKER_FLAG)) {
        // 基于importer获取实际的文件路径
        return this.resolve(
          source.slice(0, source.length - WORKER_FLAG.length),
          importer
        ).then((resolvedId) => resolvedId!.id + WORKER_FLAG);
      }
    },
    async load(id) {
      if (id.endsWith(WORKER_FLAG)) {
        const finialId = id.slice(0, id.length - WORKER_FLAG.length);
        const referenceId = this.emitFile({
          type: "chunk",
          id: finialId
        });
        // TODO 暂时使用import.meta.ROLLUP_FILE_URL_{referenceId}语法，后续使用自己的语法
        // 虚拟模块
        return `const originFilePath = import.meta.ROLLUP_FILE_URL_${referenceId};\nexport default originFilePath.slice(8);`;
      }
    }
  };
}
export default rollupPluginWorker;
