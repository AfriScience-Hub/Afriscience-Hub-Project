'use client';

const WHY_ITEMS = [
  { emoji: '🌍', title: 'Pan-African Impact', desc: 'Your contributions reach scientists and innovators across 54 countries.' },
  { emoji: '🤝', title: 'Network Growth', desc: 'Build connections with leading minds in African science and technology.' },
  { emoji: '📜', title: 'Certification', desc: 'Receive official volunteer certificates and recognition for your service.' },
  { emoji: '🚀', title: 'Skill Development', desc: 'Gain new skills in mentoring, event management, and community building.' },
];

export function WhyVolunteer() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-neutral-black mb-2">Why Volunteer With Us?</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Volunteering with AfriScienceHub is more than giving back — it's building Africa's future.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_ITEMS.map((item, idx) => (
          <div key={idx} className="p-6 rounded-xl bg-neutral-bg-light text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{item.emoji}</div>
            <h3 className="font-bold text-neutral-black mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
