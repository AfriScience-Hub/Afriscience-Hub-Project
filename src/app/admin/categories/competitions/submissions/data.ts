export interface CompetitionSubmission {
  id: string;
  /** Competition entry title (only shown in the full-submission view page) */
  title: string;
  participant: string;
  email: string;
  contact: string;
  /** Competition type, e.g. Afri-Anime */
  type: string;
  category: string;
  country: string;
  /** ISO-3166 alpha-2 code used for the country flag (flagcdn.com) */
  flagCode: string;
  /** Display date, e.g. "May 27, 2025" */
  submittedOn: string;
  /** Display time, e.g. "10:24 AM" */
  submittedTime: string;
  /** Full ISO datetime used for sorting */
  submittedISO: string;
  description: string;
  message: string;
  fileType: string;
  cover: string;
  gallery: string[];
  avatar: string;
  /** 'Scored' once a judge has scored it, otherwise 'Pending' */
  status: 'Scored' | 'Pending';
  /** Name of the judge who scored it (null while pending) */
  scoredBy: string | null;
  /** Judge score 0-100 (null while pending) */
  avgScore: number | null;
}

export interface CompetitionJudge {
  id: string;
  name: string;
  email: string;
  expertise: string;
  avatar: string;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`;

const COVER_A = img('photo-1509391366360-2e959784a276');
const COVER_B = img('photo-1497486751825-1233686d5d80');
const COVER_C = img('photo-1507525428034-b723cf961d3e');
const COVER_D = img('photo-1532094349884-543bc11b234d');
const COVER_E = img('photo-1466611653911-95081537e5b7');
const COVER_F = img('photo-1500382017468-9049fed747ef');

const GALLERY = [COVER_A, COVER_B, COVER_C, COVER_D, COVER_E, COVER_F];

const AVATAR_IDS = [
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1560250097-0b93528c311a',
  'photo-1580489944761-15a19d654956',
  'photo-1519085360753-af0119f7cbe7',
  'photo-1544005313-94ddf0286df2',
  'photo-1506794778202-cad84cf45f1d',
];

export const COUNTRY_FLAG_CODES: Record<string, string> = {
  Nigeria: 'ng',
  Ghana: 'gh',
  Kenya: 'ke',
  'South Africa': 'za',
  Egypt: 'eg',
  Rwanda: 'rw',
  Uganda: 'ug',
};

export const flagUrl = (code: string) => `https://flagcdn.com/w40/${code}.png`;

const sub = (opts: {
  id: string; title: string; participant: string; email: string; contact: string;
  type: string; category: string; country: string;
  submittedOn: string; submittedTime: string; submittedISO: string;
  description: string; message: string; fileType: string;
  coverIndex: number; avatarIndex: number;
  scoredBy?: string; avgScore?: number;
}): CompetitionSubmission => ({
  id: opts.id,
  title: opts.title,
  participant: opts.participant,
  email: opts.email,
  contact: opts.contact,
  type: opts.type,
  category: opts.category,
  country: opts.country,
  flagCode: COUNTRY_FLAG_CODES[opts.country] ?? 'un',
  submittedOn: opts.submittedOn,
  submittedTime: opts.submittedTime,
  submittedISO: opts.submittedISO,
  description: opts.description,
  message: opts.message,
  fileType: opts.fileType,
  cover: GALLERY[opts.coverIndex % GALLERY.length],
  gallery: [
    GALLERY[opts.coverIndex % GALLERY.length],
    GALLERY[(opts.coverIndex + 1) % GALLERY.length],
    GALLERY[(opts.coverIndex + 2) % GALLERY.length],
    GALLERY[(opts.coverIndex + 3) % GALLERY.length],
  ],
  avatar: img(AVATAR_IDS[opts.avatarIndex % AVATAR_IDS.length]),
  status: opts.scoredBy ? 'Scored' : 'Pending',
  scoredBy: opts.scoredBy ?? null,
  avgScore: opts.avgScore ?? null,
});

export const SUBMISSIONS: CompetitionSubmission[] = [
  sub({ id: 's1', title: 'Solar Kids', participant: 'Chidera Okafor', email: 'chideraokafor@gmail.com', contact: '+234 803 123 4567', type: 'Afri-Anime', category: 'Primary School', country: 'Nigeria', submittedOn: 'May 27, 2025', submittedTime: '10:24 AM', submittedISO: '2025-05-27T10:24', description: 'A short animation showing how children in rural areas can use solar energy to power their schools and homes.', message: 'This animation shows how solar energy can solve power problems in rural schools. I hope it inspires more children to care about clean energy.', fileType: 'Video (MP4 - 45 MB)', coverIndex: 0, avatarIndex: 1, scoredBy: 'Dr. Adaeze Nwankwo', avgScore: 85.5 }),
  sub({ id: 's2', title: 'The Clean Village', participant: 'Amina Yusuf', email: 'amina.yusuf@gmail.com', contact: '+234 806 555 0192', type: 'Afri-Anime', category: 'Junior Secondary', country: 'Ghana', submittedOn: 'May 26, 2025', submittedTime: '04:15 PM', submittedISO: '2025-05-26T16:15', description: 'An animated story about a village that turns waste into clean energy for everyone.', message: 'I wanted to show that even small villages can solve big waste problems when communities work together.', fileType: 'Video (MP4 - 38 MB)', coverIndex: 1, avatarIndex: 2, scoredBy: 'Samuel Osei', avgScore: 78.2 }),
  sub({ id: 's3', title: 'Green Heroes', participant: 'Emeka Daniel', email: 'emekadaniel@gmail.com', contact: '+233 244 118 765', type: 'Afri-Anime', category: 'Senior Secondary', country: 'Ghana', submittedOn: 'May 25, 2025', submittedTime: '02:30 PM', submittedISO: '2025-05-25T14:30', description: 'A superhero trio that protects African forests from illegal deforestation.', message: 'My entry celebrates the young activists protecting our forests every day.', fileType: 'Video (MP4 - 52 MB)', coverIndex: 2, avatarIndex: 3 }),
  sub({ id: 's4', title: 'Tech for a Better Africa', participant: 'Favour Uchenna', email: 'favour.uche@gmail.com', contact: '+254 711 204 338', type: 'Afri-Presentations', category: 'Undergraduate', country: 'South Africa', submittedOn: 'May 24, 2025', submittedTime: '11:10 AM', submittedISO: '2025-05-24T11:10', description: 'A presentation on how low-cost sensors can monitor water quality across East Africa.', message: 'My project proposes an affordable sensor network that communities can build themselves.', fileType: 'Presentation (PPTX - 15 MB)', coverIndex: 3, avatarIndex: 4 }),
  sub({ id: 's5', title: 'Save Our Oceans', participant: 'David Nnaji', email: 'davidnnaji@gmail.com', contact: '+20 100 442 7781', type: 'Afri-Memes', category: 'Primary School', country: 'Egypt', submittedOn: 'May 23, 2025', submittedTime: '05:45 PM', submittedISO: '2025-05-23T17:45', description: 'A series of funny but powerful memes about plastic pollution in African oceans.', message: 'Memes make serious topics fun to share — I want my friends to stop using single-use plastics.', fileType: 'Image Set (JPG - 8 MB)', coverIndex: 4, avatarIndex: 5, scoredBy: 'Grace Mutiso', avgScore: 91.0 }),
  sub({ id: 's6', title: 'AI for Farming', participant: 'Grace Bello', email: 'gracebello@gmail.com', contact: '+234 701 442 8890', type: 'Afri-Presentations', category: 'Undergraduate', country: 'Nigeria', submittedOn: 'May 22, 2025', submittedTime: '03:20 PM', submittedISO: '2025-05-22T15:20', description: 'A pitch for an AI assistant that helps smallholder farmers plan planting and irrigation.', message: 'I believe AI should serve farmers first — my proposal runs on basic smartphones.', fileType: 'Presentation (PPTX - 11 MB)', coverIndex: 5, avatarIndex: 6, scoredBy: 'Prof. Chika Anyanwu', avgScore: 88.3 }),
  sub({ id: 's7', title: 'My Healthy Community', participant: 'Ikemefuna Obi', email: 'ikemefunaobi@gmail.com', contact: '+233 20 663 4521', type: 'Afri-MySpace', category: 'Junior Secondary', country: 'Rwanda', submittedOn: 'May 21, 2025', submittedTime: '09:18 AM', submittedISO: '2025-05-21T09:18', description: 'A profile page documenting clean-up and vaccination drives in my neighbourhood.', message: 'My space tells the real story of my community health volunteers.', fileType: 'Web Page (HTML - 4 MB)', coverIndex: 1, avatarIndex: 7 }),
  sub({ id: 's8', title: 'Waste to Wealth', participant: 'Susan Adeyemi', email: 'susanadeyemi@gmail.com', contact: '+256 772 330 118', type: 'Afri-Innovation', category: 'Senior Secondary', country: 'Uganda', submittedOn: 'May 20, 2025', submittedTime: '01:50 PM', submittedISO: '2025-05-20T13:50', description: 'An animated film following a young inventor who recycles electronic waste into solar lamps.', message: 'E-waste is everywhere — my film imagines what happens when we see it as a resource.', fileType: 'Video (MP4 - 41 MB)', coverIndex: 3, avatarIndex: 0, scoredBy: 'Dr. Adaeze Nwankwo', avgScore: 82.7 }),
  sub({ id: 's9', title: 'Water is Life', participant: 'Chidi Eze', email: 'chidi.eze@gmail.com', contact: '+234 813 907 2244', type: 'Afri-Memes', category: 'Primary School', country: 'Nigeria', submittedOn: 'May 19, 2025', submittedTime: '08:40 AM', submittedISO: '2025-05-19T08:40', description: 'A meme campaign encouraging classmates to drink clean water instead of sugary drinks.', message: 'Clean water saved my village last year — this meme is my thank-you.', fileType: 'Image Set (JPG - 6 MB)', coverIndex: 4, avatarIndex: 1, scoredBy: 'Ibrahim Suleiman', avgScore: 74.9 }),
  sub({ id: 's10', title: 'Solar Farm Dream', participant: 'Fatima Bello', email: 'fatima.bello@gmail.com', contact: '+20 122 337 1109', type: 'Afri-Presentations', category: 'Undergraduate', country: 'Egypt', submittedOn: 'May 18, 2025', submittedTime: '12:05 PM', submittedISO: '2025-05-18T12:05', description: 'A feasibility study for community-owned solar farms in Upper Egypt.', message: 'Communities that own their power can reinvest the savings into schools.', fileType: 'Document (PDF - 12 MB)', coverIndex: 0, avatarIndex: 2 }),
  sub({ id: 's11', title: 'My Science Lab', participant: 'Kwame Mensah', email: 'kwame.mensah@gmail.com', contact: '+233 27 884 3390', type: 'Afri-MySpace', category: 'Junior Secondary', country: 'Ghana', submittedOn: 'May 17, 2025', submittedTime: '04:30 PM', submittedISO: '2025-05-17T16:30', description: 'A virtual lab notebook where I document every experiment I do at home.', message: 'Science starts at home — my lab space is just a table and curiosity.', fileType: 'Web Page (HTML - 3 MB)', coverIndex: 2, avatarIndex: 3, scoredBy: 'Nana Ama Owusu', avgScore: 80.4 }),
  sub({ id: 's12', title: 'Beat the Drought', participant: 'Zainab Osei', email: 'zainab.osei@gmail.com', contact: '+27 71 330 9987', type: 'Afri-Memes', category: 'Senior Secondary', country: 'South Africa', submittedOn: 'May 16, 2025', submittedTime: '10:15 AM', submittedISO: '2025-05-16T10:15', description: 'A meme series teaching water-saving tricks that any household can follow.', message: 'Drought is not funny, but humour helps people remember the solutions.', fileType: 'Image Set (JPG - 9 MB)', coverIndex: 5, avatarIndex: 4 }),
  sub({ id: 's13', title: 'Plastic Free Lagos', participant: 'Tunde Bakare', email: 'tunde.bakare@gmail.com', contact: '+234 802 116 4477', type: 'Afri-MySpace', category: 'Undergraduate', country: 'Nigeria', submittedOn: 'May 15, 2025', submittedTime: '02:55 PM', submittedISO: '2025-05-15T14:55', description: 'A campaign page tracking plastic waste collected by volunteers across Lagos.', message: 'Every Saturday our volunteers collect more plastic — my space logs it all.', fileType: 'Web Page (HTML - 5 MB)', coverIndex: 1, avatarIndex: 5 }),
  sub({ id: 's14', title: 'Stars Above Us', participant: 'Amara Nwosu', email: 'amara.nwosu@gmail.com', contact: '+254 733 601 2288', type: 'Afri-Anime', category: 'Primary School', country: 'Kenya', submittedOn: 'May 14, 2025', submittedTime: '11:35 AM', submittedISO: '2025-05-14T11:35', description: 'An animated journey through the African night sky guided by ancient star stories.', message: 'Our ancestors navigated by these stars — I want kids to look up again.', fileType: 'Video (MP4 - 36 MB)', coverIndex: 2, avatarIndex: 6, scoredBy: 'Samuel Osei', avgScore: 93.1 }),
  sub({ id: 's15', title: 'Healing Rivers', participant: 'Ngozi Umeh', email: 'ngozi.umeh@gmail.com', contact: '+20 100 998 2214', type: 'Afri-Presentations', category: 'Senior Secondary', country: 'Egypt', submittedOn: 'May 13, 2025', submittedTime: '03:10 PM', submittedISO: '2025-05-13T15:10', description: 'A presentation on phytoremediation plants that clean polluted river systems.', message: 'Rivers can heal themselves if we give them the right plants and time.', fileType: 'Presentation (PPTX - 9 MB)', coverIndex: 3, avatarIndex: 7 }),
  sub({ id: 's16', title: 'Healthy Plates', participant: 'Yaw Boateng', email: 'yaw.boateng@gmail.com', contact: '+233 54 220 6673', type: 'Afri-MySpace', category: 'Primary School', country: 'Ghana', submittedOn: 'May 12, 2025', submittedTime: '09:05 AM', submittedISO: '2025-05-12T09:05', description: 'A recipe space sharing affordable nutritious meals my grandmother taught me.', message: 'Good food does not have to be expensive — my recipes prove it.', fileType: 'Web Page (HTML - 3 MB)', coverIndex: 5, avatarIndex: 0, scoredBy: 'Dr. Yemi Alade', avgScore: 87.6 }),
];

const judge = (id: string, name: string, email: string, expertise: string, avatarIndex: number): CompetitionJudge => ({
  id, name, email, expertise,
  avatar: img(AVATAR_IDS[avatarIndex % AVATAR_IDS.length]),
});

/** Judges appointed to each competition (by competition type). */
export const JUDGES_BY_TYPE: Record<string, CompetitionJudge[]> = {
  'Afri-Anime': [
    judge('j1', 'Dr. Adaeze Nwankwo', 'adaeze.nwankwo@afrisciencehub.org', 'Animation & Storytelling', 0),
    judge('j2', 'Samuel Osei', 'samuel.osei@afrisciencehub.org', 'Digital Media & VFX', 1),
  ],
  'Afri-Presentations': [
    judge('j3', 'Prof. Chika Anyanwu', 'chika.anyanwu@afrisciencehub.org', 'Research Methods', 2),
    judge('j4', 'Layla Haddad', 'layla.haddad@afrisciencehub.org', 'Innovation Policy', 4),
  ],
  'Afri-Memes': [
    judge('j5', 'Grace Mutiso', 'grace.mutiso@afrisciencehub.org', 'Science Communication', 6),
    judge('j6', 'Ibrahim Suleiman', 'ibrahim.suleiman@afrisciencehub.org', 'Creative Arts', 5),
  ],
  'Afri-MySpace': [
    judge('j7', 'Dr. Yemi Alade', 'yemi.alade@afrisciencehub.org', 'Youth Education', 7),
    judge('j8', 'Nana Ama Owusu', 'nana.owusu@afrisciencehub.org', 'Community Health', 3),
  ],
  'Afri-Innovation': [
    judge('j9', 'Dr. Tolu Adekunle', 'tolu.adekunle@afrisciencehub.org', 'Engineering & Prototyping', 1),
    judge('j10', 'Sarah Kimani', 'sarah.kimani@afrisciencehub.org', 'Social Impact', 6),
  ],
};

export const SUBMISSION_TYPE_OPTIONS = ['All Types', 'Afri-Anime', 'Afri-Innovation', 'Afri-Presentations', 'Afri-Memes', 'Afri-MySpace'];
export const SUBMISSION_CATEGORY_OPTIONS = ['All Categories', 'Primary School', 'Junior Secondary', 'Senior Secondary', 'Undergraduate'];
export const SUBMISSION_COUNTRY_OPTIONS = ['All Countries', 'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Rwanda', 'Uganda'];

export const SUBMISSION_STATS = [
  { label: 'Total Submissions', value: '248', iconBg: 'bg-purple-100 text-purple-600', icon: 'file' },
  { label: 'Pending Review', value: '62', iconBg: 'bg-orange-100 text-orange-600', icon: 'clock' },
  { label: 'Approved', value: '156', iconBg: 'bg-green-100 text-green-600', icon: 'check' },
  { label: 'Rejected', value: '20', iconBg: 'bg-red-100 text-red-600', icon: 'x' },
  { label: 'Finalists (Voting)', value: '12', iconBg: 'bg-indigo-100 text-indigo-600', icon: 'users' },
];
