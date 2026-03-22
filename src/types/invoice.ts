export type Invoice = {
  id: string;
  number: string;
  client: string;
  total: number;
  status: string;
  viewed?: true;
  sentAt: Date;
  dueDate: Date;
  user_id: string;
  paidAt?: null;
  overdueDays?: number;
  invoiceCurrency: string;
  items?: InvoiceItem[];
  notes?: string;
  from?: InvoiceFrom;
  document?: string;
  totalInvoice?: number;
  paymentMethod: string | null;
};

type InvoiceItem = {
  id: string;
  description: string;
  qty: number;
  rate: number;
  amount?: number;
};

type InvoiceFrom = {
  name: string;
  company?: string;
  jobRole?: string;
  address?: string;
};

export type OverdueEmailData = {
  invoice_id: string;
  user_id: string;
};

export type UserData = {
  name: string;
  email: string;
};
