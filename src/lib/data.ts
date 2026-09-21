export const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
  { label: "Instructors", href: "/instructors" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Contact", href: "/contact" },
];

export const trustStats = [
  { value: 10000, suffix: "+", label: "Students taught" },
  { value: 25, suffix: "+", label: "Expert mentors" },
  { value: 95, suffix: "%", label: "Completion rate" },
  { value: 50, suffix: "+", label: "Practical courses" },
];

export type Program = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
};

export const programs: Program[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Build production-grade websites and applications with modern JavaScript, React, and backend fundamentals.",
    duration: "16 weeks",
    level: "Beginner to Advanced",
    category: "Technology",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Learn user-centered design thinking, prototyping, and visual systems used by top product teams.",
    duration: "12 weeks",
    level: "Beginner Friendly",
    category: "Design",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Master SEO, paid campaigns, content strategy, and analytics to grow real audiences and brands.",
    duration: "10 weeks",
    level: "All Levels",
    category: "Marketing",
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    description:
      "Turn raw data into decisions with SQL, spreadsheets, visualization tools, and statistical thinking.",
    duration: "14 weeks",
    level: "Beginner to Advanced",
    category: "Technology",
  },
  {
    slug: "english-communication",
    title: "English & Communication",
    description:
      "Build confident, professional communication skills for interviews, workplaces, and client conversations.",
    duration: "8 weeks",
    level: "All Levels",
    category: "Soft Skills",
  },
  {
    slug: "career-development",
    title: "Career Development",
    description:
      "Resume building, interview preparation, and portfolio coaching designed to get you hired faster.",
    duration: "6 weeks",
    level: "All Levels",
    category: "Career",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Learn",
    description:
      "Structured curriculum taught by industry mentors, built around real-world skills employers actually need.",
  },
  {
    index: "02",
    title: "Practice",
    description:
      "Hands-on exercises, guided labs, and feedback loops that turn theory into muscle memory.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Ship real projects for your portfolio, reviewed by mentors who have worked in the industry.",
  },
  {
    index: "04",
    title: "Grow",
    description:
      "Career coaching, interview prep, and a network that helps you land your next opportunity.",
  },
];

export const experienceFeatures = [
  {
    title: "Practical Projects",
    description:
      "Every program is built around portfolio-ready projects, not just theory or slideshows.",
  },
  {
    title: "Expert Instructors",
    description:
      "Learn directly from practitioners currently working in the fields they teach.",
  },
  {
    title: "Flexible Learning",
    description:
      "Live cohorts, recorded sessions, and self-paced tracks designed around your schedule.",
  },
  {
    title: "Career Support",
    description:
      "Dedicated coaching for resumes, interviews, and introductions to hiring partners.",
  },
];

export type Instructor = {
  name: string;
  role: string;
  expertise: string;
  experience: string;
  initials: string;
};

export const instructors: Instructor[] = [
  {
    name: "Amara Osei",
    role: "Lead Web Development Instructor",
    expertise: "Full-Stack Engineering",
    experience: "9 years at product startups",
    initials: "AO",
  },
  {
    name: "Daniel Cho",
    role: "UI/UX Design Mentor",
    expertise: "Product Design Systems",
    experience: "7 years designing for SaaS",
    initials: "DC",
  },
  {
    name: "Priya Nandakumar",
    role: "Digital Marketing Strategist",
    expertise: "Growth & Performance Marketing",
    experience: "8 years leading brand campaigns",
    initials: "PN",
  },
  {
    name: "Marcus Bellweather",
    role: "Data Analytics Instructor",
    expertise: "Business Intelligence",
    experience: "10 years in data consulting",
    initials: "MB",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  program: string;
  outcome: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "SkillBridge didn't just teach me to code — it taught me how to think like an engineer. I went from switching careers to shipping production code in six months.",
    name: "Jasmine Reyes",
    program: "Web Development Graduate",
    outcome: "Now a Frontend Engineer at a fintech startup",
  },
  {
    quote:
      "The mentorship model made all the difference. My instructor reviewed my portfolio line by line until it was genuinely interview-ready.",
    name: "Tomiwa Adeyemi",
    program: "UI/UX Design Graduate",
    outcome: "Now a Product Designer at a design agency",
  },
  {
    quote:
      "I came in with zero marketing background. Twelve weeks later I was running real campaigns with measurable results.",
    name: "Laila Haddad",
    program: "Digital Marketing Graduate",
    outcome: "Now a Growth Marketer at an e-commerce brand",
  },
];

export const resultStats = [
  { value: 92, suffix: "%", label: "Graduates employed within 6 months" },
  { value: 4.9, suffix: "/5", label: "Average learner satisfaction" },
  { value: 120, suffix: "+", label: "Hiring partner companies" },
  { value: 3200, suffix: "+", label: "Portfolio projects shipped" },
];

export const faqs = [
  {
    question: "What courses does SkillBridge offer?",
    answer:
      "SkillBridge offers programs in Web Development, UI/UX Design, Digital Marketing, Data Analytics, English & Communication, and Career Development, with new tracks added regularly.",
  },
  {
    question: "Are classes online or in person?",
    answer:
      "Most programs are delivered live online with recorded sessions available, so you can learn on a schedule that works for you. Select programs also offer in-person cohorts.",
  },
  {
    question: "Who can join SkillBridge?",
    answer:
      "Our programs welcome complete beginners as well as professionals looking to upskill. Each program page lists the recommended experience level.",
  },
  {
    question: "Do I receive a certificate?",
    answer:
      "Yes. Every graduate receives a SkillBridge certificate of completion, and select programs include industry-recognized credentials.",
  },
  {
    question: "How do I enroll?",
    answer:
      "Choose a program, book a free call with an advisor, and secure your seat with a simple online application. Most cohorts start monthly.",
  },
  {
    question: "Can beginners join?",
    answer:
      "Absolutely. Most of our programs are designed to take you from zero experience to a job-ready skill set, with extra support built in for beginners.",
  },
];

export const footerLinks = {
  programs: [
    { label: "Web Development", href: "/programs/web-development" },
    { label: "UI/UX Design", href: "/programs/ui-ux-design" },
    { label: "Digital Marketing", href: "/programs/digital-marketing" },
    { label: "Data Analytics", href: "/programs/data-analytics" },
  ],
  resources: [
    { label: "Success Stories", href: "/success-stories" },
    { label: "Instructors", href: "/instructors" },
    { label: "FAQ", href: "/contact#faq" },
    { label: "Contact", href: "/contact" },
  ],
  company: [
    { label: "About SkillBridge", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Partnerships", href: "#" },
  ],
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
];
