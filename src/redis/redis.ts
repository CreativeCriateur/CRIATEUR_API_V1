import { Queue } from "bullmq";
import Redis from "ioredis";

const redisConnection = new Redis();

export const emailQueue = new Queue("emailQueue", {
  connection: redisConnection
});

export default redisConnection;
