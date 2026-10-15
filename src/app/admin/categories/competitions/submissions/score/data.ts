/** Icon keys for the scoring sheet rows (mapped in CriterionIcon.tsx). */
export type CriterionIconKey = 'innovation' | 'impact' | 'technical' | 'scalability' | 'team';

export interface ScoreCriterion {
  id: string;
  name: string;
  /** One-line hint shown under the criterion name */
  hint: string;
  /** Percentage weight — the weights sum to 100 */
  weight: number;
  /** Maximum points for this row (weights match the point scale) */
  max: number;
  icon: CriterionIconKey;
}

/**
 * The scoring sheet criteria: name, hint, weight and point cap per row.
 * Weights sum to 100 and the maxes sum to 100, so the total row reads /100.
 */
export const SCORE_CRITERIA: ScoreCriterion[] = [
  { id: 'innovation', name: 'Innovation & Originality', hint: 'How novel and creative is the solution?', weight: 20, max: 20, icon: 'innovation' },
  { id: 'impact', name: 'Problem Solving Impact', hint: 'How well does it address the problem?', weight: 20, max: 20, icon: 'impact' },
  { id: 'technical', name: 'Technical Implementation', hint: 'Quality and robustness of implementation', weight: 20, max: 20, icon: 'technical' },
  { id: 'scalability', name: 'Scalability & Sustainability', hint: 'Potential for scale and long-term sustainability', weight: 20, max: 20, icon: 'scalability' },
  { id: 'team', name: 'Team Capability', hint: "Team's expertise and ability to execute", weight: 10, max: 10, icon: 'team' },
];

export const TOTAL_WEIGHT = SCORE_CRITERIA.reduce((sum, c) => sum + c.weight, 0);
export const TOTAL_MAX = SCORE_CRITERIA.reduce((sum, c) => sum + c.max, 0);

/** A raw input value is a valid score when it is 0–max for the criterion. */
export const isValidScore = (value: string | undefined, max: number): boolean => {
  if (value === undefined || value.trim() === '') return false;
  const n = Number(value);
  return !Number.isNaN(n) && n >= 0 && n <= max;
};

/** Badge label for a finished sheet (mirrors the mockup's "Good" chip). */
export const scoreRating = (total: number): { label: string; cls: string } => {
  const pct = (total / TOTAL_MAX) * 100;
  if (pct >= 85) return { label: 'Excellent', cls: 'bg-green-100 text-green-700' };
  if (pct >= 70) return { label: 'Good', cls: 'bg-green-100 text-green-700' };
  if (pct >= 50) return { label: 'Fair', cls: 'bg-amber-100 text-amber-700' };
  return { label: 'Needs Work', cls: 'bg-red-100 text-red-700' };
};
