import { SERVICES } from '../data';

export default function ServicesSection() {
  return (
    <div className="py-24 sm:py-32 bg-neutral-bg-light">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">What We Do</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-gray-dark">
            AfriScience Hub® offers solutions in diverse scientific & technological sectors.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {SERVICES.map((service, index) => (
            <div key={index} className="flex gap-6 p-6 rounded-2xl bg-white hover:shadow-md transition-all border border-neutral-gray-light">
              <div className="flex-none">
                <div className="h-12 w-12 rounded-lg bg-brand-red-600/10 flex items-center justify-center text-brand-red-600">
                  <service.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-navy-900 mb-2">{service.title}</h3>
                <p className="text-neutral-gray-dark mb-4">{service.description}</p>
                {service.details && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-neutral-gray-dark">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-red-600 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
