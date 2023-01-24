import type { NormalizedInputOptions, Plugin } from "rollup";
const WORKER_FLAG = "?worker";
const getResolveUrl = (path: string, URL = "URL") => `new ${URL}(${path}).href`;
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
        // 虚拟模块，导出文件的路径
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
      }
    },
    // 自定义import.meta.ROLLUP_FILE_URL_{referenceId}的生成，对cjs特殊处理,默认会以file:///开头
    resolveFileUrl({ relativePath, format }) {
      if (format === "cjs") {
        return getResolveUrl(
          `__dirname + '/${relativePath}'`,
          `(require('u' + 'rl').URL)`
        );
      }
    }
  };
}
export default rollupPluginWorker;
