import type { CompletionSection } from '@/store/profileSlice';

export type ProfileTab = 'personal' | 'education' | 'experience';

const TAB_SECTIONS: Record<ProfileTab, string[]> = {
  personal: ['profile'],
  education: ['education', 'certificates'],
  experience: ['experiences', 'skills', 'languages', 'portfolio'],
};

/**
 * A tab is complete when every completion section it owns is complete.
 * Missing (optional) sections count as complete; the backend omits nothing it
 * has evaluated, but this keeps the UI resilient while completion is loading.
 */
export function isProfileTabComplete(
  tab: ProfileTab,
  sections: Record<string, CompletionSection> | null,
  allCompleted = false,
): boolean {
  if (allCompleted) return true;
  if (!sections || Object.keys(sections).length === 0) return false;
  return TAB_SECTIONS[tab].every((key) => !sections[key] || sections[key].completed === true);
}
