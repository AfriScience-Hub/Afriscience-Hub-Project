'use client';

import type { BreakdownSection, ImpactStory } from '@/app/data/impactData';

function buildSections(story: ImpactStory): BreakdownSection[] {
  if (story.program === 'Career Support' && story.careerDetails) {
    const d = story.careerDetails;
    return [
      { title: 'Career Path', text: story.careerPath },
      { title: 'Career Objectives', bullets: d.careerObjectives },
      { title: 'Career Requirements', bullets: d.careerRequirements },
      { title: 'Protocols Funded by AfriScience Hub', bullets: d.protocolsFunded },
      { title: 'Expected Career Impacts', bullets: d.expectedCareerImpacts },
    ];
  }

  if (story.program === 'Research Support' && story.researchDetails) {
    const d = story.researchDetails;
    return [
      { title: 'Research Title', text: story.researchTitle },
      { title: 'Research Aim', text: d.researchAim },
      { title: 'Research Objectives', bullets: d.researchObjectives },
      { title: 'Expected Outcomes', bullets: d.expectedOutcomes },
      { title: 'Sampling & Collection', bullets: d.samplingCollection },
      { title: 'Research Materials', bullets: d.researchMaterials },
      { title: 'Analytical Procedures', bullets: d.analyticalProcedures },
      { title: 'Protocols Funded by AfriScience Hub', bullets: d.protocolsFunded },
      { title: 'Result Interpretation', bullets: d.resultInterpretation },
      { title: 'Research Summary', text: d.researchSummary },
      { title: 'Possible Research-Impact Areas', bullets: d.possibleImpactAreas },
    ];
  }

  if (story.program === 'Educational Scholarship' && story.scholarshipDetails) {
    const d = story.scholarshipDetails;
    return [
      { title: 'Problems before Scholarship Intervention', bullets: d.problemsBefore },
      { title: 'Proposed funding by AfriScience Hub', bullets: d.proposedFunding },
      { title: 'Expected Annual Outcome', bullets: d.expectedAnnualOutcome },
      { title: 'Outcome After Intervention', bullets: d.outcomeAfter },
    ];
  }

  return [];
}

export default function ImpactBreakdown({ story }: { story: ImpactStory }) {
  const sections = buildSections(story);
  if (!sections.length) return null;

  const bgColors = [
    'bg-blue-50',
    'bg-purple-50',
    'bg-green-50',
    'bg-amber-50',
    'bg-rose-50',
    'bg-teal-50',
    'bg-indigo-50',
    'bg-orange-50',
    'bg-cyan-50',
    'bg-pink-50',
  ];

  return (
    <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
      <h2 className="text-xl font-bold text-neutral-black mb-5">Impact Breakdown</h2>
      <div className="space-y-4">
        {sections.map((section, i) => (
          <div
            key={section.title}
            className={`rounded-xl p-4 sm:p-5 ${bgColors[i % bgColors.length]}`}
          >
            <h3 className="font-bold text-neutral-black mb-2">{section.title}</h3>
            {section.text && (
              <p className="text-sm text-neutral-gray-dark leading-relaxed">{section.text}</p>
            )}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-1.5">
                {section.bullets.map((b) => (
                  <li key={b} className="text-sm text-neutral-gray-dark leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
