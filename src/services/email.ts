import { format } from "date-fns";
import { Resend } from "resend";
import { Invoice, UserData } from "../types/invoice";

class EmailService {
  private constructor() {}

  private static resend = new Resend(process.env.RESEND_API_KEY);

  public static async sendOverdueInvoiceMail(invoice: Invoice, user: UserData) {
    const formattedDueDate = format(invoice.dueDate, "PPPP");
    const formattedSentAt = format(invoice.sentAt, "PPPP");

    const formattedTotal = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.invoiceCurrency,
    }).format(invoice.total);
    
    const { data: _data, error: _error } = await this.resend.emails.send({
      from: "Invoicebud <team@invoicebud.subnownow.com>",
      to: [`${user.email}`],
      subject: "Invoice Overdue Email Notification",
      template: {
        id: "invoice-overdue-template",
        variables: {
          NAME: user.name,
          CLIENT: invoice.client,
          DUE_DATE: formattedDueDate,
          INVOICE: invoice.number,
          TOTAL: formattedTotal,
          STATUS: invoice.status,
          SENT_AT: formattedSentAt,
        },
      },
    });
  }
}

export default EmailService;
