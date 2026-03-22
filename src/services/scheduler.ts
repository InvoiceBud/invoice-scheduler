import postgres from "postgres";
import { Invoice, OverdueEmailData, UserData } from "../types/invoice";
import { FastifyInstance } from "fastify";
import EmailService from "./email";

class SchedulerService {
  private sql: postgres.Sql<{}>;

  constructor(fastify: FastifyInstance) {
    this.sql = fastify.sql;
  }

  public async updateSentInvoiceToOverdueOnExpiryTime(): Promise<Invoice[]> {
    return await this.sql`
      update invoices
      set status = 'overdue'
      WHERE status = 'sent' and "dueDate" < now()
      RETURNING * 
    `;
  }

  public async invoiceForEmailNotification(data: OverdueEmailData) {
    const invoice = await this.fetchInvoice(data.invoice_id);
    const user = await this.fetchUser(data.user_id);

    return await EmailService.sendOverdueInvoiceMail(invoice, user);
  }

  private async fetchInvoice(id: string): Promise<Invoice> {
    const invoice = await this.sql`
      select * from invoices 
      where id=${id} 
    `;

    return invoice as unknown as Invoice;
  }

  private async fetchUser(id: string): Promise<UserData> {
    const user = await this.sql`
      select * from users 
      where id=${id}
    `;
    return user as unknown as UserData; 
  }
}

export default SchedulerService;
