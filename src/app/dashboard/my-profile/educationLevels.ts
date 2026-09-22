export const NO_GRADUATION_CLASS_LEVELS = [
  'Elementary Degree',
  'Junior High School Degree',
  'Senior High School Degree',
] as const;

export function isNoGraduationClassLevel(level: string) {
  return (NO_GRADUATION_CLASS_LEVELS as readonly string[]).includes(level);
}