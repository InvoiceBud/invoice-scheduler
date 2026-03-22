import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import postgres from "postgres";

export class SchedulerController {
  private sql: postgres.Sql<{}>;

  constructor(fastify: FastifyInstance) {
    this.sql = fastify.sql;
  }

  async fetchUnpaidInvoices(request: FastifyRequest, reply: FastifyReply) {
    // const invoices = await this.sql`
    // select * from invoices 
    // where status = 'sent'
    // and "dueDate" < now()
    // order by id asc`;
    const id = "e95eae3a-7522-4094-83c1-71ac78856bd0"

    const invoice = await this.sql`
       select * from invoices 
      where id=${id} 
    `; 

    // await EmailService.sendOverdueInvoiceMail(reply);

    return reply
      .status(StatusCodes.OK)
      .send({ message: "All invoices", data: invoice });
  }
}
