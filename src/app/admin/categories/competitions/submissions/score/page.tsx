'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import ScoreHeader from './components/ScoreHeader';
import ScoringSheet from './components/ScoringSheet';
import SubmissionWorkSummary from './components/SubmissionWorkSummary';
import { SCORE_CRITERIA, TOTAL_MAX, isValidScore } from './data';
import { SUBMISSIONS } from '../data';

/**
 * Score Contestant page: a single-column scoring sheet — one row per
 * judging criterion with a Save Score action below. The submission
 * being scored comes from `?id=` and is only referenced on save for now.
 */
function ScoreContestantContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');
  const submission = useMemo(
    () => SUBMISSIONS.find((s) => s.id === submissionId) ?? null,
    [submissionId]
  );

  const [scores, setScores] = useState<Record<string, string>>({});

  const total = SCORE_CRITERIA.reduce((sum, criterion) => {
    const value = scores[criterion.id];
    if (!isValidScore(value, criterion.max)) return sum;
    return sum + Math.min(Number(value), criterion.max);
  }, 0);

  const complete = SCORE_CRITERIA.every((criterion) => isValidScore(scores[criterion.id], criterion.max));

  const setScore = (id: string, value: string) => setScores((prev) => ({ ...prev, [id]: value }));

  const handleSave = () => {
    if (!complete) {
      toast.error('Score every criterion before saving.');
      return;
    }
    const label = submission ? `"${submission.title}"` : 'this submission';
    toast.success(`Score saved for ${label}: ${total}/${TOTAL_MAX}`);
  };

  return (
    <div className="space-y-4">
      <ScoreHeader />
      {submission && <SubmissionWorkSummary submission={submission} />}
      <ScoringSheet scores={scores} onScore={setScore} total={total} complete={complete} onSave={handleSave} />
    </div>
  );
}

export default function ScorePage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <ScoreContestantContent />
    </Suspense>
  );
}
