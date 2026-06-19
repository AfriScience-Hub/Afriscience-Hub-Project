import HeroSection from './components/HeroSection';
import MissionVision from './components/MissionVision';
import CoreValues from './components/CoreValues';
import ServicesSection from './components/ServicesSection';
import TeamSection from './components/TeamSection';
import CTASection from './components/CTASection';

export default function About() {
  return (
    <div className="bg-white">
      <HeroSection />
      <MissionVision />
      <CoreValues />
      <ServicesSection />
      <TeamSection />
      <CTASection />
    </div>
  );
}
