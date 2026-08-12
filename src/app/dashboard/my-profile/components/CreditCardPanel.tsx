'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, CreditCard, X, Eye, EyeOff } from 'lucide-react';

export interface SavedCard {
  id: string;
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  billingAddress: string;
  billingAddress2: string;
  billingCity: string;
  billingState: string;
  billingCountry: string;
  billingZip: string;
}

interface CreditCardPanelProps {
  cards: SavedCard[];
  onAddCard: (card: Omit<SavedCard, 'id'>) => void;
  onUpdateCard: (id: string, card: Omit<SavedCard, 'id'>) => void;
  onRemoveCard: (id: string) => void;
}

const EMPTY_FORM = { nameOnCard: '', cardNumber: '', expiry: '', cvv: '', billingAddress: '', billingAddress2: '', billingCity: '', billingState: '', billingCountry: '', billingZip: '' };

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function maskCardNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  const last4 = digits.slice(-4);
  return last4 ? `•••• •••• •••• ${last4}` : '•••• •••• •••• ••••';
}

export function CreditCardPanel({ cards, onAddCard, onUpdateCard, onRemoveCard }: CreditCardPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showCvv, setShowCvv] = useState(false);

  const startAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const startEdit = (card: SavedCard) => {
    setEditingId(card.id);
    setForm({ nameOnCard: card.nameOnCard, cardNumber: card.cardNumber, expiry: card.expiry, cvv: card.cvv, billingAddress: card.billingAddress, billingAddress2: card.billingAddress2, billingCity: card.billingCity, billingState: card.billingState, billingCountry: card.billingCountry, billingZip: card.billingZip });
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateCard(editingId, form);
    } else {
      onAddCard(form);
    }
    cancel();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold text-neutral-black flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-neutral-gray-medium" /> Credit / Debit Cards
        </h4>
        <button type="button" onClick={startAdd} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
          <Plus className="h-4 w-4" /> {cards.length === 0 ? 'Add Card' : 'Add Another Card'}
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-neutral-gray-light bg-white p-4 mb-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-black">{editingId ? 'Edit Card' : 'Add New Card'}</span>
            <button type="button" onClick={cancel} className="text-neutral-gray-medium hover:text-neutral-black cursor-pointer transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Cardholder Name <span className="text-red-600">*</span></label>
              <input type="text" value={form.nameOnCard} onChange={e => setForm(prev => ({ ...prev, nameOnCard: e.target.value }))} placeholder="Name on card" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Card Number <span className="text-red-600">*</span></label>
              <input type="text" inputMode="numeric" value={form.cardNumber} onChange={e => setForm(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))} placeholder="1234 5678 9012 3456" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Expiry Date <span className="text-red-600">*</span></label>
              <input type="text" inputMode="numeric" value={form.expiry} onChange={e => setForm(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))} placeholder="MM/YY" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-gray-dark mb-1">CVV <span className="text-red-600">*</span></label>
              <div className="relative">
                <input type={showCvv ? 'text' : 'password'} inputMode="numeric" value={form.cvv} onChange={e => setForm(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} placeholder="•••" className="w-full px-3 py-2 pr-10 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
                <button type="button" onClick={() => setShowCvv(prev => !prev)} title={showCvv ? 'Hide CVV' : 'Show CVV'} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-gray-medium hover:text-neutral-gray-dark cursor-pointer transition-colors">
                  {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-neutral-gray-light">
            <h5 className="text-sm font-semibold text-neutral-black mb-3">Billing Address</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Address Line 1 <span className="text-red-600">*</span></label>
                <input type="text" value={form.billingAddress} onChange={e => setForm(prev => ({ ...prev, billingAddress: e.target.value }))} placeholder="Street address, P.O. box, company name" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Address Line 2 <span className="text-neutral-gray-medium">(Optional)</span></label>
                <input type="text" value={form.billingAddress2} onChange={e => setForm(prev => ({ ...prev, billingAddress2: e.target.value }))} placeholder="Apartment, suite, unit, building, floor" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">City <span className="text-red-600">*</span></label>
                <input type="text" value={form.billingCity} onChange={e => setForm(prev => ({ ...prev, billingCity: e.target.value }))} placeholder="City" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">State / Province <span className="text-red-600">*</span></label>
                <input type="text" value={form.billingState} onChange={e => setForm(prev => ({ ...prev, billingState: e.target.value }))} placeholder="State or province" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Country <span className="text-red-600">*</span></label>
                <input type="text" value={form.billingCountry} onChange={e => setForm(prev => ({ ...prev, billingCountry: e.target.value }))} placeholder="Country" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Zip / Postal Code <span className="text-red-600">*</span></label>
                <input type="text" value={form.billingZip} onChange={e => setForm(prev => ({ ...prev, billingZip: e.target.value }))} placeholder="Zip or postal code" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={cancel} className="px-4 py-2 text-sm font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors">
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
              Save Card
            </button>
          </div>
        </div>
      )}

      {cards.length === 0 && !showForm && (
        <p className="text-sm text-neutral-gray-medium">No cards added yet. Click "Add Card" to add a payment card.</p>
      )}

      <div className="space-y-3">
        {cards.map(card => (
          <div key={card.id} className="flex items-center justify-between rounded-lg border border-neutral-gray-light bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-14 rounded-md bg-gradient-to-br from-brand-navy-900 to-brand-navy-700 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-black">{card.nameOnCard}</p>
                <p className="text-xs text-neutral-gray-medium">{maskCardNumber(card.cardNumber)} · Exp {card.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => startEdit(card)} title="Edit card" className="p-2 text-neutral-gray-dark hover:text-brand-navy-900 rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => onRemoveCard(card.id)} title="Delete card" className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}