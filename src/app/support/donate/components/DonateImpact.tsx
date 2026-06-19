'use client';

const IMPACT_ITEMS = [
  { amount: '$25', impact: 'Provides lab supplies for one student researcher for a week.', emoji: '🧪' },
  { amount: '$100', impact: 'Sponsors a student\'s participation in a national science competition.', emoji: '🎓' },
  { amount: '$500', impact: 'Funds a prototyping grant for an early-stage African innovation.', emoji: '🚀' },
];

export function DonateImpact() {
  return (
    <section className="bg-neutral-bg-light py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Your Impact</h2>
          <p className="text-slate-500">See what your donation can achieve.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {IMPACT_ITEMS.map((item, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl bg-white border border-neutral-gray-light">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <div className="text-2xl font-extrabold text-brand-red-600 mb-2">{item.amount}</div>
              <p className="text-sm text-slate-500">{item.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
