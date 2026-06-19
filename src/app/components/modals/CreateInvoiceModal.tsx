'use client';

import { useState } from 'react';
import { X, Plus, Trash2, User, FileText, Calendar, DollarSign, AlertCircle, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../../lib/utils';
import { toast } from 'sonner';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock clients - in real app, this would be fetched from backend based on service provider's interactions
const MOCK_CLIENTS = [
  { id: '1', name: 'Amara Farms Ltd', email: 'contact@amarafarms.com', recentInteraction: 'Solar Installation Inquiry' },
  { id: '2', name: 'Kwame Agro Cooperative', email: 'info@kwameagro.org', recentInteraction: 'AgriTech Training Request' },
  { id: '3', name: 'StartUp Accelerator Hub', email: 'partnerships@startupaccel.com', recentInteraction: 'Mentorship Program Interest' },
  { id: '4', name: 'Dr. Wanjiku Muthoni', email: 'w.muthoni@research.ac.ke', recentInteraction: 'Partnership Discussion' },
  { id: '5', name: 'TechVentures Africa', email: 'hello@techventures.co.za', recentInteraction: 'Innovation Consultation' },
];

export function CreateInvoiceModal({ isOpen, onClose }: CreateInvoiceModalProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) {
      toast.error('Invoice must have at least one item');
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate amount if quantity or rate changes
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.075; // 7.5% VAT
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!selectedClient) {
      toast.error('Please select a client');
      return;
    }
    if (!dueDate) {
      toast.error('Please set a due date');
      return;
    }
    if (items.some(item => !item.description.trim())) {
      toast.error('All items must have a description');
      return;
    }
    if (items.some(item => item.quantity <= 0 || item.rate <= 0)) {
      toast.error('All items must have valid quantity and rate');
      return;
    }

    const client = MOCK_CLIENTS.find(c => c.id === selectedClient);
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

    toast.success(
      <div>
        <p className="font-bold">Invoice Created Successfully!</p>
        <p className="text-xs mt-1">Invoice {invoiceNumber} sent to {client?.name}</p>
      </div>
    );

    handleClose();
  };

  const handleClose = () => {
    setSelectedClient('');
    setInvoiceDate(new Date().toISOString().split('T')[0]);
    setDueDate('');
    setNotes('');
    setItems([{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }]);
    onClose();
  };

  if (!isOpen) return null;

  const selectedClientData = MOCK_CLIENTS.find(c => c.id === selectedClient);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">Create Invoice</h2>
            <p className="text-sm text-white/70 mt-1">Generate an invoice for your client</p>
          </div>
          <button
            onClick={handleClose}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Info Banner */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">For Service Providers Only</p>
              <p className="text-xs text-blue-800 mt-1">
                Create and send invoices to clients you've communicated with through the platform. Select a client from your recent interactions below.
              </p>
            </div>
          </div>

          {/* Client Selection */}
          <div>
            <label className="block text-sm font-bold text-neutral-black mb-2">
              Select Client <span className="text-brand-red-600">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all appearance-none bg-white"
                required
              >
                <option value="">Choose a client from your recent interactions...</option>
                {MOCK_CLIENTS.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.recentInteraction}
                  </option>
                ))}
              </select>
            </div>
            {selectedClientData && (
              <div className="mt-2 p-3 rounded-lg bg-neutral-bg-light border border-neutral-gray-light">
                <p className="text-sm font-medium text-neutral-black">{selectedClientData.name}</p>
                <p className="text-xs text-neutral-gray-medium">{selectedClientData.email}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">
                  Recent: <span className="font-medium text-brand-navy-900">{selectedClientData.recentInteraction}</span>
                </p>
              </div>
            )}
          </div>

          {/* Date Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-neutral-black mb-2">
                Invoice Date <span className="text-brand-red-600">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-black mb-2">
                Due Date <span className="text-brand-red-600">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={invoiceDate}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-neutral-black">
                Invoice Items <span className="text-brand-red-600">*</span>
              </label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddItem}
                className="text-brand-navy-900"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="p-4 rounded-xl border border-neutral-gray-light bg-neutral-bg-light/50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-neutral-gray-medium uppercase">Item {index + 1}</p>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {/* Description */}
                    <div>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        placeholder="Service or product description"
                        className="w-full px-4 py-2.5 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                        required
                      />
                    </div>

                    {/* Quantity, Rate, Amount */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-neutral-gray-medium mb-1.5">Quantity</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-gray-medium mb-1.5">Rate (₦)</label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-gray-medium mb-1.5">Amount (₦)</label>
                        <div className="px-3 py-2 rounded-lg bg-neutral-bg-light border border-neutral-gray-light font-bold text-neutral-black">
                          {item.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="rounded-xl border border-neutral-gray-light bg-gradient-to-br from-neutral-bg-light to-white p-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-gray-dark">Subtotal</span>
                <span className="font-medium text-neutral-black">
                  ₦{calculateSubtotal().toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-gray-dark">Tax (7.5% VAT)</span>
                <span className="font-medium text-neutral-black">
                  ₦{calculateTax().toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-gray-light flex justify-between">
                <span className="font-bold text-neutral-black">Total Amount</span>
                <span className="text-xl font-bold text-brand-navy-900">
                  ₦{calculateTotal().toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-neutral-black mb-2">
              Notes <span className="text-neutral-gray-medium text-xs font-normal">(Optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes, payment terms, or special instructions..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-neutral-gray-light">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-brand-red-600 hover:bg-brand-red-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Invoice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
