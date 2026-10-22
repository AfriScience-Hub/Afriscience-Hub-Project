'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CreateCompetitionHeader from './components/CreateCompetitionHeader';
import BasicInfoSection, { type BasicInfoState } from './components/BasicInfoSection';
import AboutSection, { type AboutState } from './components/AboutSection';
import ListSection from './components/ListSection';
import RewardsSection, { type AwardEntry } from './components/RewardsSection';
import CriteriaSection from './components/CriteriaSection';
import FormActionsBar from './components/FormActionsBar';
import {
  DEFAULT_JUDGING_CRITERIA, GENERAL_CATEGORY, getRewardSuggestion, isCategoryLocked,
  type JudgingCriterion,
} from './data';
import { createCompetitionDraft, publishCompetition } from './api';
import {
  EMPTY_BASIC, buildCreatePayload, draftIdOf, prefillFrom, suggestionKeyFor,
  toAwardEntries, updateCompetitionSections, type CompetitionFormState,
} from './submit';
import { ALL_COMPETITIONS } from '../all/data';

/**
 * create — brand-new competition (Publish Competition),
 * edit — modify an existing one (Edit Competition),
 * reuse — prefill with an existing competition; submitting creates a
 * brand-new record (Publish Competition).
 */
type CreateMode = 'create' | 'edit' | 'reuse';

/** Where both "Save as Draft" and "Publish" land once they finish. */
const ALL_COMPETITIONS_ROUTE = '/admin/categories/competitions/all';

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

/**
 * Create / Edit / Reuse Competition: seven collapsible numbered sections —
 * Basic Information, About, Registration Requirements, Rules and Guidelines,
 * Screening and Selection, Rewards and Prizes and Judging Criteria — with
 * Save as Draft / submit actions at the bottom. `?mode=edit|reuse&id=N`
 * prefills the form from an existing competition.
 */
function CreateCompetitionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get('mode');
  const mode: CreateMode = modeParam === 'edit' || modeParam === 'reuse' ? modeParam : 'create';
  const targetId = searchParams.get('id');

  const [basic, setBasic] = useState<BasicInfoState>(EMPTY_BASIC);
  const [about, setAbout] = useState<AboutState>({ shortDescription: '', description: '' });
  const [requirements, setRequirements] = useState<string[]>(DEFAULT_REQUIREMENTS);
  const [rules, setRules] = useState<string[]>(DEFAULT_RULES);
  const [screening, setScreening] = useState<string[]>(DEFAULT_SCREENING);
  const [awards, setAwards] = useState<AwardEntry[]>([]);
  const [criteria, setCriteria] = useState<JudgingCriterion[]>(DEFAULT_JUDGING_CRITERIA);
  const [submitting, setSubmitting] = useState(false);

  const prefilledRef = useRef(false);
  /** The type/category combination the current rewards were built from. */
  const suggestionKeyRef = useRef<string>('');

  // Prefill from the competition being edited or reused (once).
  useEffect(() => {
    if (prefilledRef.current || !targetId) return;
    prefilledRef.current = true;
    const comp = ALL_COMPETITIONS.find((c) => c.id === Number(targetId));
    if (!comp) {
      toast.error('Competition not found — starting with a blank form.');
      return;
    }
    const seed = prefillFrom(comp);
    setBasic(seed.basic);
    setAbout(seed.about);
    setRequirements(seed.requirements);
    setRules(seed.rules);
    setScreening(seed.screening);
    setAwards(seed.awards);
    setCriteria(seed.criteria);
    // Pin the suggestion key so the auto-fill below keeps the loaded rewards.
    suggestionKeyRef.current = suggestionKeyFor(seed.basic.type, seed.basic.category);
  }, [targetId]);

  /**
   * Auto-fill the standard rewards whenever the competition type (or the
   * category for Afri-Presentations) changes. The rows stay fully editable.
   */
  useEffect(() => {
    if (!basic.type) return;
    const key = suggestionKeyFor(basic.type, basic.category);
    if (suggestionKeyRef.current === key) return;
    suggestionKeyRef.current = key;
    const suggestion = getRewardSuggestion(basic.type, basic.category);
    setAwards(suggestion ? toAwardEntries(suggestion) : []);
  }, [basic.type, basic.category]);

  const updateBasic = (patch: Partial<BasicInfoState>) => setBasic((prev) => ({ ...prev, ...patch }));
  const updateAbout = (patch: Partial<AboutState>) => setAbout((prev) => ({ ...prev, ...patch }));

  /** Current form values, handed to the pure submit helpers in `submit.ts`. */
  const formState: CompetitionFormState = useMemo(
    () => ({ basic, about, requirements, rules, screening, awards, criteria }),
    [basic, about, requirements, rules, screening, awards, criteria]
  );

  const validate = (): string[] => {
    const problems: string[] = [];
    // Locked-category types always submit General (18+).
    const category = isCategoryLocked(basic.type) ? GENERAL_CATEGORY : basic.category;
    if (!basic.type) problems.push('select a competition type');
    if (!category) problems.push('select a category');
    if (!basic.year || Number(basic.year) < 2000) problems.push('set the competition year');
    if (basic.mediaTypes.length === 0) problems.push('pick at least one media type');
    if (!basic.maxFiles || Number(basic.maxFiles) < 1) problems.push('set the maximum number of media files');
    if (!basic.maxFileSizeMB || Number(basic.maxFileSizeMB) < 1) problems.push('set the maximum media file size');
    if (!basic.country) problems.push('select a country');
    if (!basic.start) problems.push('set the start date & time');
    if (!basic.submissionDeadline) problems.push('set the submission deadline');
    if (!basic.votingDeadline) problems.push('set the voting deadline');
    if (!about.shortDescription.trim()) problems.push('add a short description');
    if (!about.description.trim()) problems.push('add a competition description');
    return problems;
  };

  /**
   * Save as Draft — POST /admin/competitions creates the record with
   * `status: "DRAFT"`, then the user is taken back to the all competitions
   * page. In edit mode there is no draft endpoint, so the section updates are
   * applied instead.
   */
  const handleSaveDraft = async () => {
    if (mode === 'edit') {
      if (!targetId) return;
      setSubmitting(true);
      try {
        await updateCompetitionSections(targetId, formState);
        toast.success('Competition saved as draft');
        router.push(ALL_COMPETITIONS_ROUTE);
      } catch (e: any) {
        toast.error(e?.message || 'Failed to save the competition');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const problems = validate();
    if (problems.length > 0) {
      toast.error(`Please ${problems.join(', ')} before saving as draft.`);
      return;
    }

    setSubmitting(true);
    try {
      await createCompetitionDraft(await buildCreatePayload(formState));
      toast.success('Competition saved as draft');
      router.push(ALL_COMPETITIONS_ROUTE);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save the competition as draft');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Publish — the draft is created first via POST /admin/competitions, its id
   * is read from the response, and POST /admin/competitions/{id}/publish then
   * moves it from DRAFT to live. In edit mode the section endpoints are used
   * (there is no publish call for an already-existing competition).
   */
  const handlePublish = async () => {
    const problems = validate();
    if (problems.length > 0) {
      toast.error(`Please ${problems.join(', ')} before ${mode === 'edit' ? 'saving' : 'publishing'}.`);
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'edit' && targetId) {
        await updateCompetitionSections(targetId, formState);
        toast.success('Competition updated');
        return;
      }

      const draft = await createCompetitionDraft(await buildCreatePayload(formState));
      const id = draftIdOf(draft);
      if (!id) {
        toast.error('The competition was saved as a draft, but no id was returned — unable to publish.');
        return;
      }
      await publishCompetition(id);
      toast.success('Competition published');
      router.push(ALL_COMPETITIONS_ROUTE);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save the competition');
    } finally {
      setSubmitting(false);
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

      <CriteriaSection
        number={7}
        title="Judging Criteria"
        subtitle="List the criteria entries will be judged on and the points each is worth."
        items={criteria}
        onChange={setCriteria}
        addLabel="Add Criterion"
        placeholder="Add a judging criterion"
      />

      <FormActionsBar
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        primaryLabel={mode === 'edit' ? 'Edit Competition' : 'Publish Competition'}
        disabled={submitting}
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
