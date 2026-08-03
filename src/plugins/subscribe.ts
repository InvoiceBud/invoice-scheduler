import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Events, WORKER_CREATE_INVOICE } from "../constants";

const subscribe: FastifyPluginAsync = async (fastify, _opts) => {
  const boss = fastify.boss;

  const eventCreateInvoice = Events.Invoice.create_invoice;

  await boss.subscribe(eventCreateInvoice, WORKER_CREATE_INVOICE);
};

export default fp(subscribe);
