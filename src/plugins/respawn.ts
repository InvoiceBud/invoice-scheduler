// To respwan the server before running into inactivity mode
// so as to ensure persistence in running background jobs.

import { CronJob } from "cron";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const respawn: FastifyPluginAsync = async (fastify, opts) => {
  const job = new CronJob("0 */10 * * * *", () => {
    fastify.log.info("Server respawned successfully");
  });

  job.start();
};

export default fp(respawn);
