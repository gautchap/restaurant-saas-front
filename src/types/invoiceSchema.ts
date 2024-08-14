import { z } from "zod";

export const invoiceSchema = z.object({
    id: z.string(),
    total: z.coerce.number(),
    period_start: z.coerce.number(),
    paid: z.boolean(),
    hosted_invoice_url: z.string().url(),
    invoice_pdf: z.string().url(),
});

export const invoicesSchema = z.object({
    data: z.array(invoiceSchema),
});
