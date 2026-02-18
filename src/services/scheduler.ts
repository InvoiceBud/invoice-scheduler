import postgres from "postgres";

class SchedulerService {
  private constructor() {}

  public static async updateSentInvoiceToOverdueOnExpiryTime(sql: postgres.Sql<{}>) {
    return await sql`
      update invoices
      set status = 'overdue'
      WHERE status = 'sent' and "dueDate" < now()
    `;
  }
}

export default SchedulerService; 