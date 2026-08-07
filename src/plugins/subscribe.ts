import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Events, WORKER_CREATE_INVOICE, WORKER_FORGOT_PASSWORD_VERIFICATION } from "../constants";

const subscribe: FastifyPluginAsync = async (fastify, _opts) => {
  const boss = fastify.boss;

  const eventCreateInvoice = Events.Invoice.create_invoice;
  const eventForgotPasswordVerification = Events.Auth.forgot_password_verification; 

  await boss.subscribe(eventCreateInvoice, WORKER_CREATE_INVOICE);

  await boss.subscribe(eventForgotPasswordVerification, WORKER_FORGOT_PASSWORD_VERIFICATION)
};

export default fp(subscribe);
