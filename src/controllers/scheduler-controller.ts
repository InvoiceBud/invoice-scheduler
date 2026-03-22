import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import postgres from "postgres";

export class SchedulerController {
  private sql: postgres.Sql<{}>;

  constructor(fastify: FastifyInstance) {
    this.sql = fastify.sql;
  }

  async fetchUnpaidInvoices(request: FastifyRequest, reply: FastifyReply) {
    const invoices = await this.sql`
    select * from invoices 
    where status = 'sent'
    and "dueDate" < now()
    order by id asc`;

    // await EmailService.sendOverdueInvoiceMail(reply);

    return reply
      .status(StatusCodes.OK)
      .send({ message: "All invoices", data: invoices });
  }
}
