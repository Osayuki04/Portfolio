export const profile = {
  name: "Dave",
  alias: "Yuki",
  roles: ["Full Stack Developer, Founder of MEXO"],
  email: "wised4536@gmail.com",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/yukipic.jpeg",
  socials: {
    github: { label: "GitHub", url: "https://github.com/Osayuki04", handle: "@Osayuki04" },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/osayuki-obazee-677765331",
      handle: "Osayuki Obazee",
    },
    x: { label: "X", url: "https://x.com/Yuki_dev04", handle: "@Yuki_dev04" },
    tiktok: { label: "TikTok", url: "https://www.tiktok.com/@yuki_dev04", handle: "@yuki_dev04" },
    instagram: { label: "Instagram", url: "https://www.instagram.com/yuki_dev04", handle: "@yuki_dev04" },
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Content", href: "#content" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroTechPills = [
  "React",
  "Next.js",
  "PHP",
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "MySQL",
  "Tailwind",
  "Node.js",
  "MongoDB",
] as const;

export const aboutStats = [
  { value: "2+", label: "Years Building" },
  { value: "MEXO", label: "Founder" },
  { value: "Frontend", label: "Development Tutor" },
  { value: "30 Days", label: "Of PHP Creator" },
  { value: "Public", label: "Builder" },
] as const;

