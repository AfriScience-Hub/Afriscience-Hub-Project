export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-brand-navy-900 py-24 sm:py-32">
      <img
        src="https://images.unsplash.com/photo-1693932038683-7c35401f5307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2NpZW5jZSUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9uJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NzA3NzUzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="African Science Technology"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Who We Are</h2>
          <p className="mt-6 text-lg leading-8 text-neutral-gray-light text-justify">
            AfriScience Hub® is a scientific and technological network aimed at providing insightful science & technology based solutions to individuals, professionals, institutions and corporations.
          </p>
          <p className="mt-4 text-lg leading-8 text-neutral-gray-light text-justify">
            Through diverse applications of science & technology, our actions serve to inform, innovate, train, award, impact and invest in our users, and societies at large.
          </p>
          <p className="mt-4 text-lg leading-8 text-neutral-gray-light text-justify">
            Rooted in Africa, we aim to contribute towards driving innovation and growth throughout the continent with enlightenment programmes/schemes.
          </p>
        </div>
      </div>
    </div>
  );
}
