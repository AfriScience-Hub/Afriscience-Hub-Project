'use client';

import Link from 'next/link';
import { HandCoins, ArrowRight, Target, X, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CAUSES = [
  {
    id: 'competition-support',
    title: 'Competition Support',
    emoji: '🏆',
    description: 'Provide support to enable AfriScience Hub organize annual competitions in more African countries. Help us cover more grounds in bringing more African talents to limelight through competitions.',
    target: 5000000,
    raised: 0,
    color: 'bg-amber-50 border-amber-200',
  },
  {
    id: 'career-support',
    title: 'Career Support',
    emoji: '💡',
    description: 'Encourage Africa\'s top graduating tertiary students by providing them a financial head-start in their chosen career path. Help us create more jobs across the continent',
    target: 5000000,
    raised: 0,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'research-support',
    title: 'Research Support',
    emoji: '🔬',
    description: 'Provide financial aid to African researchers to help them access materials and equipment needed to advance scientific and technological studies across the continent.',
    target: 10000000,
    raised: 0,
    color: 'bg-purple-50 border-purple-200',
  },
  {
    id: 'educational-scholarships',
    title: 'Educational Scholarships (Tertiary)',
    emoji: '🎓',
    description: 'Provide educational scholarships to current African tertiary students that lack the resources required to complete their programs in science and technology related fields.',
    target: 15000000,
    raised: 0,
    color: 'bg-emerald-50 border-emerald-200',
  },
];

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£E' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH' },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA' },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK' },
];

export default function Donate() {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const [formData, setFormData] = useState({
    currency: 'USD',
    amount: ''
  });

  const openDonationModal = (causeId?: string) => {
    if (causeId) {
      setSelectedCause(causeId);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ currency: 'USD', amount: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please log in to make a donation.');
      return;
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    
    // Redirect to Paystack payment gateway
    const paystackUrl = 'https://paystack.com/pay/afriscience-hub';
    const amount = parseFloat(formData.amount);
    const currency = formData.currency;
    const causeName = selectedCauseData ? selectedCauseData.title : 'General Support';
    
    // In production, this would be a proper Paystack integration
    console.log('Redirecting to Paystack with:', {
      amount,
      currency,
      cause: causeName,
      email: 'user@example.com', // From authenticated user
      reference: `DON-${Date.now()}`
    });
    
    // Simulate Paystack redirect
    setShowModal(false);
    
    // Simulate successful payment callback
    setTimeout(() => {
      setShowThankYou(true);
      
      // Reset form and hide thank you message after 4 seconds
      setTimeout(() => {
        setShowThankYou(false);
        setFormData({ currency: 'USD', amount: '' });
        setSelectedCause(null);
      }, 4000);
    }, 1500);
  };

  const selectedCurrency = CURRENCIES.find(c => c.code === formData.currency);
  const selectedCauseData = selectedCause ? CAUSES.find(c => c.id === selectedCause) : null;

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1727698947585-3e6703525958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY2hhcml0eSUyMGRvbmF0aW9uJTIwaGFuZHMlMjBnaXZpbmd8ZW58MXx8fHwxNzcyODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Donate"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/support" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowRight className="h-3 w-3 rotate-180" /> Back to Support
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <HandCoins className="h-4 w-4" />
              Donations
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Donate
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Your donations help us maintain our network's internal framework and facilitate our enlightenment programs across the African continent. We deeply appreciate and recognize your support towards our mission to propel the continent to greater heights.
            </p>
            <Button 
              size="lg" 
              onClick={() => openDonationModal()}
              className="h-12 px-8 bg-brand-red-600 hover:bg-brand-red-700 text-base"
            >
              Donate to AfriScience Hub Today!
            </Button>
          </div>
        </div>
      </section>

      {/* Current Causes */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Current Causes</h2>
          <p className="text-slate-500">Select a cause to support. Every contribution counts.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {CAUSES.map((cause) => {
            const percentage = Math.round((cause.raised / cause.target) * 100);
            return (
              <div
                key={cause.id}
                className={`rounded-2xl border-2 p-6 ${cause.color}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{cause.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-black mb-1">{cause.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{cause.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 font-medium">${cause.raised.toLocaleString()} raised</span>
                        <span className="text-slate-400">of ${cause.target.toLocaleString()}</span>
                      </div>
                      <div className="h-2.5 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-red-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Target className="h-3 w-3" />
                        {percentage}% of goal reached
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => openDonationModal(cause.id)}
                  variant="outline"
                  className="w-full bg-red-200 hover:bg-red-600 hover:text-white"
                >
                  Donate to this Cause
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-gray-light px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-neutral-black">
                  {selectedCauseData ? `Make a donation to ${selectedCauseData.title}` : 'Make a Donation'}
                </h3>
                {selectedCauseData && (
                  <p className="text-xs text-slate-500 mt-0.5">{selectedCauseData.emoji} Supporting: {selectedCauseData.title}</p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-neutral-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Cause Selection (only if no cause selected) */}
              {!selectedCause && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Select a Cause (Optional)</label>
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

              {/* Name - Auto-generated */}
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

              {/* ID Tag - Auto-generated */}
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

              {/* Currency */}
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

              {/* Amount */}
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
                <p className="text-xs text-red-700 mt-1">Donations of $500+ will be featured in our "Annual Donor Magazine"</p>
              </div>

              {/* Donate Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-brand-red-600 hover:bg-brand-red-700 text-base"
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 'Proceed to Paystack' : 'Log in to Donate'}
              </Button>

              {/* Paystack Info */}
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
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-black mb-2">Thank You!</h3>
            <p className="text-slate-500 mb-4">
              Your donation has been successfully processed. We deeply appreciate your support towards our mission.
            </p>
            <p className="text-sm text-slate-400">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}