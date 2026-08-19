'use client';

import { AFRICAN_COUNTRIES } from '@/app/data/mockData';
import { COUNTRY_STATES } from '@/app/support/volunteer/data';
import { FieldLabel, TextInput, SelectInput } from '../components/FormField';
import type { ResearchFormState } from './types';

export function LaboratoriesBlock({
  laboratories,
  onChange,
}: {
  laboratories: ResearchFormState['research']['laboratories'];
  onChange: (labs: ResearchFormState['research']['laboratories']) => void;
}) {
  return (
    <div className="mb-6">
      <FieldLabel required info="Laboratories that will analyze samples.">
        Research Laboratories
      </FieldLabel>
      <div className="space-y-4 mt-2">
        {laboratories.map((lab, idx) => {
          const labStates = lab.country ? COUNTRY_STATES[lab.country] || [] : [];
          return (
            <div
              key={idx}
              className="rounded-xl border border-neutral-gray-light p-4 grid gap-3 sm:grid-cols-2"
            >
              <TextInput
                placeholder="Laboratory Name"
                value={lab.name}
                onChange={(e) => {
                  const next = [...laboratories];
                  next[idx] = { ...lab, name: e.target.value };
                  onChange(next);
                }}
              />
              <TextInput
                placeholder="Address"
                value={lab.address}
                onChange={(e) => {
                  const next = [...laboratories];
                  next[idx] = { ...lab, address: e.target.value };
                  onChange(next);
                }}
              />
              <TextInput
                placeholder="Phone Number"
                value={lab.phone}
                onChange={(e) => {
                  const next = [...laboratories];
                  next[idx] = { ...lab, phone: e.target.value };
                  onChange(next);
                }}
              />
              <TextInput
                type="email"
                placeholder="E-mail Address"
                value={lab.email}
                onChange={(e) => {
                  const next = [...laboratories];
                  next[idx] = { ...lab, email: e.target.value };
                  onChange(next);
                }}
              />
              <SelectInput
                value={lab.country}
                onChange={(e) => {
                  const next = [...laboratories];
                  next[idx] = { ...lab, country: e.target.value, stateRegion: '' };
                  onChange(next);
                }}
              >
                <option value="">Select Country</option>
                {AFRICAN_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </SelectInput>
              {labStates.length > 0 ? (
                <SelectInput
                  value={lab.stateRegion}
                  onChange={(e) => {
                    const next = [...laboratories];
                    next[idx] = { ...lab, stateRegion: e.target.value };
                    onChange(next);
                  }}
                >
                  <option value="">Select State/Region</option>
                  {labStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </SelectInput>
              ) : (
                <TextInput
                  placeholder="State/Region"
                  value={lab.stateRegion}
                  onChange={(e) => {
                    const next = [...laboratories];
                    next[idx] = { ...lab, stateRegion: e.target.value };
                    onChange(next);
                  }}
                />
              )}
              {laboratories.length > 1 && (
                <button
                  type="button"
                  className="text-xs text-brand-red-600 font-semibold sm:col-span-2 text-left"
                  onClick={() => onChange(laboratories.filter((_, i) => i !== idx))}
                >
                  Remove laboratory
                </button>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="text-xs font-bold text-brand-navy-900 hover:underline"
          onClick={() =>
            onChange([
              ...laboratories,
              {
                name: '',
                address: '',
                phone: '',
                email: '',
                country: '',
                stateRegion: '',
              },
            ])
          }
        >
          + Add laboratory
        </button>
      </div>
    </div>
  );
}

export function ProceduresBlock({
  procedures,
  onChange,
}: {
  procedures: ResearchFormState['research']['procedures'];
  onChange: (p: ResearchFormState['research']['procedures']) => void;
}) {
  return (
    <div className="mb-6">
      <FieldLabel required>Analytical Procedures</FieldLabel>
      <div className="space-y-3 mt-2">
        {procedures.map((p, idx) => (
          <div key={idx} className="grid sm:grid-cols-4 gap-2">
            <TextInput
              placeholder="Procedure name"
              value={p.name}
              onChange={(e) => {
                const next = [...procedures];
                next[idx] = { ...p, name: e.target.value };
                onChange(next);
              }}
            />
            <TextInput
              placeholder="No. of Samples"
              value={p.noOfSamples}
              onChange={(e) => {
                const next = [...procedures];
                next[idx] = { ...p, noOfSamples: e.target.value };
                onChange(next);
              }}
            />
            <TextInput
              placeholder="Average Cost"
              value={p.averageCost}
              onChange={(e) => {
                const next = [...procedures];
                next[idx] = { ...p, averageCost: e.target.value };
                onChange(next);
              }}
            />
            <div className="flex gap-2">
              <SelectInput
                value={p.currency}
                onChange={(e) => {
                  const next = [...procedures];
                  next[idx] = {
                    ...p,
                    currency: e.target.value as 'USD' | 'Local',
                  };
                  onChange(next);
                }}
              >
                <option value="USD">USD</option>
                <option value="Local">Local</option>
              </SelectInput>
              {procedures.length > 1 && (
                <button
                  type="button"
                  className="text-xs text-brand-red-600 font-semibold"
                  onClick={() => onChange(procedures.filter((_, i) => i !== idx))}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="text-xs font-bold text-brand-navy-900 hover:underline"
          onClick={() =>
            onChange([
              ...procedures,
              { name: '', noOfSamples: '', averageCost: '', currency: 'USD' },
            ])
          }
        >
          + Add procedure
        </button>
      </div>
    </div>
  );
}
