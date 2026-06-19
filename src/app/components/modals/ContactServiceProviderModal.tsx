'use client';

import { Phone, MessageCircle, FileText, X, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

interface ContactServiceProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  providerId: string;
  providerPhone?: string;
  profileType: 'institute' | 'scientist' | 'specialist-center';
  onOpenMessaging: () => void;
}

export function ContactServiceProviderModal({
  isOpen,
  onClose,
  providerName,
  providerId,
  providerPhone,
  profileType,
  onOpenMessaging
}: ContactServiceProviderModalProps) {
  
  const handleCall = () => {
    if (providerPhone) {
      window.location.href = `tel:${providerPhone}`;
      toast.success('Opening call app...');
    } else {
      toast.error('Phone number not available');
    }
  };

  const handleRequestInvoice = () => {
    // Send notification to service provider
    toast.success('Invoice request sent to provider');
    toast.info('You will be notified when the provider generates your invoice');
    onClose();
    
    // In a real app, this would:
    // - Create a notification for the provider
    // - Add entry to provider's dashboard
    // - Track the request status
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">Contact Service Provider</h2>
            <p className="text-sm text-white/70 mt-1">{providerName}</p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* UX Message */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">Important Notice</p>
              <p className="text-sm text-blue-800 mt-1">
                Please ensure you clearly agree on service scope, pricing, and delivery terms with the service provider before proceeding.
              </p>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            {/* Call Option */}
            <button
              onClick={handleCall}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-neutral-gray-light hover:border-brand-red-600 hover:bg-brand-red-50/30 transition-all text-left group"
            >
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors">
                  Call Service Provider
                </p>
                <p className="text-sm text-neutral-gray-medium">
                  Speak directly to discuss your requirements
                </p>
              </div>
            </button>

            {/* Message Option */}
            <button
              onClick={() => {
                onOpenMessaging();
                onClose();
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-neutral-gray-light hover:border-brand-red-600 hover:bg-brand-red-50/30 transition-all text-left group"
            >
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors">
                  Message Service Provider
                </p>
                <p className="text-sm text-neutral-gray-medium">
                  Chat in-platform to discuss details
                </p>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-gray-light"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm font-bold text-neutral-gray-medium">OR</span>
            </div>
          </div>

          {/* Request Invoice Option */}
          <button
            onClick={handleRequestInvoice}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-brand-red-600 bg-brand-red-50/50 hover:bg-brand-red-50 transition-all text-left group"
          >
            <div className="h-12 w-12 rounded-full bg-brand-red-100 flex items-center justify-center text-brand-red-600 group-hover:bg-brand-red-600 group-hover:text-white transition-colors flex-shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-brand-red-600">
                Request Invoice
              </p>
              <p className="text-sm text-neutral-gray-dark">
                Provider will generate and send you an invoice
              </p>
            </div>
          </button>

          {/* Info Note */}
          <div className="pt-2">
            <p className="text-xs text-neutral-gray-medium text-center leading-relaxed">
              After discussing via call or message, the provider can create an invoice from their dashboard. You'll receive a notification to review and pay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
