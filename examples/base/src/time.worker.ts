import { threadId } from "worker_threads";
async function task() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("(time)当前threadId:", threadId);
      resolve(undefined);
    }, 1500);
  });
}
task();
