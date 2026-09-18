'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Landmark, Wallet, Smartphone, CheckCircle2 } from 'lucide-react';
import { CreditCardPanel, type SavedCard } from './CreditCardPanel';
import { Field, SectionCard } from './FieldDisplay';
import { AshWalletModal } from './AshWalletModal';
import { AshWalletTopupModal } from './AshWalletTopupModal';
import { AshWalletSection } from './AshWalletSection';
import { TransactionHistory } from './TransactionHistory';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWalletBalance, fetchWalletHistory } from '@/store/walletSlice';
import { getCurrencyForCountry } from '../walletUtils';

interface PaymentInfoTabProps {
  isEditing: boolean;
  paymentMethod: string;
  onPaymentMethodChange: (v: string) => void;
  cards: SavedCard[];
  onAddCard: (card: Omit<SavedCard, 'id'>) => void;
  onUpdateCard: (id: string, card: Omit<SavedCard, 'id'>) => void;
  onRemoveCard: (id: string) => void;
}

const PAYMENT_METHODS = [
  { key: 'Bank Transfer', label: 'Bank Transfer', icon: Landmark },
  { key: 'Credit / Debit Card', label: 'Credit / Debit Card', icon: CreditCard },
  { key: 'ASH Wallet', label: 'ASH Wallet', icon: Wallet },
  { key: 'Mobile Money', label: 'Mobile Money', icon: Smartphone },
] as const;

function maskCardNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  const last4 = digits.slice(-4);
  return last4 ? `\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${last4}` : '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022';
}

function PaymentDisplay(props: PaymentInfoTabProps & { onOpenCreateWallet: () => void; onOpenTopup: () => void }) {
  const { paymentMethod, cards, onOpenCreateWallet, onOpenTopup } = props;
  const selectedMethod = paymentMethod
    ? PAYMENT_METHODS.find((m) => m.key === paymentMethod)
    : undefined;
  const isWallet = paymentMethod === 'ASH Wallet';

  return (
    <div className="space-y-6">
      <SectionCard title="Payment Method">
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Preferred Method"
            value={selectedMethod ? selectedMethod.label : 'Not set'}
          />
        </div>
        {paymentMethod === 'Credit / Debit Card' && cards.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-neutral-gray-medium">Saved Cards</p>
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex items-center gap-3 rounded-lg border border-neutral-gray-light p-3 bg-white"
              >
                <CreditCard className="h-5 w-5 text-brand-navy-900" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-black">
                    {maskCardNumber(card.cardNumber)}
                  </p>
                  <p className="text-xs text-neutral-gray-medium">
                    Expires {card.expiry}
                  </p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            ))}
          </div>
        )}
        {isWallet && (
          <div className="mt-4">
            <AshWalletSection onOpenCreateWallet={onOpenCreateWallet} onOpenTopup={onOpenTopup} />
          </div>
        )}
      </SectionCard>

      <TransactionHistory filter={isWallet ? 'wallet' : 'general'} />
    </div>
  );
}

function PaymentForm(props: PaymentInfoTabProps & { onOpenCreateWallet: () => void; onOpenTopup: () => void }) {
  const {
    paymentMethod,
    onPaymentMethodChange,
    cards,
    onAddCard,
    onUpdateCard,
    onRemoveCard,
    onOpenCreateWallet,
    onOpenTopup,
  } = props;

  const selectedMethod = paymentMethod
    ? PAYMENT_METHODS.find((m) => m.key === paymentMethod)
    : undefined;
  const isWallet = paymentMethod === 'ASH Wallet';

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Payment Info</h3>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-3">
          Payment Methods
        </label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAYMENT_METHODS.map((method) => {
            const selected = paymentMethod === method.key;
            const Icon = method.icon;
            const btnClass = selected
              ? 'border-brand-navy-900 bg-brand-navy-50'
              : 'border-neutral-gray-light bg-white hover:border-neutral-gray-medium';
            return (
              <button
                key={method.key}
                type="button"
                onClick={() => {
                  onPaymentMethodChange(method.key);
                  if (method.key === 'ASH Wallet') onOpenCreateWallet();
                }}
                className={`relative rounded-xl border-2 p-4 cursor-pointer text-center transition-all ${btnClass}`}
              >
                <Icon
                  className={`mx-auto h-6 w-6 mb-2 ${
                    selected ? 'text-brand-navy-900' : 'text-neutral-gray-medium'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    selected ? 'text-brand-navy-900' : 'text-neutral-gray-dark'
                  }`}
                >
                  {method.label}
                </span>
                {selected && (
                  <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-brand-navy-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {paymentMethod === 'Credit / Debit Card' && (
        <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4">
          <CreditCardPanel
            cards={cards}
            onAddCard={onAddCard}
            onUpdateCard={onUpdateCard}
            onRemoveCard={onRemoveCard}
          />
        </div>
      )}

      {isWallet && (
        <AshWalletSection onOpenCreateWallet={onOpenCreateWallet} onOpenTopup={onOpenTopup} />
      )}

      {selectedMethod && !isWallet && paymentMethod !== 'Credit / Debit Card' && (
        <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4">
          <p className="text-sm text-neutral-gray-medium">
            Payment details for {selectedMethod.label} will be available soon.
          </p>
        </div>
      )}

      <TransactionHistory filter={isWallet ? 'wallet' : 'general'} />
    </div>
  );
}

export function PaymentInfoTab(props: PaymentInfoTabProps) {
  const dispatch = useAppDispatch();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [topupModalOpen, setTopupModalOpen] = useState(false);
  const walletCurrency = useAppSelector((s) => s.wallet.wallet?.currency);
  const detectedCurrency = useAppSelector((s) =>
    s.wallet.detect?.details?.country_code ? getCurrencyForCountry(s.wallet.detect.details.country_code) : 'USD'
  );

  useEffect(() => {
    dispatch(fetchWalletBalance());
    dispatch(fetchWalletHistory());
  }, [dispatch]);

  const subProps = {
    ...props,
    onOpenCreateWallet: () => setWalletModalOpen(true),
    onOpenTopup: () => setTopupModalOpen(true),
  };

  return (
    <>
      {props.isEditing ? <PaymentForm {...subProps} /> : <PaymentDisplay {...subProps} />}
      <AshWalletModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
      <AshWalletTopupModal open={topupModalOpen} currency={walletCurrency || detectedCurrency} onClose={() => setTopupModalOpen(false)} />
    </>
  );
}