import { Worker } from "worker_threads";

import timePath from "./time.worker?worker";
import loopPath from "./loop.worker?worker";
const w1 = new Worker(timePath);
const w2 = new Worker(timePath);
const w3 = new Worker(loopPath);
const w4 = new Worker(loopPath);
const w5 = new Worker(loopPath);
