import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import {
  WORKER_CREATE_INVOICE,
  WORKER_DAILY_INVOICE_OVERDUE,
  WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION,
} from "../constants";

const queue: FastifyPluginAsync = async (fastify, opts) => {
  const boss = fastify.boss;

  await boss.createQueue(WORKER_DAILY_INVOICE_OVERDUE);

  await boss.createQueue(WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION);
  
  await boss.createQueue(WORKER_CREATE_INVOICE)
};

export default fp(queue);
