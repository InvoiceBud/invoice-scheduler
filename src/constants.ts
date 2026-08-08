export const RoutePaths = {
  FETCH_ALL_INVOICES: "/invoices/all",
};

export const WORKER_DAILY_INVOICE_OVERDUE = "daily-overdue-scan";
export const WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION = "overdue-email-notification";
export const WORKER_CREATE_INVOICE = "create-invoice";
export const WORKER_FORGOT_PASSWORD_VERIFICATION = "forgot-password-verification";
export const WORKER_RESET_PASSWORD_SUCCESSFUL = "reset-password-successful";

export const INVOICE_EMAIL_FROM = "Invoicebud <invoices@invoicebud.app>";
export const VERIFICATION_EMAIL_FROM = "Invoicebud <team@invoicebud.app>";

export const Events = {
  Invoice: {
    create_invoice: "invoice.create",
  },
  Auth: {
    forgot_password_verification: "Auth:password_verification",
    reset_password_successful: "Auth:reset_password_successful",
  },
};
