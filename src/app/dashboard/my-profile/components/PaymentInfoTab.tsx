'use client';

import { CreditCard, MapPin, Clock } from 'lucide-react';

interface PaymentInfoTabProps {
  paymentMethod: string; onPaymentMethodChange: (v: string) => void;
  billingAddress: string; onBillingAddressChange: (v: string) => void;
}

export function PaymentInfoTab(props: PaymentInfoTabProps) {
  const transactions = [
    { id: '#INV-2026-0042', date: 'April 5, 2026', description: 'Innovation Listing Fee', amount: '₦15,000', status: 'Completed' },
    { id: '#INV-2026-0038', date: 'March 22, 2026', description: 'Premium Membership', amount: '₦50,000', status: 'Completed' },
    { id: '#INV-2026-0029', date: 'March 10, 2026', description: 'Innovation Listing Fee', amount: '₦15,000', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Payment Info</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-neutral-gray-medium" /> Payment Methods
          </label>
          <select value={props.paymentMethod} onChange={e => props.onPaymentMethodChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900">
            <option value="">Select Payment Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit / Debit Card">Credit / Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-neutral-gray-medium" /> Billing Address
          </label>
          <input type="text" value={props.billingAddress} onChange={e => props.onBillingAddressChange(e.target.value)} placeholder="Enter billing address" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>

      <div className="pt-4">
        <h4 className="text-base font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-neutral-gray-medium" /> Transaction History
        </h4>
        <div className="rounded-lg border border-neutral-gray-light overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-bg-light border-b border-neutral-gray-light">
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Invoice ID</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Date</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Description</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Amount</th>
                <th className="text-center px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray-light">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-bg-light transition-colors">
                  <td className="px-4 py-3 font-medium text-neutral-black">{tx.id}</td>
                  <td className="px-4 py-3 text-neutral-gray-medium">{tx.date}</td>
                  <td className="px-4 py-3 text-neutral-gray-medium">{tx.description}</td>
                  <td className="px-4 py-3 text-right font-medium text-neutral-black">{tx.amount}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
