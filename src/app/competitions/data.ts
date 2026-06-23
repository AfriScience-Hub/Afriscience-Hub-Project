export interface Competition {
  id: string;
  title: string;
  type: string;
  category: string;
  country: string;
  registrationFee: string;
  deadline: string;
  image: string;
  introNote: string;
  description: string;
  registrationRequirements: string[];
  rules: string[];
  selectionScreening: string;
  consent: string;
  reward: string;
  undertakingRemark: string;
  topics: string[];
  mediaType: 'video' | 'image';
  participants: number;
}

export const COMPETITIONS: Competition[] = [
  {
    id: 'comp-1',
    title: 'Afri \u2013 Anime: Malaria Fighters',
    type: 'Afri \u2013 Anime',
    category: 'General (18+)',
    country: 'Nigeria',
    registrationFee: '$10',
    deadline: '2026-06-30',
    image: 'https://images.unsplash.com/photo-1602728114068-25257aedd285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create an animated video to explain a scientific concept of your choice. Skillfully craft your animation to be engaging and educating.',
    description: 'Afri \u2013 Anime challenges young African creatives to explain complex scientific concepts through animation and storytelling. Participants must produce a short animated video (max 5 minutes) that breaks down a scientific principle in an engaging, entertaining, and educational manner. The best entries will be screened at the AfriScience Hub Annual Summit.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must fall within the specified age category', 'Valid school/institution ID for verification', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'Animation must be original work created by the contestant.', 'All content must be scientifically accurate.', 'No copyrighted music or third-party assets without license.', 'Language must be English, French, or any African language with English subtitles.', 'Content must be appropriate for all ages within the category.'],
    selectionScreening: 'All entries will be reviewed by a panel of 5 judges comprising scientists, animators, and educators. Entries are scored on scientific accuracy (30%), creativity (25%), storytelling (25%), and technical quality (20%). Top 10 finalists will be announced two weeks after the deadline.',
    consent: 'By applying, you grant AfriScience Hub the right to screen, publish, and promote your entry across our platforms for educational purposes. Your personal information will be handled in accordance with our privacy policy.',
    reward: '$2,500 Grand Prize, $1,000 Runner-Up, $500 Third Place, plus certificates and feature on the AfriScience Hub Hall of Fame.',
    undertakingRemark: 'I confirm that the work I will submit is entirely my own original creation, that all scientific content is accurate to the best of my knowledge, and that I accept the rules and conditions of this competition.',
    topics: [],
    mediaType: 'video' as const,
    participants: 120
  },
  {
    id: 'comp-2',
    title: 'Afri \u2013 Presentations: Undergraduate Research Showcase',
    type: 'Afri \u2013 Presentations',
    category: 'Undergraduates',
    country: 'Kenya',
    registrationFee: '$10',
    deadline: '2026-07-15',
    image: 'https://images.unsplash.com/photo-1764874299006-bf4266427ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Give an audio-visual presentation to address some persisting problems that challenge the African continent, and offer possible science \u2013 based solutions for them.',
    description: 'Afri \u2013 Presentations challenges undergraduates and Graduates to present video research presentations that address pressing problems common across the African continent. Presentations should demonstrate applied scopes where integrated knowledge of different science fields is required.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be currently enrolled as an undergraduate student', 'Institutional verification letter or student ID required', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'Presentations must be delivered in English with clear audio.', 'All claims must be supported by referenced scientific literature.', 'Use of visual aids (slides, diagrams) is strongly encouraged.', 'Plagiarism will result in immediate disqualification.', 'Presenter must appear on camera for at least 50% of the presentation.'],
    selectionScreening: 'Entries reviewed by academic panel. Scored on research depth (30%), clarity of presentation (25%), cross-disciplinary integration (25%), and practical applicability (20%). Semi-finalists present live at a virtual symposium.',
    consent: 'By applying, you grant AfriScience Hub the right to publish and distribute your presentation for educational and promotional purposes. Your academic institution may be contacted for verification.',
    reward: '$3,000 Grand Prize, $1,500 Runner-Up, $750 Third Place, plus publication opportunity in the AfriScience Journal and mentorship from leading African researchers.',
    undertakingRemark: 'I confirm that my presentation is based on original research, that all references are properly cited, and that I agree to the competition rules and conditions.',
    topics: ['Combating antimicrobial resistance in sub-Saharan Africa through integrated pharmaceutical and environmental science approaches', 'Leveraging renewable energy and smart agriculture to address food security challenges across the Sahel region', 'Developing low-cost diagnostic tools for endemic tropical diseases using biomedical engineering and data science'],
    mediaType: 'video' as const,
    participants: 85
  },
  {
    id: 'comp-3',
    title: 'Afri \u2013 Memes: Science Humor Challenge',
    type: 'Afri \u2013 Memes',
    category: 'General (18+)',
    country: 'South Africa',
    registrationFee: '$7',
    deadline: '2026-05-31',
    image: 'https://images.unsplash.com/photo-1496050500305-aa04b5f00448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create a science \u2013 themed meme that is both comic and informative. Use humor to make science concepts less complex and more understandable.',
    description: 'Afri \u2013 Memes invites creative minds to produce original, science-themed memes that are funny, factually accurate, and culturally relevant to Africa. Entries should make science accessible and entertaining while maintaining accuracy.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be 18 years or older', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG, PNG, or GIF).', 'Meme must be original \u2013 no reposting existing memes.', 'Content must be scientifically accurate.', 'No offensive, discriminatory, or politically charged content.', 'Maximum of 3 entries per contestant.', 'Text must be legible and in English.'],
    selectionScreening: 'Community voting (40%) combined with panel judging (60%). Panel scores humor (30%), scientific accuracy (20%), and creativity/originality (50%).',
    consent: 'By submitting, you grant AfriScience Hub full rights to use, share, and feature your meme on all platforms with credit given to you.',
    reward: '$500 Grand Prize, $250 Runner-Up, AfriScience Hub merchandise pack for top 10 entries.',
    undertakingRemark: 'I confirm that my meme submission is entirely original, scientifically accurate, and does not infringe on any copyright or intellectual property.',
    topics: [],
    mediaType: 'image' as const,
    participants: 300
  },
  {
    id: 'comp-4',
    title: 'Afri \u2013 MySpace: Lab & Study Setup Showcase',
    type: 'Afri \u2013 MySpace',
    category: 'General (18+)',
    country: 'Ghana',
    registrationFee: '$5',
    deadline: '2026-08-15',
    image: 'https://images.unsplash.com/photo-1662117940162-b666fea153cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Showcase your working environment (station, lab, workshop, studio, hub, center, unit, etc.). Let us see the space from where you provide scientific & technological solutions.',
    description: 'Afri \u2013 MySpace celebrates the diverse spaces where African scientists, students, and innovators work. Submit a photo of your personal workspace \u2013 whether it\u2019s a home lab, university bench, study desk, or field station.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be 18 years or older', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG or PNG, minimum 1080px width).', 'Photo must be of your actual workspace \u2013 no stock photos.', 'Include a short caption (max 200 words) describing your space.', 'No identifiable personal documents visible in the photo.', 'Maximum of 2 entries per contestant.'],
    selectionScreening: 'Panel of scientists and designers judge entries on creativity (30%), story/caption (30%), aesthetic quality (20%), and inspiration value (20%).',
    consent: 'By submitting, you allow AfriScience Hub to feature your workspace photo and caption on our platforms and promotional materials.',
    reward: '$500 Grand Prize, $250 Runner-Up, featured workspace profile on AfriScience Hub homepage for one month.',
    undertakingRemark: 'I confirm that the photo is of my actual personal workspace, that the caption is truthful, and that I agree to the competition terms.',
    topics: [],
    mediaType: 'image' as const,
    participants: 180
  },
  {
    id: 'comp-5',
    title: 'Afri \u2013 Anime: Junior Explorers',
    type: 'Afri \u2013 Anime',
    category: 'General (18+)',
    country: 'Nigeria',
    registrationFee: '$10',
    deadline: '2026-07-31',
    image: 'https://images.unsplash.com/photo-1770843093640-c44ae557928b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create an animated video to explain a scientific concept of your choice. Skillfully craft your animation to be engaging and educating.',
    description: 'The Junior Explorers edition of Afri \u2013 Anime is designed for younger students. Create a fun, educational animated story that explains a basic science concept.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be enrolled in Junior Secondary school', 'Parental/guardian consent form required', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'Animation must be age-appropriate.', 'Content must explain a real science concept.', 'All work must be original.', 'Parental supervision during creation is recommended.'],
    selectionScreening: 'Youth panel of educators and animators review entries. Scored on educational value (35%), creativity (35%), and effort/presentation (30%).',
    consent: 'Parental consent is required. By applying, the guardian confirms the work is the student\u2019s own and grants AfriScience Hub rights to screen and promote the entry.',
    reward: '$1,000 Grand Prize, $500 Runner-Up, science kit for top 5 finalists, certificate for all participants.',
    undertakingRemark: 'I (or my parent/guardian) confirm that this animated work is my own creation and that all scientific content is accurate to the best of my knowledge.',
    topics: [],
    mediaType: 'video' as const,
    participants: 95
  },
  {
    id: 'comp-6',
    title: 'Afri \u2013 Presentations: Graduate Innovation Forum',
    type: 'Afri \u2013 Presentations',
    category: 'Graduates',
    country: 'Kenya',
    registrationFee: '$20',
    deadline: '2026-08-31',
    image: 'https://images.unsplash.com/photo-1655102718560-19dd4971f87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Give an audio-visual presentation to address some persisting problems that challenge the African continent, and offer possible science \u2013 based solutions for them.',
    description: 'The Graduate Innovation Forum challenges masters and doctoral students to present advanced research that addresses continental challenges with cross-disciplinary integration.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be enrolled in a Graduate programme (Masters/PhD)', 'Supervisor endorsement letter required', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'All research claims must be peer-reviewable.', 'Visual aids and data visualizations required.', 'Must cite at least 5 scholarly references.', 'Presenter must appear on screen.'],
    selectionScreening: 'Academic review board evaluates entries on research rigor (35%), innovation (25%), cross-disciplinary integration (25%), and presentation quality (15%).',
    consent: 'By applying, you grant AfriScience Hub the right to publish your abstract and presentation excerpts. Full research remains your intellectual property.',
    reward: '$5,000 Grand Prize, $2,500 Runner-Up, $1,000 Third Place, plus conference invitations and journal publication opportunity.',
    undertakingRemark: 'I confirm that my research is original, properly cited, endorsed by my academic supervisor, and that I agree to all competition rules.',
    topics: ['Applying machine learning and genomic data to predict and prevent outbreaks of zoonotic diseases in East Africa', 'Engineering climate-resilient crops through CRISPR technology combined with indigenous agricultural knowledge systems', 'Integrating nanotechnology and water engineering to develop scalable water purification systems for rural African communities'],
    mediaType: 'video' as const,
    participants: 62
  },
  {
    id: 'comp-7',
    title: 'Afri \u2013 Memes: Campus Science Edition',
    type: 'Afri \u2013 Memes',
    category: 'General (18+)',
    country: 'Egypt',
    registrationFee: '$7',
    deadline: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1726804973612-3e610a28ba3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create a science \u2013 themed meme that is both comic and informative. Use humor to make science concepts less complex and more understandable.',
    description: 'The Campus Science Edition challenges university students to create memes about the university science experience \u2013 from lab fails to thesis struggles.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be currently enrolled in an undergraduate programme', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG, PNG, or GIF).', 'Must be original and relate to the science student experience.', 'No offensive or discriminatory content.', 'Maximum of 3 entries per contestant.'],
    selectionScreening: 'Community voting (50%) combined with panel judging (50%). Entries scored on relatability, humor, and creativity.',
    consent: 'By submitting, you grant AfriScience Hub rights to share your meme across all platforms with credit.',
    reward: '$400 Grand Prize, $200 Runner-Up, AfriScience Hub swag pack for top 5.',
    undertakingRemark: 'I confirm that my meme is original and does not contain offensive or copyrighted material.',
    topics: [],
    mediaType: 'image' as const,
    participants: 210
  },
  {
    id: 'comp-8',
    title: 'Afri \u2013 MySpace: Young Scientist Workspace',
    type: 'Afri \u2013 MySpace',
    category: 'General (18+)',
    country: 'South Africa',
    registrationFee: '$5',
    deadline: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1705727210721-961cc64a6895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Showcase your working environment (station, lab, workshop, studio, hub, center, unit, etc.). Let us see the space from where you provide scientific & technological solutions.',
    description: 'The Young Scientist Workspace edition invites secondary school students to show off their study spaces. Whether you built a science corner in your bedroom or have a school lab you love, we want to see it!',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be enrolled in Senior Secondary school', 'Parental consent required for students under 18', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG or PNG).', 'Must be a real photo of your actual workspace.', 'Caption of max 150 words required.', 'No identifying documents visible in the photo.'],
    selectionScreening: 'Panel of educators judge entries on inspiration (35%), creativity (35%), and caption quality (30%).',
    consent: 'Guardian consent required for minors. AfriScience Hub may feature entries on platforms and social media.',
    reward: '$300 Grand Prize, science kit for top 3, certificate for all participants.',
    undertakingRemark: 'I (or my parent/guardian) confirm that the workspace photo is genuine and that I agree to the competition terms.',
    topics: [],
    mediaType: 'image' as const,
    participants: 145
  },
  {
    id: 'comp-9',
    title: 'Afri \u2013 Presentations: Young Explorers Showcase',
    type: 'Afri \u2013 Presentations',
    category: 'Lower Primary',
    country: 'Nigeria',
    registrationFee: '$5',
    deadline: '2026-08-31',
    image: 'https://images.unsplash.com/photo-1602728114068-25257aedd285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Young explorers present science-based solutions to challenges facing Africa. Use research to analyze problems and offer practical solutions.',
    description: 'Afri \u2013 Presentations offer African brilliant minds an opportunity to look into the prominent problems that challenge the African continent at different levels. Participants are required to use research-backed information to critically analyze these problems and offer possible &amp; practical science-based solutions for them. Take the global stage with other African great minds to tackle problems that plague the continent.',
    registrationRequirements: ['Must be registered with AfriScience Hub', 'Valid NIN slip of contestant', 'Must be within the ages of 6 \u2013 8 years', 'Must be currently enrolled as a lower basic pupil in a school', 'Must be represented by a parent or guardian', 'Any valid government issued ID of the parent/guardian'],
    rules: ['Presentation screen time of 5 minutes max.', 'Cut-screens are not allowed during presentations', 'Video format only (MP4, WebM, MOV, AVI)', 'All information presented must be accurate and scientifically practical', 'Must use an African country as a case-study', 'Contestant must look and dress smart during presentations', 'Presentation must be an original work created by the contestant', 'Presentation contents must not violate any copyright or other third-party rights', 'Presentation language can be in English, French, or any other language spoken in Africa with English subtitles', 'Presentation contents should not be offensive and discriminatory', 'Contestants must submit their work before submission deadline', 'Contestants must consent to the terms of service and undertake to comply with them'],
    selectionScreening: 'All submitted entries will be reviewed and scored by our competition panel in the following areas:\nAccuracy of Information\nDepth of Knowledge\nPresentation Skill\nAudience Engagement\n\nTop 30 finalists will be listed under the Voting section of the platform after four (4) weeks of submission deadline.\nPublic votes will be used to determine the final performance of finalists.\nAt the end of voting sessions, winners will be ranked, announced and rewarded under the Awards section of the platform.\nWhen a tie exists either in the 1st, 2nd or 3rd positions, it will be resolved by further extending the voting window for affected finalists by 48 hours.',
    consent: 'By applying, you grant AfriScience Hub the right to further modify, publish, and promote your entry across our platforms for educational and outreach purposes. Your personal information will be handled in accordance with our privacy policy.',
    reward: '1st Position: Gold Medal, Educational Tablet, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Possible Feature in Hall of Fame, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n2nd Position: Silver Medal, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n3rd Position: Bronze Medal, Basic School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.',
    undertakingRemark: 'I confirm that the work I will submit is entirely my own original creation, that all scientific contents are accurate to the best of my knowledge, that the work does not violate any copyright or third party rights, and that I accept the terms and conditions of this competition.',
    topics: ['How does the sun help plants grow? A simple experiment we can do at home', 'Why does water turn into ice? A fun look at the states of matter', 'How do birds fly? Understanding the science of flight with examples from African birds'],
    mediaType: 'video' as const,
    participants: 45
  },
  {
    id: 'comp-10',
    title: 'Afri \u2013 Presentations: Young Innovators Showcase',
    type: 'Afri \u2013 Presentations',
    category: 'Upper Primary',
    country: 'Nigeria',
    registrationFee: '$5',
    deadline: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1602728114068-25257aedd285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Young innovators present science-based solutions to challenges facing their communities. Use research to analyze problems and offer practical solutions.',
    description: 'Afri \u2013 Presentations offer African brilliant minds an opportunity to look into the prominent problems that challenge the African continent at different levels. Participants are required to use research-backed information to critically analyze these problems and offer possible &amp; practical science-based solutions for them. Take the global stage with other African great minds to tackle problems that plague the continent.',
    registrationRequirements: ['Must be registered with AfriScience Hub', 'Valid NIN slip of contestant', 'Must be within the ages of 9 \u2013 11 years', 'Must be currently enrolled as an upper basic pupil in a school', 'Must be represented by a parent or guardian', 'Any valid government issued ID of the parent/guardian'],
    rules: ['Presentation screen time of 5 minutes max.', 'Cut-screens are not allowed during presentations', 'Video format only (MP4, WebM, MOV, AVI)', 'All information presented must be accurate and scientifically practical', 'Must use an African country as a case-study', 'Contestant must look and dress smart during presentations', 'Presentation must be an original work created by the contestant', 'Presentation contents must not violate any copyright or other third-party rights', 'Presentation language can be in English, French, or any other language spoken in Africa with English subtitles', 'Presentation contents should not be offensive and discriminatory', 'Contestants must submit their work before submission deadline', 'Contestants must consent to the terms of service and undertake to comply with them'],
    selectionScreening: 'All submitted entries will be reviewed and scored by our competition panel in the following areas:\nAccuracy of Information\nDepth of Knowledge\nPresentation Skill\nAudience Engagement\n\nTop 30 finalists will be listed under the Voting section of the platform after four (4) weeks of submission deadline.\nPublic votes will be used to determine the final performance of finalists.\nAt the end of voting sessions, winners will be ranked, announced and rewarded under the Awards section of the platform.\nWhen a tie exists either in the 1st, 2nd or 3rd positions, it will be resolved by further extending the voting window for affected finalists by 48 hours.',
    consent: 'By applying, you grant AfriScience Hub the right to further modify, publish, and promote your entry across our platforms for educational and outreach purposes. Your personal information will be handled in accordance with our privacy policy.',
    reward: '1st Position: Gold Medal, $100 Prize Money, Educational Tablet, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Possible Feature in Hall of Fame, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n2nd Position: Silver Medal, Educational Tablet, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n3rd Position: Bronze Medal, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.',
    undertakingRemark: 'I confirm that the work I will submit is entirely my own original creation, that all scientific contents are accurate to the best of my knowledge, that the work does not violate any copyright or third party rights, and that I accept the terms and conditions of this competition.',
    topics: ['What causes rain? Exploring the water cycle and its importance to African farmers', 'How does electricity work? Simple circuits that can power a light bulb', 'Why do we need to recycle? Understanding waste management in our communities'],
    mediaType: 'video' as const,
    participants: 55
  }
];

export const COMPETITION_TYPES = ['Afri \u2013 Anime', 'Afri \u2013 Presentations', 'Afri \u2013 Memes', 'Afri \u2013 MySpace'];

export const AFRICAN_COUNTRIES = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon',
  'Central African Republic','Chad','Comoros','Congo','DR Congo','Djibouti','Egypt',
  'Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea',
  'Guinea-Bissau','Ivory Coast','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi',
  'Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda',
  'S\u00e3o Tom\u00e9 and Pr\u00edncipe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa',
  'South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe'
];
