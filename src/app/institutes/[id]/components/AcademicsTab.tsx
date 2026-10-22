'use client';

import SchoolAcademicsTab from './SchoolAcademicsTab';
import UniversityAcademicsTab from './UniversityAcademicsTab';

interface Institute {
  [key: string]: any;
}

/**
 * Schools get the term-based Academics & Fees layout; universities keep the
 * programme-level layout with faculties and cut-off marks.
 */
export default function AcademicsTab({ institute }: { institute: Institute }) {
  if (institute.type === 'University') {
    return <UniversityAcademicsTab institute={institute} />;
  }
  return <SchoolAcademicsTab institute={institute} />;
}
