export type VolunteerStatus = 'Submitted' | 'Approved' | 'Rejected' | 'Pending';

export interface VolunteerRecord {
  id: string;
  userId: string;
  qualification: string;
  country: string;
  state: string;
  tasks: string[];
  compensations: string[];
  submittedOn: string;
  submittedTime: string;
  status: VolunteerStatus;
}

export const VOLUNTEER_QUALIFICATIONS = [
  'High school/secondary education',
  'Associate degrees',
  'Diplomas/certificate programs',
  "Bachelor's degree",
  "Master's degree",
  'Doctoral degree',
  'Others',
];

export const VOLUNTEER_TASKS = [
  'Registering institutes and specialist centers',
  'Referring scientists and technologists',
  'Targeted advertisements',
  'Conducting Surveys',
  'Sourcing sponsors',
  'Supervision',
  'Coordination and Hosting',
];

export const VOLUNTEER_COMPENSATIONS = [
  'Scholarships',
  'Job offers',
  'Recommendations',
];

export const AFRICAN_COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
  'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo', "Côte d'Ivoire",
  'DR Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia',
  'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia',
  'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe',
  'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan',
  'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe',
];