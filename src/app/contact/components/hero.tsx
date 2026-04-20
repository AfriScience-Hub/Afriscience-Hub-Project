'use client';

export default function Hero() {
  return (
    <div className="relative w-full h-140 lg:h-180 bg-[#071D35]">
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
        
        <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
          We&apos;d love to hear from you. Reach out to us for inquiries, partnerships, or support.
        </p>
      </div>
    </div>
  );
}
