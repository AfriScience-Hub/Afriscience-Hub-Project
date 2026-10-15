'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import CreateCompetitionHeader from './components/CreateCompetitionHeader';
import BasicInfoSection, { type BasicInfoState } from './components/BasicInfoSection';
import AboutSection, { type AboutState } from './components/AboutSection';
import ListSection from './components/ListSection';
import RewardsSection, { type AwardEntry } from './components/RewardsSection';
import FormActionsBar from './components/FormActionsBar';
import { DEFAULT_JUDGING_CRITERIA, GENERAL_CATEGORY, isCategoryLocked } from './data';
import { ALL_COMPETITIONS, type AllCompetition } from '../all/data';

/**
 * create — brand-new competition (Publish Competition),
 * edit — modify an existing one (Edit Competition),
 * reuse — prefill with an existing competition; submitting creates a
 * brand-new record (Publish Competition).
 */
type CreateMode = 'create' | 'edit' | 'reuse';

const DEFAULT_REQUIREMENTS = [
  'Must be a student between the ages of 16–25',
  'Submit original work',
];

const DEFAULT_RULES = [
  'Entries must be original and not previously published',
  'Plagiarism will lead to disqualification',
];

const DEFAULT_SCREENING = [
  'Initial screening by the AfriScience Hub team',
  'Evaluation by a panel of expert judges',
];

const EMPTY_BASIC: BasicInfoState = {
  cover: null,
  coverUrl: null,
  type: '',
  category: '',
  entryFee: '',
  country: '',
  mediaTypes: [],
  start: '',
  submissionDeadline: '',
  votingDeadline: '',
};

/** datetime-local value (YYYY-MM-DDTHH:mm) from a date-only ISO string. */
const toLocalValue = (iso: string, time: string): string => `${iso}T${time}`;

/** Copy every field of an existing competition into the form state. */
function prefill(comp: AllCompetition): {
  basic: BasicInfoState;
  about: AboutState;
  requirements: string[];
  rules: string[];
  screening: string[];
  awards: AwardEntry[];
  criteria: string[];
} {
  return {
    basic: {
      ...EMPTY_BASIC,
      coverUrl: comp.cover,
      type: comp.type,
      category: comp.category,
      entryFee: String(comp.regFee),
      country: comp.country,
      mediaTypes: [...comp.mediaTypes],
      start: toLocalValue(comp.startISO, '09:00'),
      submissionDeadline: toLocalValue(comp.submissionISO, '17:00'),
      votingDeadline: toLocalValue(comp.deadlineISO, '23:59'),
    },
    about: { shortDescription: comp.shortDescription, description: comp.description },
    requirements: [...comp.requirements],
    rules: [...comp.rules],
    screening: [...comp.screening],
    awards: comp.awards.map((a, i) => ({ id: `prefill-${i}`, position: a.position, items: a.items.join(', ') })),
    criteria: [...comp.criteria],
  };
}

/**
 * Create / Edit / Reuse Competition: seven collapsible numbered sections —
 * Basic Information, About, Registration Requirements, Rules and Guidelines,
 * Screening and Selection, Rewards and Prizes and Judging Criteria — with
 * Save as Draft / submit actions at the bottom. `?mode=edit|reuse&id=N`
 * prefills the form from an existing competition.
 */
function CreateCompetitionContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode: CreateMode = modeParam === 'edit' || modeParam === 'reuse' ? modeParam : 'create';
  const targetId = searchParams.get('id');

  const [basic, setBasic] = useState<BasicInfoState>(EMPTY_BASIC);
  const [about, setAbout] = useState<AboutState>({ shortDescription: '', description: '' });
  const [requirements, setRequirements] = useState<string[]>(DEFAULT_REQUIREMENTS);
  const [rules, setRules] = useState<string[]>(DEFAULT_RULES);
  const [screening, setScreening] = useState<string[]>(DEFAULT_SCREENING);
  const [awards, setAwards] = useState<AwardEntry[]>([]);
  const [criteria, setCriteria] = useState<string[]>(DEFAULT_JUDGING_CRITERIA);

  const prefilledRef = useRef(false);

  // Prefill from the competition being edited or reused (once).
  useEffect(() => {
    if (prefilledRef.current || !targetId) return;
    prefilledRef.current = true;
    const comp = ALL_COMPETITIONS.find((c) => c.id === Number(targetId));
    if (!comp) {
      toast.error('Competition not found — starting with a blank form.');
      return;
    }
    const seed = prefill(comp);
    setBasic(seed.basic);
    setAbout(seed.about);
    setRequirements(seed.requirements);
    setRules(seed.rules);
    setScreening(seed.screening);
    setAwards(seed.awards);
    setCriteria(seed.criteria);
  }, [targetId]);

  const updateBasic = (patch: Partial<BasicInfoState>) => setBasic((prev) => ({ ...prev, ...patch }));
  const updateAbout = (patch: Partial<AboutState>) => setAbout((prev) => ({ ...prev, ...patch }));

  const validate = (): string[] => {
    const problems: string[] = [];
    // Locked-category types always submit General (18+).
    const category = isCategoryLocked(basic.type) ? GENERAL_CATEGORY : basic.category;
    if (!basic.type) problems.push('select a competition type');
    if (!category) problems.push('select a category');
    if (basic.mediaTypes.length === 0) problems.push('pick at least one media type');
    if (!basic.country) problems.push('select a country');
    if (!basic.start) problems.push('set the start date & time');
    if (!basic.submissionDeadline) problems.push('set the submission deadline');
    if (!basic.votingDeadline) problems.push('set the voting deadline');
    if (!about.shortDescription.trim()) problems.push('add a short description');
    if (!about.description.trim()) problems.push('add a competition description');
    return problems;
  };

  const handleSaveDraft = () => {
    toast.success('Competition saved as draft');
  };

  const handlePublish = () => {
    const problems = validate();
    if (problems.length > 0) {
      toast.error(`Please ${problems.join(', ')} before ${mode === 'edit' ? 'saving' : 'publishing'}.`);
      return;
    }
    const category = isCategoryLocked(basic.type) ? GENERAL_CATEGORY : basic.category;
    if (mode === 'edit') {
      toast.success(`Competition updated: ${basic.type} — ${category}`);
    } else if (mode === 'reuse') {
      toast.success(`New competition published from reuse: ${basic.type} — ${category}`);
    } else {
      toast.success(`Competition published: ${basic.type} — ${category}`);
    }
  };

  return (
    <div className="space-y-4">
      <CreateCompetitionHeader />

      <BasicInfoSection value={basic} onChange={updateBasic} />
      <AboutSection value={about} onChange={updateAbout} />

      <ListSection
        number={3}
        title="Registration Requirements"
        subtitle="List the requirements participants must meet to register."
        items={requirements}
        onChange={setRequirements}
        addLabel="Add Requirement"
        placeholder="Add a requirement"
      />

      <ListSection
        number={4}
        title="Rules and Guidelines"
        subtitle="Add the competition rules. You can add multiple points."
        items={rules}
        onChange={setRules}
        addLabel="Add Rule"
        placeholder="Add a rule"
      />

      <ListSection
        number={5}
        title="Screening and Selection"
        subtitle="Explain the screening process and how winners will be selected."
        items={screening}
        onChange={setScreening}
        addLabel="Add Point"
        placeholder="Add a screening/selection point"
      />

      <RewardsSection type={basic.type} category={basic.category} awards={awards} onChange={setAwards} />

      <ListSection
        number={7}
        title="Judging Criteria"
        subtitle="List the criteria entries will be judged and scored on."
        items={criteria}
        onChange={setCriteria}
        addLabel="Add Criterion"
        placeholder="Add a judging criterion"
      />

      <FormActionsBar
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        primaryLabel={mode === 'edit' ? 'Edit Competition' : 'Publish Competition'}
      />
    </div>
  );
}

export default function CreateCompetitionPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <CreateCompetitionContent />
    </Suspense>
  );
}
