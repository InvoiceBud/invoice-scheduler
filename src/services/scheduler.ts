import postgres from "postgres";
import { Invoice, OverdueEmailData } from "../types/invoice";
import { FastifyInstance } from "fastify";

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
    const invoiceData = await this.fetchInvoiceData(data.invoice_id);
    const userData = await this.fetchUserData(data.user_id)

    
  }

  private async fetchInvoiceData(id: string) {
    return await this.sql``;
  }

  private async fetchUserData(id: string) { 
    return await this.sql``; 
  }
}

export default SchedulerService;
