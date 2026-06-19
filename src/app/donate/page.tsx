'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DonateHero } from '../support/donate/components/DonateHero';
import { DonateCauses } from '../support/donate/components/DonateCauses';
import { DonationModal } from '../support/donate/components/DonationModal';
import { ThankYouModal } from '../support/donate/components/ThankYouModal';

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
    if (causeId) setSelectedCause(causeId);
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
    console.log('Redirecting to Paystack with:', {
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      cause: selectedCause || 'General Support',
    });
    setShowModal(false);
    setTimeout(() => {
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setFormData({ currency: 'USD', amount: '' });
        setSelectedCause(null);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="pb-16">
      <DonateHero onDonate={() => openDonationModal()} />
      <DonateCauses onDonate={openDonationModal} />
      <DonationModal
        show={showModal}
        selectedCause={selectedCause}
        setSelectedCause={setSelectedCause}
        formData={formData}
        setFormData={setFormData}
        isAuthenticated={isAuthenticated}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
      <ThankYouModal show={showThankYou} />
    </div>
  );
}
