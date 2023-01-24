# rollup-plugin-worker-thread

提供 rollup 对 nodejs 的 worker_threads 的支持，使用方法类似于`vite`的`?worker`语法

## 安装

```sh
npm i -D rollup-plugin-worker-thread
```

## 使用

worker.ts

```typescript
import { threadId } from "worker_threads";
async function task() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("(time)当前threadId:", threadId);
      resolve(void 0);
    }, 1500);
  });
}
task();
```

main.ts

```typescript
import { Worker } from "worker_threads";
import workPath from "./worker?worker"; // 使用?worker标识是一个worker文件
new Worker(workPath);
```
