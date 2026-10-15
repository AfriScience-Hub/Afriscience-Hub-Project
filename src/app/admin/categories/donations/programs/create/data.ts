import { getProgramById, nextProgramId, upsertProgram, type SupportProgram } from '../../data';

export interface ProgramFormState {
  name: string;
  targetAmount: string;
  description: string;
}

export const EMPTY_PROGRAM_FORM: ProgramFormState = {
  name: '',
  targetAmount: '',
  description: '',
};

export const DESCRIPTION_MAX = 500;

export const isValidTarget = (value: string): boolean =>
  /^\d+$/.test(value.trim()) && Number(value.trim()) > 0;

/**
 * Required checks run on submit; the target amount must be a positive
 * whole number (the input already blocks letters).
 */
export function validateProgramForm(form: ProgramFormState): string[] {
  const problems: string[] = [];
  if (!form.name.trim()) problems.push('enter the program name');
  if (!form.targetAmount.trim()) problems.push('set the target amount');
  else if (!isValidTarget(form.targetAmount)) problems.push('set a target amount greater than 0');
  if (!form.description.trim()) problems.push('add a program description');
  return Array.from(new Set(problems));
}

/** Copy every field of an existing program into the create form. */
export function prefillProgram(program: SupportProgram): ProgramFormState {
  return {
    name: program.name,
    targetAmount: String(program.targetAmount),
    description: program.description,
  };
}

/**
 * Create adds a new program; edit updates the existing one. Created
 * programs default to the gift icon and are visible until hidden.
 */
export function saveProgram(form: ProgramFormState, existing: SupportProgram | null): SupportProgram {
  const program: SupportProgram = {
    id: existing?.id ?? nextProgramId(),
    name: form.name.trim(),
    description: form.description.trim(),
    targetAmount: Number(form.targetAmount),
    received: existing?.received ?? 0,
    iconKey: existing?.iconKey ?? 'gift',
    hidden: existing?.hidden ?? false,
  };
  upsertProgram(program);
  return program;
}

export { getProgramById };
