import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export class SchedulerController {
  static async fetchInvoices(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(StatusCodes.OK).send({ message: "All invoices" });
  }
}
