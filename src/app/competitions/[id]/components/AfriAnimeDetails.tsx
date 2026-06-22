'use client';

import { FileText, ClipboardCheck, ListChecks, ShieldCheck, Scale, Gift, AlertTriangle, CheckCircle, Trophy } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import type { Competition } from '../../data';

interface AfriAnimeDetailsProps {
  comp: Competition;
  undertakingChecked: boolean;
  onUndertakingChange: (v: boolean) => void;
  onApply: () => void;
}

const DESCRIPTION = 'Afri - Anime aims at giving Africans a global platform to showcase their intellectual prowess in different scientific and technological fields of study. In this competition, contestants are required to pick a topic of their choice from any science discipline and explain it completely using animation. When creating animation, contestants should pay attention to originality, scientific accuracy, concept clarity, animation\u2019s technical qualities, creativity and audience engagement. Join the competition for an opportunity to gain global recognition and become a champion of Africa.';

const REGISTRATION_REQUIREMENTS = [
  'Must be registered with AfriScience Hub',
  'Valid government ID card',
  'Must be 18 years or above',
];

const RULES = [
  'Animation screen time of 3 minutes max.',
  'Video format only (MP4, WebM, MOV, AVI)',
  'Must be scientifically accurate',
  'Animation must be an original work created by the contestant',
  'Animation contents must not violate any copyright or other third-party rights',
  'Animation language can be in English, French, or any other language spoken in Africa with English subtitles',
  'Contents should not be offensive and discriminatory',
  'Contestants must submit their work before submission deadline',
  'Contestants must consent to the terms of service and undertake to comply with them',
];

const CONSENT = 'By applying, you grant AfriScience Hub the right to further modify, screen, publish, and promote your entry across our platforms for educational and outreach purposes. Your personal information will be handled in accordance with our privacy policy.';

const REWARDS = [
  { position: '1st Position', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', items: ['Gold Medal', '$1,000 Grand Prize', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '2nd Position', color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', items: ['Silver Medal', '$800 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '3rd Position', color: 'text-amber-700', bg: 'bg-orange-50', border: 'border-orange-200', items: ['Bronze Medal', '$500 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
];

const UNDERTAKING = 'I confirm that the work I will submit is entirely my own original creation, that all scientific contents are accurate to the best of my knowledge, that the work does not violate any copyright or third party rights, and that I accept the terms and conditions of this competition.';

export function AfriAnimeDetails({ comp, undertakingChecked, onUndertakingChange, onApply }: AfriAnimeDetailsProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-navy-900" /> Competition Description
        </h3>
        <p className="text-neutral-gray-dark leading-relaxed">{DESCRIPTION}</p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-brand-red-600" /> Registration Requirements
        </h3>
        <ul className="space-y-2">
          {REGISTRATION_REQUIREMENTS.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              {req}
            </li>
          ))}
          <li className="flex items-start gap-3 text-sm text-neutral-gray-dark">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            Must be an African currently residing in ({comp.country})
          </li>
          <li className="flex items-start gap-3 text-sm text-neutral-gray-dark">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            Registration Fee of {comp.registrationFee}
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-brand-navy-900" /> Rules
        </h3>
        <ol className="space-y-2 list-decimal list-inside">
          {RULES.map((rule, idx) => (
            <li key={idx} className="text-sm text-neutral-gray-dark">{rule}</li>
          ))}
        </ol>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Screening & Selection
        </h3>
        <div className="space-y-3 text-sm text-neutral-gray-dark leading-relaxed">
          <p>All submitted entries will be reviewed and scored by our competition panel in the following areas:</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>Scientific accuracy</li>
            <li>Concept clarity</li>
            <li>Creativity</li>
            <li>Technical quality</li>
            <li>Audience Engagement</li>
          </ul>
          <p>Top 30 finalists will be listed under the &apos;Voting&apos; section of the platform after four (4) weeks of submission deadline.</p>
          <p>Public votes will be used to determine the final performance of finalists.</p>
          <p>At the end of voting sessions, winners will be ranked, announced and rewarded under the &apos;Awards&apos; section of the platform.</p>
          <p>When a tie exists either in the 1st, 2nd or 3rd positions, it will be resolved by further extending the voting window for affected finalists by 48 hours.</p>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Scale className="h-5 w-5 text-neutral-gray-dark" /> Consent
        </h3>
        <p className="text-sm text-neutral-gray-dark leading-relaxed">{CONSENT}</p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5 text-amber-500" /> Reward
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {REWARDS.map((reward) => (
            <div key={reward.position} className={`rounded-xl border-2 ${reward.border} ${reward.bg} p-4`}>
              <h4 className={`text-sm font-bold ${reward.color} mb-2`}>{reward.position}</h4>
              <ul className="space-y-1.5">
                {reward.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-gray-dark">
                    <Trophy className={`h-3 w-3 ${reward.color} flex-shrink-0 mt-0.5`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-red-50 rounded-xl p-6 shadow-sm border border-brand-red-200">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-brand-red-600" /> Undertaking Remark
        </h3>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={undertakingChecked}
            onChange={(e) => onUndertakingChange(e.target.checked)}
            className="mt-1 rounded border-brand-red-300 text-brand-red-600 focus:ring-brand-red-600"
          />
          <span className="text-sm text-neutral-gray-dark leading-relaxed">{UNDERTAKING}</span>
        </label>
      </section>

      <div className="pt-2">
        <Button size="lg" className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-6 text-lg" disabled={!undertakingChecked} onClick={onApply}>
          <Trophy className="h-5 w-5 mr-2" /> Apply Now ({comp.registrationFee})
        </Button>
        {!undertakingChecked && (
          <p className="text-xs text-brand-red-600 text-center mt-2">Please accept the Undertaking Remark above to enable the Apply button.</p>
        )}
      </div>
    </div>
  );
}
