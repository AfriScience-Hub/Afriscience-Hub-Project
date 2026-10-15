'use client';

import React from 'react';
import { Link2, Linkedin, Instagram, Facebook } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';
import LinkInput from './LinkInput';
import { POSITION_OPTIONS, type AwardFormState } from '../data';

interface AwardDetailsSectionProps {
  value: AwardFormState;
  onChange: (patch: Partial<AwardFormState>) => void;
}

const SUMMARY_MAX = 500;
const selectCls = 'w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer appearance-none';

/**
 * Section 3 — Award Details: position dropdown, work summary, work link
 * and the four social media links (validated once filled).
 */
export default function AwardDetailsSection({ value, onChange }: AwardDetailsSectionProps) {
  const setSocial = (key: keyof AwardFormState['socials'], v: string) =>
    onChange({ socials: { ...value.socials, [key]: v } });

  return (
    <CollapsibleSection number={3} title="Award Details" subtitle="Provide additional information about the award.">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="award-position" className="text-xs font-medium text-neutral-black block mb-1.5">
              Award Level or Position (Optional)
            </label>
            <select id="award-position" value={value.position} onChange={(e) => onChange({ position: e.target.value })} className={selectCls}>
              <option value="">Select award level or position</option>
              {POSITION_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="work-summary" className="text-xs font-medium text-neutral-black block mb-1.5">
            Work Summary (Optional)
          </label>
          <textarea
            id="work-summary"
            rows={3}
            value={value.summary}
            onChange={(e) => onChange({ summary: e.target.value.slice(0, SUMMARY_MAX) })}
            maxLength={SUMMARY_MAX}
            placeholder="Write a short paragraph about the recipient's work, achievements or contributions..."
            className="w-full px-3 py-2.5 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] resize-y min-h-[80px]"
          />
          <p className="text-[10px] text-neutral-gray-medium text-right mt-1">{value.summary.length} / {SUMMARY_MAX}</p>
        </div>

        <LinkInput
          id="work-link"
          label="Work Link (Optional)"
          value={value.workLink}
          onChange={(v) => onChange({ workLink: v })}
          placeholder="e.g. https://example.com/project"
          leading={<Link2 className="h-4 w-4 text-neutral-gray-medium" />}
        />

        <div>
          <p className="text-xs font-medium text-neutral-black mb-1.5">Social Media (Optional)</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <LinkInput
              id="social-linkedin"
              label="LinkedIn"
              value={value.socials.linkedin}
              onChange={(v) => setSocial('linkedin', v)}
              placeholder="e.g. https://www.linkedin.com/in/username"
              leading={<Linkedin className="h-4 w-4 text-blue-600" />}
              leadingCls="bg-blue-50"
            />
            <LinkInput
              id="social-twitter"
              label="Twitter / X"
              value={value.socials.twitter}
              onChange={(v) => setSocial('twitter', v)}
              placeholder="e.g. https://x.com/username"
              leading={<span className="text-xs font-bold text-black">X</span>}
              leadingCls="bg-neutral-100"
            />
            <LinkInput
              id="social-instagram"
              label="Instagram"
              value={value.socials.instagram}
              onChange={(v) => setSocial('instagram', v)}
              placeholder="e.g. https://instagram.com/username"
              leading={<Instagram className="h-4 w-4 text-pink-600" />}
              leadingCls="bg-pink-50"
            />
            <LinkInput
              id="social-facebook"
              label="Facebook"
              value={value.socials.facebook}
              onChange={(v) => setSocial('facebook', v)}
              placeholder="e.g. https://facebook.com/username"
              leading={<Facebook className="h-4 w-4 text-blue-500" />}
              leadingCls="bg-blue-50"
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
