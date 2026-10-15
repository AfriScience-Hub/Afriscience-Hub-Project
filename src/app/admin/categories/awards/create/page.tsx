'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import AwardFormHeader from './components/AwardFormHeader';
import BasicInfoSection from './components/BasicInfoSection';
import RecipientSection from './components/RecipientSection';
import AwardDetailsSection from './components/AwardDetailsSection';
import RewardsSection from './components/RewardsSection';
import HonorarySection from './components/HonorarySection';
import FormActionsBar from './components/FormActionsBar';
import { EMPTY_AWARD_FORM, prefillAward, validateAwardForm, type AwardFormState } from './data';
import { getAwardById } from '../data';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * create — brand-new award (Save Award), edit — modify an existing award
 * (Edit Award), reuse — prefilled with an existing award but submitting
 * saves a brand-new one (Save Award). `?mode=edit|reuse&id=N` drives the
 * mode and prefill.
 */
type CreateMode = 'create' | 'edit' | 'reuse';

function AwardFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode: CreateMode = modeParam === 'edit' || modeParam === 'reuse' ? modeParam : 'create';
  const targetId = searchParams.get('id');

  const [form, setForm] = useState<AwardFormState>(EMPTY_AWARD_FORM);
  const prefilledRef = useRef(false);

  // Prefill from the award being edited or reused (once).
  useEffect(() => {
    if (prefilledRef.current || !targetId) return;
    prefilledRef.current = true;
    const award = getAwardById(Number(targetId));
    if (!award) {
      toast.error('Award not found — starting with a blank form.');
      return;
    }
    setForm(prefillAward(award));
  }, [targetId]);

  const update = (patch: Partial<AwardFormState>) => setForm((prev) => ({ ...prev, ...patch }));

  const handleCancel = () => router.push(ADMIN_ROUTES.awards);

  const handleSubmit = () => {
    const problems = validateAwardForm(form);
    if (problems.length > 0) {
      toast.error(`Please ${problems.join(', ')}.`);
      return;
    }
    const label = `${form.awardType} — ${form.fullName}`;
    if (mode === 'edit') {
      toast.success(`Award updated: ${label}`);
    } else if (mode === 'reuse') {
      toast.success(`New award saved from reuse: ${label}`);
    } else {
      toast.success(`Award saved: ${label}`);
    }
  };

  return (
    <div className="space-y-4">
      <AwardFormHeader />

      <BasicInfoSection value={form} onChange={update} />
      <RecipientSection value={form} onChange={update} />
      <AwardDetailsSection value={form} onChange={update} />
      <RewardsSection value={form} onChange={update} />
      <HonorarySection value={form} onChange={update} />

      <FormActionsBar
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        primaryLabel={mode === 'edit' ? 'Edit Award' : 'Save Award'}
      />
    </div>
  );
}

export default function AwardCreatePage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <AwardFormContent />
    </Suspense>
  );
}
