'use client';

import type { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';

export interface DonationProgram {
  title: string;
  desc: string;
  goal: number;
  icon: LucideIcon;
  iconBgClass: string;
  iconTextClass: string;
}

interface DonationModalProps {
  program: DonationProgram | null;
  onClose: () => void;
}

export default function DonationModal({ program, onClose }: DonationModalProps) {
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');

  if (!program) {
    return null;
  }

  const Icon = program.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 px-4 py-6 overflow-y-auto">
      <div className="mx-auto max-w-md rounded-xl bg-white text-gray-900 shadow-lg overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-4 py-3">
          <div className="flex gap-4">
            <div className={`mt-1 p-3 ${program.iconBgClass} rounded-xl h-fit `}>
              <Icon className={`w-4 lg:w-6 h-4 lg:h-6 ${program.iconTextClass}`} />
            </div>
            <div>
              <h2 className="text-sm lg:text-md font-semibold lg:font-bold">
                Make a donation to {program.title}
              </h2>
              <p className="mt-1 text-xs text-gray-600">
                Supporting: {program.title} - Goal ${program.goal.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close donation modal"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form
          className="space-y-3 py-4 px-6"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            <label htmlFor="donor-name" className="mb-1 block text-sm lg:text-base font-semibold text-gray-700">
              Name
            </label>
            <input
              id="donor-name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-6 py-2 lg:py-3 text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label htmlFor="donor-id" className="mb-1 block text-sm lg:text-base font-semibold text-gray-700">
              ID Tag
            </label>
            <input
              id="donor-id"
              type="text"
              placeholder="USR-NG-2026-0001"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-6 py-2 lg:py-3 text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label htmlFor="donation-currency" className="mb-1 block text-sm lg:text-base font-semibold text-gray-700">
              Currency *
            </label>
            <select
              id="donation-currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-2 lg:px-6 py-2 lg:py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
            >
              <option value="USD">USD - US Dollar ($)</option>
              <option value="NGN">NGN - Nigerian Naira (N)</option>
              <option value="GHS">GHS - Ghanaian Cedi (GHS)</option>
              <option value="KES">KES - Kenyan Shilling (KSh)</option>
              <option value="ZAR">ZAR - South African Rand (R)</option>
            </select>
            <p className="text-xs text-gray-500">
              Select your preferred currency for transaction
            </p>
          </div>

          <div>
            <label htmlFor="donation-amount" className="mb-1 block text-sm lg:text-base font-semibold text-gray-700">
              Amount *
            </label>
            <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
              <span className="grid w-12 place-items-center text-xl font-bold text-gray-400">
                {currency === 'USD' ? '$' : currency}
              </span>
              <input
                id="donation-amount"
                type="number"
                min="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
                className="min-w-0 flex-1 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-red-600 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-red-700"
          >
            Proceed to Paystack
          </button>

          <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-2 text-emerald-900">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-emerald-600 text-sm font-black text-white">
              PS
            </div>
            <div>
              <h3 className="font-semibold text-sm">Secured by Paystack</h3>
              <p className="text-[10px] lg:text-xs">
                You&apos;ll be redirected to Paystack&apos;s secure payment gateway to complete your donation.
              </p>
            </div>
          </div>

          <p className="text-start text-xs text-gray-500">
            All donations are tax-deductible where applicable. 30% of donations will be used by the network to internally facilitate the execution of these programs.
          </p>
        </form>
      </div>
    </div>
  );
}