export const mexo = {
  overview:
    "A football platform designed to connect fans with the game - news, transfers, competitions, teams, and the communities that bring them together.",
  problem:
    "Football coverage is fragmented across dozens of sources. Fans jump between sites for news, transfers, scores, and team context - with no single, structured place that ties it all together.",
  solution:
    "MEXO aggregates and structures football content into a single platform - normalizing news from many sources, mapping it to teams and competitions, and making it searchable and browsable in one place.",
  systemDesign: [
    { layer: "Client", detail: "Next.js + Tailwind - fast, SEO-friendly pages" },
    { layer: "API", detail: "PHP / REST endpoints serving structured data" },
    { layer: "Database", detail: "MySQL - relational football data model" },
    { layer: "External Sources", detail: "News feeds & football data providers" },
  ],
  pipeline: [
    { step: "Ingest", detail: "Pull articles & data from multiple sources" },
    { step: "Normalize", detail: "Clean, dedupe, and standardize formats" },
    { step: "Categorize", detail: "Map content to teams & competitions" },
    { step: "Publish", detail: "Serve searchable, browsable pages" },
  ],
  database: [
    { name: "teams", detail: "Clubs, metadata, crests" },
    { name: "competitions", detail: "Leagues & tournaments" },
    { name: "articles", detail: "Normalized news content" },
    { name: "sources", detail: "Feed origins & trust" },
    { name: "categories", detail: "Content classification" },
  ],
  features: [
    "News Aggregation",
    "Team Pages",
    "Competition Pages",
    "Content Categorization",
    "Football Database",
    "Search System",
  ],
  roadmap: [
    "User Accounts",
    "Communities",
    "Predictions",
    "Match Tracking",
    "Personalized Feeds",
  ],
  metrics: [
    { value: "5,000+", label: "Articles Processed" },
    { value: "500+", label: "Teams Covered" },
    { value: "40+", label: "Competitions Covered" },
    { value: "20+", label: "News Sources" },
  ],
  status: "Actively Building",
  tech: ["Next.js", "PHP", "MySQL", "Tailwind"],
  ctas: [
    { label: "View Platform", href: "https://mexo.app", primary: true },
    { label: "Read Case Study", href: "#projects", primary: false },
    { label: "Follow Development", href: profile.socials.x.url, primary: false },
  ],
} as const;

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
  skills: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: "Founder",
    company: "MEXO",
    period: "Present",
    summary: "Building and scaling a football technology platform.",
    achievements: [
      "Designed and developed the platform architecture from concept to deployment.",
      "Built scalable frontend interfaces using modern web technologies.",
      "Developed backend systems for article ingestion, processing, and delivery.",
      "Designed and maintained relational database structures for teams, competitions, articles, and categories.",
      "Implemented automated content categorization and data normalization workflows.",
      "Optimized platform SEO to improve search engine visibility and organic traffic.",
      "Managed product planning, feature prioritization, and technical decision-making.",
      "Integrated third-party football data and news sources into a unified content pipeline.",
    ],
    skills: [
      "Product Design",
      "Frontend Development",
      "Backend Development",
      "Database Architecture",
      "SEO",
      "Automation",
    ],
    current: true,
  },
  {
    role: "Founder & Full Stack Developer",
    company: "Yibera",
    period: "Self-Initiated",
    summary: "Hospital management system with patient, staff, and admin portals.",
    achievements: [
      "Designed and developed a healthcare appointment booking platform from the ground up.",
      "Built responsive and accessible user interfaces focused on usability and patient experience.",
      "Implemented appointment scheduling and booking workflows.",
      "Designed database structures for healthcare providers, appointments, and service management.",
      "Developed secure API endpoints for managing platform data.",
      "Optimized application performance and responsiveness across devices.",
      "Managed product design, feature development, testing, and deployment.",
      "Collaborated with stakeholders to translate requirements into functional solutions.",
    ],
    skills: [
      "Full Stack Development",
      "Healthcare Systems",
      "Database Design",
      "API Development",
      "Product Management",
      "UX Design",
    ],
  },
  {
    role: "Frontend Developer",
    company: "AlphaBuild",
    period: "Contract",
    summary: "Construction and project management platform.",
    achievements: [
      "Developed responsive user interfaces using React and Next.js.",
      "Translated design requirements into reusable frontend components.",
      "Improved application responsiveness across desktop, tablet, and mobile devices.",
      "Collaborated with team members to implement new features and enhancements.",
      "Optimized page performance and user experience.",
      "Maintained clean, scalable, and maintainable frontend code.",
      "Assisted in UI consistency and design system implementation.",
      "Participated in testing, debugging, and feature refinement.",
    ],
    skills: [
      "React",
      "Next.js",
      "Responsive Design",
      "UI Development",
      "Performance Optimization",
      "Frontend Architecture",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Freelance",
    period: "Ongoing",
    summary: "Delivering custom web solutions for clients and personal projects.",
    achievements: [
      "Designed and developed custom websites and web applications for clients.",
      "Converted design concepts into responsive, production-ready interfaces.",
      "Built landing pages, business websites, and portfolio platforms.",
      "Integrated APIs and third-party services where required.",
      "Managed projects from requirements gathering through deployment.",
      "Provided ongoing maintenance, updates, and technical support.",
      "Applied SEO and performance optimization best practices.",
      "Worked directly with clients to understand business needs and deliver tailored solutions.",
    ],
    skills: [
      "Web Development",
      "Client Communication",
      "Project Management",
      "SEO",
      "Frontend Development",
      "Problem Solving",
    ],
  },
  {
    role: "Frontend Development Tutor",
    company: "Edlivky Coding Academy",
    period: "Mentorship",
    summary: "Mentoring beginner developers from fundamentals to project development.",
    achievements: [
      "Delivered structured lessons covering HTML, CSS, JavaScript, and React.",
      "Guided students through practical projects and coding exercises.",
      "Assisted learners in debugging and solving development challenges.",
      "Reviewed code and provided constructive technical feedback.",
      "Supported students in building their first portfolio projects.",
      "Simplified complex programming concepts for beginner developers.",
      "Encouraged best practices in coding, version control, and project organization.",
      "Mentored students on their learning roadmap and career development.",
    ],
    skills: [
      "Teaching",
      "Mentorship",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Code Review",
      "Project Guidance",
    ],
  },
];

// Projects & case studies live in their own module (richer data model).
export { projects, getProject } from "./projects";
export type { Project } from "./projects";

export const content = [
  {
    title: "30 Days Of PHP",
    description:
      "A public series documenting daily PHP builds - from fundamentals to shipping real backend features.",
    tag: "Series",
  },
  {
    title: "Developer Journey Posts",
    description:
      "Honest write-ups on the wins, bugs, and decisions behind building MEXO in public.",
    tag: "Writing",
  },
  {
    title: "TikTok Tutorials",
    description: "Short-form, practical tutorials breaking down real-world development.",
    tag: "Video",
  },
  {
    title: "Twitter Threads",
    description: "Threads on full-stack engineering, product building, and shipping fast.",
    tag: "Threads",
  },
  {
    title: "Product Building Updates",
    description: "Feature-by-feature updates as MEXO grows, shared openly with the community.",
    tag: "Updates",
  },
] as const;

export const techStack = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["PHP", "Node.js", "REST APIs", "Python","Java"],
  },
  {
    category: "Database",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Figma", "CapCut"],
  },
] as const;
