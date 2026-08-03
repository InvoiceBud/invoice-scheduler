import { format } from "date-fns";
import { Resend } from "resend";
import { EMAIL_FROM } from "../constants";
import { ClientData } from "../types/client";
import { EmailPayload, Invoice, UserData } from "../types/invoice";

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
      from: "Invoicebud <invoices@invoicebud.subnownow.com>",
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

  public static async sendInvoiceToClient(payload: EmailPayload, client: ClientData, user: UserData) {
    const formattedDueDate = format(payload.due_date, "PPPP");
    const invoiceFileName = `${payload.invoice}.pdf`; 

    const { data: _data, error: _error } = await this.resend.emails.send({
      from: EMAIL_FROM,
      to: [`${client.email}`],
      subject: `Invoice ${payload.invoice} from InvoiceBud`,
      template: {
        id: "invoice-payment",
        variables: {
          CLIENT_NAME: client.contact_person,
          DUE_DATE: formattedDueDate,
          FREELANCER_JOB_POSITION: user.job_role,
          INVOICE_FILENAME: invoiceFileName, 
          INVOICE_NUMBER: payload.invoice, 
          TOTAL: payload.total
        },
      },
      replyTo: user.email, 
    });
  }
}

export default EmailService;