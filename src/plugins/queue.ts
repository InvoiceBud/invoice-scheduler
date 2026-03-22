import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import {
  WORKER_DAILY_INVOICE_OVERDUE,
  WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION,
} from "../constants";

const queue: FastifyPluginAsync = async (fastify, opts) => {
  const boss = fastify.boss;

  boss.createQueue(WORKER_DAILY_INVOICE_OVERDUE);

  boss.createQueue(WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION);
};

export default fp(queue);
