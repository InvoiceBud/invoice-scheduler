import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import postgres from "postgres";
import { Invoice } from "../types/invoice";

export class SchedulerController {
  private sql: postgres.Sql<{}>;

  constructor(fastify: FastifyInstance) {
    this.sql = fastify.sql;
  }

  async fetchUnpaidInvoices(request: FastifyRequest, reply: FastifyReply) {
    const invoiceId = "e95eae3a-7522-4094-83c1-71ac78856bd0";

    const invoices = await this.sql`
       select * from invoices 
      where id=${invoiceId} 
    `;  

    const invoice = invoices[0] as Invoice;

    // Code below commented out for testing purposes. 

    // const users = await this.sql`
    //   select * from users 
    //   where id=${userId}
    // `; 

    // const user = users[0] as UserData;

    // await EmailService.sendOverdueInvoiceMail(invoice, user);

    return reply
      .status(StatusCodes.OK)
      .send({ message: "All invoices", data: invoice });
  }
}
