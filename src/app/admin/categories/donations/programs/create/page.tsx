'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import ProgramFormHeader from './components/ProgramFormHeader';
import ProgramInfoSection from './components/ProgramInfoSection';
import ProgramDescriptionSection from './components/ProgramDescriptionSection';
import ProgramFormActions from './components/ProgramFormActions';
import {
  EMPTY_PROGRAM_FORM,
  getProgramById,
  prefillProgram,
  saveProgram,
  validateProgramForm,
  type ProgramFormState,
} from './data';
import { ADMIN_ROUTES } from '@/app/admin/data/routes';

/**
 * create — brand-new program (Create Program); edit — modify an
 * existing program (Edit Program). `?mode=edit&id=p-x` drives the mode
 * and prefill. No program-icon upload and no preview section.
 */
type CreateMode = 'create' | 'edit';

function ProgramFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode: CreateMode = modeParam === 'edit' ? 'edit' : 'create';
  const targetId = searchParams.get('id');

  const [form, setForm] = useState<ProgramFormState>(EMPTY_PROGRAM_FORM);
  const prefilledRef = useRef(false);

  // Prefill from the program being edited (once).
  useEffect(() => {
    if (prefilledRef.current || !targetId) return;
    prefilledRef.current = true;
    const program = getProgramById(targetId);
    if (!program) {
      toast.error('Program not found — starting with a blank form.');
      return;
    }
    setForm(prefillProgram(program));
  }, [targetId]);

  const update = (patch: Partial<ProgramFormState>) => setForm((prev) => ({ ...prev, ...patch }));

  const handleCancel = () => router.push(ADMIN_ROUTES.donationsPrograms);

  const handleSubmit = () => {
    const problems = validateProgramForm(form);
    if (problems.length > 0) {
      toast.error(`Please ${problems.join(', ')}.`);
      return;
    }
    const existing = mode === 'edit' && targetId ? getProgramById(targetId) ?? null : null;
    saveProgram(form, existing);
    toast.success(`${mode === 'edit' ? 'Program updated' : 'Program created'}: ${form.name.trim()}`);
  };

  return (
    <div className="space-y-4">
      <ProgramFormHeader />

      <ProgramInfoSection value={form} onChange={update} />
      <ProgramDescriptionSection value={form} onChange={update} />

      <ProgramFormActions
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        primaryLabel={mode === 'edit' ? 'Edit Program' : 'Create Program'}
      />
    </div>
  );
}

export default function ProgramCreatePage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <ProgramFormContent />
    </Suspense>
  );
}
