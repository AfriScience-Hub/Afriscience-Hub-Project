'use client';

import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { CAUSES, CURRENCIES } from '../data';

interface DonationModalProps {
  show: boolean;
  selectedCause: string | null;
  setSelectedCause: (id: string | null) => void;
  formData: { currency: string; amount: string };
  setFormData: (data: { currency: string; amount: string }) => void;
  isAuthenticated: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const generateRefNo = () => {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
  return `DON-${year}-${num}`;
};

export function DonationModal({
  show, selectedCause, setSelectedCause, formData, setFormData,
  isAuthenticated, onClose, onSubmit,
}: DonationModalProps) {
  if (!show) return null;

  const selectedCurrency = CURRENCIES.find(c => c.code === formData.currency);
  const selectedCauseData = selectedCause ? CAUSES.find(c => c.id === selectedCause) : null;
  const referenceNo = generateRefNo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-gray-light px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-neutral-black">
              {selectedCauseData ? `Make a donation to ${selectedCauseData.title}` : 'Make a Donation'}
            </h3>
            {selectedCauseData && (
              <p className="text-xs text-slate-500 mt-0.5">{selectedCauseData.emoji} Supporting: {selectedCauseData.title}</p>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-neutral-black transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {!selectedCause && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Select a Program (Optional)</label>
              <select
                value={selectedCause || ''}
                onChange={(e) => setSelectedCause(e.target.value || null)}
                className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white"
              >
                <option value="">General Support</option>
                {CAUSES.map((cause) => (
                  <option key={cause.id} value={cause.id}>{cause.emoji} {cause.title}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Reference No</label>
            <input
              type="text"
              value={referenceNo}
              disabled
              className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm bg-brand-red-50 text-brand-red-700 font-semibold cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">Reference No is automatically generated and registered on our database.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Name</label>
            <input
              type="text"
              value={isAuthenticated ? 'John Doe' : ''}
              disabled
              className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm bg-neutral-bg-light text-slate-400 cursor-not-allowed"
              placeholder={!isAuthenticated ? 'Please log in' : 'Auto-generated'}
            />
            {!isAuthenticated && (
              <p className="text-xs text-amber-600 mt-1">Please log in to donate</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">ID Tag</label>
            <input
              type="text"
              value={isAuthenticated ? 'USR-NG-2026-0001' : ''}
              disabled
              className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm bg-neutral-bg-light text-slate-400 cursor-not-allowed"
              placeholder={!isAuthenticated ? 'Please log in' : 'Auto-generated'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Currency *</label>
            <select
              required
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">Select your preferred currency for transaction</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Amount *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                {selectedCurrency?.symbol}
              </span>
              <input
                required
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 text-neutral-black focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600"
              />
            </div>
            <p className="text-xs text-red-700 mt-1">Donations of $500+ will be featured in our &quot;Annual Donor Magazine&quot;</p>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-brand-red-600 hover:bg-brand-red-700 text-base"
            disabled={!isAuthenticated}
          >
            {isAuthenticated ? 'Proceed to Paystack' : 'Log in to Donate'}
          </Button>

          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-xs">
                PS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-emerald-900">Secured by Paystack</p>
                <p className="text-[10px] text-emerald-700 mt-0.5">
                  You'll be redirected to Paystack's secure payment gateway to complete your donation.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center">
            All donations are tax-deductible where applicable. 30% of donations will be used by the network to internally facilitate the execution of these programs.
          </p>
        </form>
      </div>
    </div>
  );
}
