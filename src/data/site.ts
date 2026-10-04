// All content below is invented for a portfolio sample.
// Harbor Pilates and the town of Larkhaven do not exist.

export const studio = {
  name: 'Harbor Pilates',
  street: '14 Ropewalk Lane, upstairs',
  locality: 'Larkhaven Harbor',
  phone: { label: '(555) 014-2290', href: 'tel:+15550142290' },
  email: 'hello@harborpilates.example',
};

/** Header shows links without `footerOnly`; the footer shows all of them. */
export const navLinks: { href: string; label: string; footerOnly?: boolean }[] = [
  { href: '#classes', label: 'Classes' },
  { href: '#timetable', label: 'Timetable' },
  { href: '#teachers', label: 'Teachers' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#visit', label: 'Visit' },
  { href: '#faq', label: 'FAQ', footerOnly: true },
];

export type ClassId = 'foundations' | 'flow' | 'mat' | 'jump' | 'slack';

export type ClassType = {
  id: ClassId;
  name: string;
  /** CSS colour used for this class in the timetable and its key. */
  swatch: string;
  equipment: string;
  length: string;
  pace: 1 | 2 | 3;
  blurb: string;
};

export const classTypes: ClassType[] = [
  {
    id: 'foundations',
    name: 'Reformer Foundations',
    swatch: 'var(--kelp)',
    equipment: 'Reformer',
    length: '50 min',
    pace: 1,
    blurb:
      'Where everyone starts. We cover springs, straps and footwork at a pace that leaves room for questions.',
  },
  {
    id: 'flow',
    name: 'Reformer Flow',
    swatch: 'var(--ink)',
    equipment: 'Reformer',
    length: '50 min',
    pace: 2,
    blurb:
      'Longer sequences with fewer pauses. Comfortable once you can set up your own reformer without looking.',
  },
  {
    id: 'mat',
    name: 'Mat Pilates',
    swatch: 'var(--rope)',
    equipment: 'Mat & small props',
    length: '45 min',
    pace: 2,
    blurb:
      'Classical mat work with rings, balls and bands. No machines, so it travels well when you are away.',
  },
  {
    id: 'jump',
    name: 'Jumpboard',
    swatch: 'var(--buoy)',
    equipment: 'Reformer + jumpboard',
    length: '45 min',
    pace: 3,
    blurb:
      'Low-impact cardio intervals lying down, then a strength block. The quickest 45 minutes on the timetable.',
  },
  {
    id: 'slack',
    name: 'Slack Tide',
    swatch: 'var(--paper)',
    equipment: 'Mat & bolsters',
    length: '60 min',
    pace: 1,
    blurb:
      'A slow Sunday class: long holds, gentle mobility work and plenty of time on the floor. Lights low.',
  },
];

export type TeacherName = 'Ines' | 'Theo' | 'Priya' | 'June';
/** time is 24-hour "H:MM"; the timetable formats it for display. */
export type Session = { time: string; classId: ClassId; teacher: TeacherName };
export type Day = { id: string; short: string; long: string; sessions: Session[] };

export const schedule: Day[] = [
  {
    id: 'mon',
    short: 'Mon',
    long: 'Monday',
    sessions: [
      { time: '6:30', classId: 'flow', teacher: 'Ines' },
      { time: '9:30', classId: 'foundations', teacher: 'Theo' },
      { time: '12:15', classId: 'mat', teacher: 'Ines' },
      { time: '17:45', classId: 'jump', teacher: 'Priya' },
      { time: '19:00', classId: 'foundations', teacher: 'Priya' },
    ],
  },
  {
    id: 'tue',
    short: 'Tue',
    long: 'Tuesday',
    sessions: [
      { time: '7:00', classId: 'foundations', teacher: 'June' },
      { time: '9:30', classId: 'flow', teacher: 'Theo' },
      { time: '17:30', classId: 'flow', teacher: 'June' },
      { time: '18:45', classId: 'mat', teacher: 'Theo' },
    ],
  },
  {
    id: 'wed',
    short: 'Wed',
    long: 'Wednesday',
    sessions: [
      { time: '6:30', classId: 'jump', teacher: 'Priya' },
      { time: '9:30', classId: 'foundations', teacher: 'Ines' },
      { time: '12:15', classId: 'flow', teacher: 'Ines' },
      { time: '17:45', classId: 'foundations', teacher: 'June' },
      { time: '19:00', classId: 'flow', teacher: 'Priya' },
    ],
  },
  {
    id: 'thu',
    short: 'Thu',
    long: 'Thursday',
    sessions: [
      { time: '7:00', classId: 'flow', teacher: 'June' },
      { time: '9:30', classId: 'mat', teacher: 'Theo' },
      { time: '17:30', classId: 'jump', teacher: 'Priya' },
      { time: '18:45', classId: 'foundations', teacher: 'Theo' },
    ],
  },
  {
    id: 'fri',
    short: 'Fri',
    long: 'Friday',
    sessions: [
      { time: '6:30', classId: 'foundations', teacher: 'Ines' },
      { time: '9:30', classId: 'flow', teacher: 'June' },
      { time: '12:15', classId: 'jump', teacher: 'Priya' },
      { time: '17:00', classId: 'mat', teacher: 'Ines' },
    ],
  },
  {
    id: 'sat',
    short: 'Sat',
    long: 'Saturday',
    sessions: [
      { time: '8:00', classId: 'flow', teacher: 'Theo' },
      { time: '9:15', classId: 'foundations', teacher: 'Theo' },
      { time: '10:30', classId: 'jump', teacher: 'June' },
    ],
  },
  {
    id: 'sun',
    short: 'Sun',
    long: 'Sunday',
    sessions: [
      { time: '9:00', classId: 'mat', teacher: 'June' },
      { time: '10:30', classId: 'slack', teacher: 'Ines' },
      { time: '17:00', classId: 'slack', teacher: 'Priya' },
    ],
  },
];

export type Instructor = {
  name: string;
  first: TeacherName;
  role: string;
  bio: string;
  teaches: string;
};

export const instructors: Instructor[] = [
  {
    first: 'Ines',
    name: 'Ines Calloway',
    role: 'Founder',
    bio: 'Opened the studio in a former sail loft in 2019. Teaches the early classes and still does the spring maintenance herself.',
    teaches: 'Flow, Mat, Slack Tide',
  },
  {
    first: 'Theo',
    name: 'Theo Brannigan',
    role: 'Lead teacher',
    bio: 'Former rowing coach who came to Pilates for his back and stayed for the footwork. Runs most of the beginner classes.',
    teaches: 'Foundations, Flow, Mat',
  },
  {
    first: 'Priya',
    name: 'Priya Holm',
    role: 'Teacher',
    bio: 'Builds the Jumpboard playlists and the evening timetable. Known for clear cues and a strict two-minute plank.',
    teaches: 'Jumpboard, Foundations, Slack Tide',
  },
  {
    first: 'June',
    name: 'June Ashdown',
    role: 'Teacher',
    bio: 'Trained on the classical mat repertoire and brings it to the reformer. Teaches the Tuesday and Thursday mornings.',
    teaches: 'Flow, Mat, Jumpboard',
  },
];

export const introOffer = {
  firstClass: 'Free',
  introMonth: '$99',
  terms: 'One intro offer per person. The intro month starts on the day of your second class.',
};

export type PriceLine = { name: string; detail: string; price: string };

export const classPacks: PriceLine[] = [
  { name: 'Single class', detail: 'Any class, valid 30 days', price: '$32' },
  { name: '5-class pack', detail: '$27 a class, valid 3 months', price: '$135' },
  { name: '10-class pack', detail: '$25 a class, valid 6 months', price: '$250' },
];

export const memberships: PriceLine[] = [
  { name: '8 classes a month', detail: 'Unused classes roll over once', price: '$184' },
  { name: 'Unlimited', detail: 'Book up to 14 days ahead', price: '$229' },
  { name: 'Early tide', detail: 'Unlimited classes before 8 am', price: '$149' },
];

export const openingHours = [
  { days: 'Monday to Friday', time: '6:00 am to 8:30 pm' },
  { days: 'Saturday', time: '7:30 am to 12:00 pm' },
  { days: 'Sunday', time: '8:30 am to 6:00 pm' },
];

export const testimonials = [
  {
    quote:
      'I had never touched a reformer. Theo had me setting up my own springs by the third class, and nobody made me feel slow.',
    who: 'Dana R.',
    since: 'member since spring',
  },
  {
    quote:
      'Eight beds means the teacher actually sees you. I get corrected on things I did not know I was doing.',
    who: 'Marcus T.',
    since: '10-class pack',
  },
  {
    quote:
      'The 6:30 Flow is the only thing that gets me out of bed in January. Watching the boats come in afterwards helps.',
    who: 'Leonie W.',
    since: 'unlimited member',
  },
];

export const faqs = [
  {
    q: 'I have never done Pilates. Which class should I book?',
    a: 'Book Reformer Foundations for your free class. It is designed for first-timers, and the teacher will show you how to set up the machine before you start.',
  },
  {
    q: 'What should I wear and bring?',
    a: 'Fitted clothes you can move in and grip socks. If you do not have grip socks, we lend them for your first class. Bring water; we have a refill tap.',
  },
  {
    q: 'How big are the classes?',
    a: 'Reformer classes are capped at eight people, one per machine. Mat classes are capped at twelve.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancel up to 12 hours before class and the credit goes back on your account. Later cancellations and no-shows use the credit.',
  },
  {
    q: 'Is there parking?',
    a: 'The Quayside public car park is a two-minute walk. There is bike parking under the stairs to the studio.',
  },
  {
    q: 'Do packs expire?',
    a: 'Five-class packs last three months and ten-class packs last six months from the first booking.',
  },
];
