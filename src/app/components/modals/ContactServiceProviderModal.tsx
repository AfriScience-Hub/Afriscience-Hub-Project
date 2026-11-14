'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageCircle, FileText, X, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  cancelInvoiceRequest,
  fetchPendingInvoiceRequest,
  recordScientistServiceInterest,
  requestInvoice,
  type InvoiceRequest,
} from '@/app/dashboard/invoices/api';

interface ContactServiceProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  providerId: string;
  providerPhone?: string;
  profileType: 'institute' | 'scientist' | 'specialist-center';
  onOpenMessaging: () => void;
}

function errorMessage(error: unknown): string {
  if ((error as { status?: number } | undefined)?.status === 401) {
    return 'Please sign in to request or cancel an invoice.';
  }
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

export function ContactServiceProviderModal({
  isOpen,
  onClose,
  providerName,
  providerId,
  providerPhone,
  profileType,
  onOpenMessaging,
}: ContactServiceProviderModalProps) {
  const isScientist = profileType === 'scientist';
  const [pendingRequest, setPendingRequest] = useState<InvoiceRequest | null>(null);
  const [checking, setChecking] = useState(false);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!isOpen || !isScientist || !providerId) {
      setPendingRequest(null);
      setChecking(false);
      return;
    }

    let cancelled = false;
    setChecking(true);

    // Opening the modal records (or refreshes) this visitor as a potential
    // client, then we look for an existing PENDING invoice request so the
    // button can show Cancel instead of Request.
    Promise.allSettled([
      recordScientistServiceInterest(providerId),
      fetchPendingInvoiceRequest(providerId),
    ])
      .then(([interest, request]) => {
        if (cancelled) return;
        const status = (interest.status === 'rejected' ? (interest.reason as { status?: number } | undefined)?.status : undefined);
        if (status === 401) {
          toast.error('Sign in to book this service and request an invoice.');
        }
        if (request.status === 'fulfilled') {
          setPendingRequest(request.value);
        }
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, isScientist, providerId]);

  const handleCall = () => {
    if (providerPhone) {
      window.location.href = `tel:${providerPhone}`;
      toast.success('Opening call app...');
    } else {
      toast.info('Use the message option to contact this provider.');
    }
  };

  const handleInvoiceAction = async () => {
    if (!isScientist) {
      toast.info('Invoice requests for this listing type are coming soon.');
      return;
    }

    setWorking(true);
    try {
      if (pendingRequest) {
        await cancelInvoiceRequest(pendingRequest.id);
        setPendingRequest(null);
        toast.success('Invoice request cancelled.');
      } else {
        const request = await requestInvoice(providerId);
        setPendingRequest(request);
        toast.success('Invoice request sent successfully.');
        toast.info('You will be notified when the provider sends your invoice.');
      }
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setWorking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[70vh] flex flex-col">
        <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-6 py-5 flex items-center justify-between rounded-t-2xl flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Contact Service Provider</h2>
            <p className="text-sm text-white/70 mt-1">{providerName}</p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">Important Notice</p>
              <p className="text-sm text-blue-800 mt-1">
                Please ensure you clearly agree on service scope, pricing, and delivery terms with the service provider before proceeding.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCall}
              className="w-full flex items-center cursor-pointer  gap-4 p-4 rounded-xl border-2 border-neutral-gray-light hover:border-brand-red-600 hover:bg-brand-red-50/30 transition-all text-left group"
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

            <button
              onClick={() => {
                onOpenMessaging();
                onClose();
              }}
              className="w-full flex items-center cursor-pointer  gap-4 p-4 rounded-xl border-2 border-neutral-gray-light hover:border-brand-red-600 hover:bg-brand-red-50/30 transition-all text-left group"
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-gray-light"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm font-bold text-neutral-gray-medium">OR</span>
            </div>
          </div>

          <button
            onClick={handleInvoiceAction}
            disabled={checking || working}
            className="w-full flex items-center cursor-pointer gap-4 p-4 rounded-xl border-2 border-brand-red-600 bg-brand-red-50/50 hover:bg-brand-red-50 transition-all text-left group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="h-12 w-12 rounded-full bg-brand-red-100 flex items-center justify-center text-brand-red-600 group-hover:bg-brand-red-600 group-hover:text-white transition-colors flex-shrink-0">
              {checking || working ? <Loader2 className="h-6 w-6 animate-spin" /> : <FileText className="h-6 w-6" />}
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-brand-red-600">
                {pendingRequest ? 'Cancel Invoice Request' : 'Request Invoice'}
              </p>
              <p className="text-sm text-neutral-gray-dark">
                {pendingRequest
                  ? 'A request is pending. Cancel it if you no longer need an invoice.'
                  : 'Provider will generate and send you an invoice'}
              </p>
            </div>
          </button>

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
