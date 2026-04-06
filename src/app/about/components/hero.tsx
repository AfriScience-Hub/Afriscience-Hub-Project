'use client';

export default function Hero() {
  return (
    <div className="relative w-full h-240 lg:h-180 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Who We Are</h1>
        
        <div className="space-y-6 text-white text-lg leading-relaxed">
          <p>
            AfriScience Hub® is a scientific and technological network aimed at providing 
            insightful science & technology based solutions to individuals, professionals, 
            institutions and corporations.
          </p>
          
          <p>
            Through diverse applications of science & technology, our actions serve to inform, 
            innovate, train, award, impact and invest in our users, and societies at large.
          </p>
          
          <p>
            Rooted in Africa, we aim to contribute towards driving innovation and growth 
            throughout the continent with enlightenment programmes/schemes.
          </p>
        </div>
      </div>
    </div>
  );
}
