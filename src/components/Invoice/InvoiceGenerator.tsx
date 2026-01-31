import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, Download, Printer, Mail, 
  Building2, User, Calendar, DollarSign 
} from 'lucide-react';
import { toast } from 'sonner';

interface Milestone {
  id: string;
  title: string;
  amount: number | null;
  status: string;
  completed_at?: string | null;
}

interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  projectTitle: string;
  milestones: Milestone[];
  notes: string;
}

interface InvoiceGeneratorProps {
  projectTitle: string;
  clientName: string;
  clientEmail?: string;
  milestones: Milestone[];
  currency?: string;
}

export const InvoiceGenerator = ({
  projectTitle,
  clientName,
  clientEmail = '',
  milestones,
  currency = 'USD',
}: InvoiceGeneratorProps) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    clientName,
    clientEmail,
    clientAddress: '',
    projectTitle,
    milestones: milestones.filter(m => m.status === 'approved' || m.status === 'paid'),
    notes: 'Thank you for your business!',
  });

  const total = invoiceData.milestones.reduce((sum, m) => sum + (m.amount || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a printable HTML version
    const invoiceHtml = generateInvoiceHtml(invoiceData, total, currency);
    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceData.invoiceNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Invoice downloaded!');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Invoice ${invoiceData.invoiceNumber} for ${invoiceData.projectTitle}`);
    const body = encodeURIComponent(
      `Dear ${invoiceData.clientName},\n\nPlease find attached the invoice for ${invoiceData.projectTitle}.\n\nTotal Amount: ${currency} ${total.toLocaleString()}\nDue Date: ${format(new Date(invoiceData.dueDate), 'MMMM d, yyyy')}\n\nThank you for your business!`
    );
    window.open(`mailto:${invoiceData.clientEmail}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="space-y-6">
      {/* Invoice Preview */}
      <Card className="print:shadow-none print:border-0" id="invoice-preview">
        <CardHeader className="print:pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">INVOICE</CardTitle>
              <p className="text-muted-foreground">{invoiceData.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">Fuke's Media</p>
              <p className="text-sm text-muted-foreground">VFX & Animation Studio</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dates & Client Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">BILL TO</Label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{invoiceData.clientName}</span>
                </div>
                {invoiceData.clientEmail && (
                  <p className="text-sm text-muted-foreground ml-6">{invoiceData.clientEmail}</p>
                )}
                {invoiceData.clientAddress && (
                  <p className="text-sm text-muted-foreground ml-6 whitespace-pre-line">
                    {invoiceData.clientAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2 md:text-right">
              <div className="flex md:justify-end items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Issue Date:</span>{' '}
                  {format(new Date(invoiceData.issueDate), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex md:justify-end items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Due Date:</span>{' '}
                  {format(new Date(invoiceData.dueDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project */}
          <div>
            <Label className="text-xs text-muted-foreground">PROJECT</Label>
            <p className="font-medium mt-1">{invoiceData.projectTitle}</p>
          </div>

          {/* Line Items */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Description</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                  <th className="text-right p-3 text-sm font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.milestones.map((milestone) => (
                  <tr key={milestone.id} className="border-t">
                    <td className="p-3">
                      <p className="font-medium">{milestone.title}</p>
                      {milestone.completed_at && (
                        <p className="text-xs text-muted-foreground">
                          Completed: {format(new Date(milestone.completed_at), 'MMM d, yyyy')}
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge variant={milestone.status === 'paid' ? 'default' : 'secondary'}>
                        {milestone.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right font-medium">
                      {currency} {(milestone.amount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/50 border-t">
                <tr>
                  <td colSpan={2} className="p-3 text-right font-bold">Total</td>
                  <td className="p-3 text-right font-bold text-lg">
                    {currency} {total.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          {invoiceData.notes && (
            <div>
              <Label className="text-xs text-muted-foreground">NOTES</Label>
              <p className="text-sm mt-1">{invoiceData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 print:hidden">
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download HTML
        </Button>
        <Button variant="outline" onClick={handlePrint} className="gap-2">
          <Printer className="w-4 h-4" />
          Print / Save PDF
        </Button>
        {invoiceData.clientEmail && (
          <Button variant="outline" onClick={handleEmail} className="gap-2">
            <Mail className="w-4 h-4" />
            Email Client
          </Button>
        )}
      </div>

      {/* Edit Form */}
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle className="text-lg">Edit Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={invoiceData.clientEmail}
                onChange={(e) => setInvoiceData({ ...invoiceData, clientEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={invoiceData.issueDate}
                onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="clientAddress">Client Address</Label>
            <Input
              id="clientAddress"
              value={invoiceData.clientAddress}
              onChange={(e) => setInvoiceData({ ...invoiceData, clientAddress: e.target.value })}
              placeholder="123 Street, City, Country"
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function generateInvoiceHtml(data: InvoiceData, total: number, currency: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice ${data.invoiceNumber}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .title { font-size: 28px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f5f5f5; }
    .total { font-size: 18px; font-weight: bold; }
    .notes { margin-top: 40px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">INVOICE</div>
      <div>${data.invoiceNumber}</div>
    </div>
    <div style="text-align: right">
      <strong>Fuke's Media</strong><br>
      VFX & Animation Studio
    </div>
  </div>
  
  <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
    <div>
      <strong>Bill To:</strong><br>
      ${data.clientName}<br>
      ${data.clientEmail || ''}<br>
      ${data.clientAddress || ''}
    </div>
    <div style="text-align: right">
      Issue Date: ${format(new Date(data.issueDate), 'MMM d, yyyy')}<br>
      Due Date: ${format(new Date(data.dueDate), 'MMM d, yyyy')}
    </div>
  </div>
  
  <div><strong>Project:</strong> ${data.projectTitle}</div>
  
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Status</th>
        <th style="text-align: right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${data.milestones.map(m => `
        <tr>
          <td>${m.title}</td>
          <td>${m.status}</td>
          <td style="text-align: right">${currency} ${(m.amount || 0).toLocaleString()}</td>
        </tr>
      `).join('')}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2" style="text-align: right"><strong>Total</strong></td>
        <td style="text-align: right" class="total">${currency} ${total.toLocaleString()}</td>
      </tr>
    </tfoot>
  </table>
  
  ${data.notes ? `<div class="notes">${data.notes}</div>` : ''}
</body>
</html>
  `;
}
