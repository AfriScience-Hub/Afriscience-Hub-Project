'use client';

interface InterestsTabProps {
  interests: string;
  onInterestsChange: (v: string) => void;
}

export function InterestsTab({ interests, onInterestsChange }: InterestsTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Interests</h3>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Your Interests (Fields)</label>
        <textarea value={interests} onChange={e => onInterestsChange(e.target.value)} rows={4} placeholder="e.g., Renewable Energy, Sustainable Agriculture, Climate Change, Innovation, Technology for Development" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none" />
        <p className="text-xs text-neutral-gray-medium mt-1">Separate multiple interests with commas</p>
      </div>

      <div className="rounded-lg bg-neutral-bg-light border border-neutral-gray-light p-6">
        <h4 className="font-medium text-neutral-black mb-3">Current Interests</h4>
        <div className="flex flex-wrap gap-2">
          {interests.split(',').map((interest, idx) => (
            interest.trim() && (
              <span key={idx} className="px-3 py-1.5 rounded-full bg-brand-navy-100 text-brand-navy-900 text-sm">
                {interest.trim()}
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
