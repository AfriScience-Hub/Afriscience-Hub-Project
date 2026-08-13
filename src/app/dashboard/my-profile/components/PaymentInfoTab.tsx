'use client';

import { CreditCard, Landmark, Wallet, Smartphone, Clock, CheckCircle2 } from 'lucide-react';
import { CreditCardPanel, type SavedCard } from './CreditCardPanel';

interface PaymentInfoTabProps {
  paymentMethod: string; onPaymentMethodChange: (v: string) => void;
  cards: SavedCard[];
  onAddCard: (card: Omit<SavedCard, 'id'>) => void;
  onUpdateCard: (id: string, card: Omit<SavedCard, 'id'>) => void;
  onRemoveCard: (id: string) => void;
}

const PAYMENT_METHODS = [
  { key: 'Bank Transfer', label: 'Bank Transfer', icon: Landmark },
  { key: 'Credit / Debit Card', label: 'Credit / Debit Card', icon: CreditCard },
  { key: 'PayPal', label: 'PayPal', icon: Wallet },
  { key: 'Mobile Money', label: 'Mobile Money', icon: Smartphone },
] as const;

export function PaymentInfoTab(props: PaymentInfoTabProps) {
  const transactions = [
    { id: '#INV-2026-0042', date: 'April 5, 2026', description: 'Innovation Listing Fee', amount: '₦15,000', status: 'Completed' },
    { id: '#INV-2026-0038', date: 'March 22, 2026', description: 'Premium Membership', amount: '₦50,000', status: 'Completed' },
    { id: '#INV-2026-0029', date: 'March 10, 2026', description: 'Innovation Listing Fee', amount: '₦15,000', status: 'Pending' },
  ];

  const selectedMethod = props.paymentMethod
    ? PAYMENT_METHODS.find(m => m.key === props.paymentMethod)
    : undefined;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Payment Info</h3>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-3">Payment Methods</label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAYMENT_METHODS.map(method => {
            const selected = props.paymentMethod === method.key;
            const Icon = method.icon;
            return (
              <button
                key={method.key}
                type="button"
                onClick={() => props.onPaymentMethodChange(method.key)}
                className={`relative rounded-xl border-2 p-4 cursor-pointer text-center transition-all ${
                  selected
                    ? 'border-brand-navy-900 bg-brand-navy-50'
                    : 'border-neutral-gray-light bg-white hover:border-neutral-gray-medium'
                }`}
              >
                <Icon className={`mx-auto h-6 w-6 mb-2 ${selected ? 'text-brand-navy-900' : 'text-neutral-gray-medium'}`} />
                <span className={`text-sm font-medium ${selected ? 'text-brand-navy-900' : 'text-neutral-gray-dark'}`}>{method.label}</span>
                {selected && (
                  <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-brand-navy-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {props.paymentMethod === 'Credit / Debit Card' && (
        <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4">
          <CreditCardPanel
            cards={props.cards}
            onAddCard={props.onAddCard}
            onUpdateCard={props.onUpdateCard}
            onRemoveCard={props.onRemoveCard}
          />
        </div>
      )}

      {selectedMethod && props.paymentMethod !== 'Credit / Debit Card' && (
        <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4">
          <p className="text-sm text-neutral-gray-medium">
            Payment details for {selectedMethod.label} will be available soon.
          </p>
        </div>
      )}

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
