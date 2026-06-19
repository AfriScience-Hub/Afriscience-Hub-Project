import { MISSION_ITEMS } from '../data';

export default function MissionVision() {
  return (
    <div className="py-24 sm:py-32 bg-neutral-bg-light">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-red-600">Our Purpose</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">Mission & Vision</p>
          <p className="mt-6 text-lg leading-8 text-neutral-gray-dark">
            As a scientific & technological hub, we envision becoming a globally recognized platform, and a frontier network in science & technology space.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {MISSION_ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-brand-navy-900">
                  <item.icon className="h-5 w-5 flex-none text-brand-red-600" aria-hidden="true" />
                  {item.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-gray-dark">
                  <p className="flex-auto">{item.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
