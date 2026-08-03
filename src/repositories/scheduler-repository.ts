import { FastifyInstance } from "fastify";
import postgres from "postgres";
import { ClientData } from "../types/client";
import { Invoice, UserData } from "../types/invoice";

export class SchedulerRepository {
  private sql: postgres.Sql<{}>;

  constructor(fastify: FastifyInstance) {
    this.sql = fastify.sql;
  }

  public async updateSentInvoiceToOverdueOnExpiryTime(): Promise<Invoice[]> {
    // Refactor this code
    // return only data that is necessary
    return await this.sql`
      update invoices
      set status = 'overdue'
      WHERE status = 'sent' and "dueDate" < now()
      RETURNING * 
    `;
  }

  public async fetchInvoice(id: string): Promise<Invoice> {
    const invoices = await this.sql`
      SELECT * FROM invoices 
      WHERE id=${id} 
    `;

    const invoice = invoices[0] as Invoice;
    return invoice;
  }

  public async fetchUser(id: string): Promise<UserData> {
    const users = await this.sql`
      SELECT * FROM users 
      WHERE id=${id}
    `;

    const user = users[0] as UserData;
    return user;
  }

  public async fetchClient(data: string): Promise<ClientData> {
    const client = await this.sql`
      SELECT contact_person, email 
      FROM clients
      WHERE company_name=${data}
    `;

    const clientData = client[0] as ClientData;
    return clientData;
  }
}
