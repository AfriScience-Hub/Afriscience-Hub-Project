'use client';

import { useState } from 'react';
import { X, Zap, CreditCard, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../../lib/utils';
import { toast } from 'sonner';

interface BoostVotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestantName: string;
  contestantId: string;
  onBoostSuccess: (contestantId: string, votesAdded: number) => void;
}

const BOOST_PACKAGES = [
  { id: 'boost-10', votes: 10, price: 1, popular: false },
  { id: 'boost-50', votes: 50, price: 5, popular: false },
  { id: 'boost-100', votes: 100, price: 10, popular: false },
  { id: 'boost-200', votes: 200, price: 20, popular: false },
  { id: 'boost-550', votes: 550, price: 50, popular: true },
  { id: 'boost-1200', votes: 1200, price: 100, popular: false },
];

export function BoostVotesModal({
  isOpen,
  onClose,
  contestantName,
  contestantId,
  onBoostSuccess
}: BoostVotesModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleProceedToPayment = () => {
    const pkg = BOOST_PACKAGES.find(p => p.id === selectedPackage);
    if (!pkg) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onBoostSuccess(contestantId, pkg.votes);
      toast.success(`Successfully added ${pkg.votes} votes for ${contestantName}!`);
      onClose();
      setSelectedPackage(null);
    }, 1500);
  };

  const selectedPkg = BOOST_PACKAGES.find(p => p.id === selectedPackage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-gray-light bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-black">Boost Votes</h2>
              <p className="text-sm text-neutral-gray-medium">Support {contestantName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-white/50 transition-colors"
            disabled={isProcessing}
          >
            <X className="h-5 w-5 text-neutral-gray-dark" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Info Banner */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">How Boost Votes Work</p>
              <p className="text-xs text-blue-700 mt-1">
                Purchase additional votes to support your favorite contestant. All boosted votes are immediately added to their total count and help improve their ranking.
              </p>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {BOOST_PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                disabled={isProcessing}
                className={cn(
                  "relative flex flex-col p-5 rounded-xl border-2 transition-all text-left",
                  selectedPackage === pkg.id
                    ? "border-brand-red-600 bg-brand-red-50 shadow-lg"
                    : "border-neutral-gray-light hover:border-brand-red-300 hover:shadow-md",
                  isProcessing && "opacity-50 cursor-not-allowed"
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold uppercase shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className={cn(
                      "h-5 w-5",
                      selectedPackage === pkg.id ? "text-brand-red-600" : "text-amber-500"
                    )} />
                    <span className="text-2xl font-black text-neutral-black">{pkg.votes}</span>
                  </div>
                  {selectedPackage === pkg.id && (
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-red-600">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                <p className="text-sm font-medium text-neutral-gray-dark mb-1">
                  {pkg.votes} Votes
                </p>
                <p className="text-2xl font-bold text-brand-red-600">
                  ${pkg.price}
                </p>
                <p className="text-[10px] text-neutral-gray-medium mt-1">
                  ${(pkg.price / pkg.votes).toFixed(2)} per vote
                </p>
              </button>
            ))}
          </div>

          {/* Selected Package Summary */}
          {selectedPkg && (
            <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-brand-red-50 to-orange-50 border border-brand-red-200">
              <h3 className="font-bold text-neutral-black mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-gray-dark">Contestant:</span>
                  <span className="font-medium text-neutral-black">{contestantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-gray-dark">Votes to Add:</span>
                  <span className="font-bold text-brand-red-600">{selectedPkg.votes} votes</span>
                </div>
                <div className="pt-2 border-t border-brand-red-200 flex justify-between">
                  <span className="font-medium text-neutral-black">Total:</span>
                  <span className="text-xl font-bold text-brand-red-600">${selectedPkg.price}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-neutral-gray-light bg-neutral-bg-light">
          <p className="text-xs text-neutral-gray-medium">
            All transactions are secure and encrypted
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProceedToPayment}
              disabled={!selectedPackage || isProcessing}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Proceed to Payment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
