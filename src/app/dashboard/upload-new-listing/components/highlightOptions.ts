'use client';

/** Response-time choices shared by the scientist and specialist center forms. */
export const RESPONSE_TIMES = [
  '< 1 hour',
  '< 6 hours',
  '< 12 hours',
  '< 24 hours',
  '> 24 hours',
] as const;

/** Days of the week shared by the highlight sections. */
export const WORK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
