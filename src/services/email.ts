import { format } from "date-fns";
import { Resend } from "resend";
import { INVOICE_EMAIL_FROM, VERIFICATION_EMAIL_FROM } from "../constants";
import { ClientData } from "../types/client";
import { EmailPayload, Invoice, UserData } from "../types/invoice";

class EmailService {
  private constructor() {}

  private static resend = new Resend(process.env.RESEND_API_KEY);

  public static async sendOverdueInvoiceMail(invoice: Invoice, user: UserData, client: ClientData) {
    const dueDate = format(invoice.dueDate, "PPPP");
    const sentAt = format(invoice.sentAt, "PPPP");

    const formattedTotal = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.invoiceCurrency,
    }).format(invoice.total);

    const { data: _data, error: _error } = await this.resend.emails.send({
      from: INVOICE_EMAIL_FROM,
      to: [`${client.email}`],
      subject: `Friendly reminder: Invoice ${invoice.number} is overdue`,
      template: {
        id: "invoice-overdue-template",
        variables: {
          NAME: client.contact_person,
          DUE_DATE: dueDate,
          INVOICE: invoice.number,
          TOTAL: formattedTotal,
          STATUS: invoice.status,
          SENT_AT: sentAt,
        },
      },
      replyTo: user.email,
    });
  }

  public static async sendInvoiceToClient(payload: EmailPayload, client: ClientData, user: UserData) {
    const formattedDueDate = format(payload.due_date, "PPPP");
    const invoiceFileName = `${payload.invoice}.pdf`;

    const total = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: payload.invoice_currency,
    }).format(payload.total);

    const { data: _data, error: _error } = await this.resend.emails.send({
      from: INVOICE_EMAIL_FROM,
      to: [`${client.email}`],
      subject: `Invoice ${payload.invoice} from BillGig`,
      template: {
        id: "invoice-payment",
        variables: {
          CLIENT_NAME: client.contact_person,
          DUE_DATE: formattedDueDate,
          FREELANCER_JOB_POSITION: user.job_role,
          FREELANCER_NAME: user.name,
          INVOICE_FILENAME: invoiceFileName,
          INVOICE_NUMBER: payload.invoice,
          TOTAL: total,
        },
      },
      replyTo: user.email,
      attachments: [
        {
          filename: invoiceFileName,
          path: payload.document,
        },
      ],
    });
  }

  public static async sendResetVerificationLink(payload: UserData, token: string) {
    const reset_link = `https://billgig.app/reset-password?token=${token}`; 

    const { data: _data, error: _error } = await this.resend.emails.send({
      from: VERIFICATION_EMAIL_FROM,
      subject: `Reset your BillGig account password`,
      to: payload.email,
      template: {
        id: "reset-link-verification",
        variables: {
          NAME: payload.name,
          RESET_LINK: reset_link,
        },
      },
    });
  }

  public static async sendResetValidationSuccessful(payload: UserData) {
    const { data: _data, error: _error } = await this.resend.emails.send({ 
      from: VERIFICATION_EMAIL_FROM, 
      subject: "Password changed successfully - BillGig", 
      to: payload.email, 
      template: { 
        id: "reset-password-success", 
        variables: { 
          NAME: payload.name
        }
      }
    })
  }
}

export default EmailService;
