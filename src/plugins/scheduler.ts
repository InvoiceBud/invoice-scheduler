import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { WORKER_DAILY_INVOICE_OVERDUE } from "../constants";

const scheduler: FastifyPluginAsync = async (fastify, opts) => {
  const boss = fastify.boss;

  boss.schedule(WORKER_DAILY_INVOICE_OVERDUE, "*/2 * * * *", null, {
    tz: "UTC",
  });
};

export default fp(scheduler);
