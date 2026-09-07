import { supabase } from "../config/supabase";

async function getInvoiceSignedUrl(fileName: string) {
  const filePath = `invoices/${fileName}`;

  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_INVOICE_STORAGE!)
    .createSignedUrl(filePath, 7 * 60 * 60, { download: `${fileName}` });

  if (error) {
    throw error;
  }

  const url = data.signedUrl;
  return url;
}

export { getInvoiceSignedUrl };
