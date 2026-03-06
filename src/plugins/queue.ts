import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { WORKER_DAILY_INVOICE_OVERDUE } from "../constants";

const queue: FastifyPluginAsync = async (fastify, opts) => {
  const boss = fastify.boss;

  boss.createQueue(WORKER_DAILY_INVOICE_OVERDUE);
};

export default fp(queue);
