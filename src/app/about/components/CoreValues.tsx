import { CORE_VALUES } from '../data';

export default function CoreValues() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">Our Core Values</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-gray-dark">
            Our culture is built on a foundation of strong principles that guide every interaction.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="bg-neutral-bg-light p-8 rounded-2xl border border-neutral-gray-light hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-brand-navy-100 flex items-center justify-center text-brand-red-600 mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy-900 mb-3">{value.title}</h3>
                <p className="text-neutral-gray-dark leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
