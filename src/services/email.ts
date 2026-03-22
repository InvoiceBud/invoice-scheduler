import { format } from "date-fns";
import { FastifyReply } from "fastify";
import { Resend } from "resend";
import { Invoice, UserData } from "../types/invoice";

class EmailService {
  private constructor() {}

  private static resend = new Resend(process.env.RESEND_API_KEY);

  public static async sendOverdueInvoiceMail(invoiceData: Invoice, userData: UserData) {
    // const formattedDueDate = format(invoice.dueDate, "PPPP");
    // const formattedSentAt = format(invoice.sentAt, "PPPP");

    try {
      // const { data, error } = await this.resend.emails.send({
      //   from: "Invoicebud <team@invoicebud.subnownow.com>",
      //   to: ["husseinmubarak500@gmail.com"],
      //   subject: "Invoice Overdue Email Notification",
      //   template: {
      //     id: "invoice-overdue-template",
      //     variables: {
      //       CLIENT: invoice.client,
      //       DUE_DATE: formattedDueDate,
      //       INVOICE: invoice.number,
      //       TOTAL: invoice.total,
      //       STATUS: invoice.status,
      //       SENT_AT: formattedSentAt,
      //     },
      //   },
      // });

      // if (error) {
      //   console.log(`Error sending email: ${error.message}`);
      // }

      // if (data) {
      //   console.log(`Email sent: ${data?.id}`);
      // }
    } catch (error) {
      console.log("Internal server error");
    }
  }
}

export default EmailService;
