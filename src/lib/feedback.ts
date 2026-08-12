export interface FeedbackPrefill {
  email?: string;
  type?: string;
  section?: string;
}

export const OPEN_FEEDBACK_EVENT = 'ash:open-feedback';

export function openFeedback(prefill: FeedbackPrefill = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<FeedbackPrefill>(OPEN_FEEDBACK_EVENT, { detail: prefill }));
}