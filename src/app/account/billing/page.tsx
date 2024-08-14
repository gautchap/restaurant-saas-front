import { getInvoices } from "@/actions/invoices";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Check, Download, X } from "lucide-react";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
};
export default async function BillingPage() {
    const invoices = await getInvoices();

    const totalInvoices = invoices.data.reduce(function (accumulator, invoice) {
        if (!invoice.paid) return accumulator;
        return accumulator + invoice.total;
    }, 0);

    return (
        <Table>
            <TableCaption>
                {invoices.data.length === 0 ? <span>Aucune facture</span> : <span>Liste des factures</span>}
            </TableCaption>
            <TableHeader>
                <TableRow className="group">
                    <TableHead title="date">Date</TableHead>
                    <TableHead title="price">Montant TTC</TableHead>
                    <TableHead title="status">Statut</TableHead>
                    <TableHead className="text-end" title="options">
                        Options
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.data.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{new Date(invoice.period_start * 1000).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>{formatCurrency(invoice.total / 100)}</TableCell>
                        <TableCell>
                            {invoice.paid ? (
                                <Badge className="gap-1 bg-green-500 hover:bg-green-500/80">
                                    <Check
                                        strokeWidth={4}
                                        size={12}
                                        className="rounded-full bg-white p-px text-green-500"
                                    />
                                    Payée
                                </Badge>
                            ) : (
                                <Badge variant="destructive" className="gap-1">
                                    <X
                                        strokeWidth={4}
                                        size={12}
                                        className="rounded-full bg-white p-px text-destructive"
                                    />
                                    Annulée
                                </Badge>
                            )}
                        </TableCell>
                        <TableCell className="flex items-center justify-end">
                            <Button asChild variant="link">
                                <a target="_blank" href={invoice.hosted_invoice_url}>
                                    Consulter en ligne
                                </a>
                            </Button>
                            <Button asChild variant="ghost" size="icon" name="download">
                                <a href={invoice.invoice_pdf}>
                                    <Download />
                                </a>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell>{formatCurrency(totalInvoices / 100)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
