import { threadId } from "worker_threads";
function loop() {
  console.log("(loop)当前threadId:", threadId);
  const limit = 100000000;
  let count = 0;
  while (count < limit) {
    count += 1;
  }
  console.log("count:", count);
}
loop();
