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
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Content", href: "#content" },
  { label: "Contact", href: "#contact" },
] as const;

// "What I do" - the numbered list under the featured projects.
export const capabilities = [
  {
    title: "Full stack products",
    detail:
      "Whole products shipped end to end: interface, API, database and deploy. MEXO, Jerkspots, Yibera and AlphaBuild were all built this way.",
  },
  {
    title: "Frontend engineering",
    detail:
      "React, Next.js and TypeScript interfaces that stay responsive, accessible and fast across phones, tablets and desktops.",
  },
  {
    title: "Backend & APIs",
    detail:
      "PHP, Laravel and Node.js/Express REST APIs, authentication, payments, and data pipelines that ingest, normalise and store data at volume.",
  },
  {
    title: "Database design",
    detail:
      "MySQL, PostgreSQL and MongoDB schemas, plus Redis caching and query tuning, like the fix that cut a MEXO endpoint from 4.9s to 0.4s.",
  },
  {
    title: "Cloud & DevOps",
    detail:
      "Deploying and running apps on AWS and Azure with Docker, Kubernetes and CI/CD pipelines, on Linux with Bash scripting.",
  },
  {
    title: "Testing & quality",
    detail:
      "Unit, integration and end-to-end tests with Jest, Cypress, JUnit and PHPUnit, so every change can ship with confidence.",
  },
  {
    title: "IT support",
    detail:
      "Troubleshooting hardware, software and network issues, setting up devices and accounts, and helping people get unblocked quickly.",
  },
  {
    title: "SEO & performance",
    detail:
      "Indexable, fast pages: rendering strategy, structured data, caching and performance budgets that hold at scale.",
  },
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
  // From the CV (MexoSports, May 2026).
  metrics: [
    { value: "127k", label: "Players" },
    { value: "10.8k", label: "Teams Covered" },
    { value: "1.2k", label: "Leagues Covered" },
    { value: "100+", label: "Registered Users" },
  ],
  status: "Live",
  tech: ["Next.js", "PHP", "MySQL", "Tailwind"],
  ctas: [
    { label: "View Platform", href: "https://mexosports.com", primary: true },
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
    role: "Founder & Full-Stack Engineer",
    company: "MEXO",
    period: "May 2026 – Present",
    summary:
      "Turned an ambiguous idea into a live football data platform with real users, used by 100+ registered users.",
    achievements: [
      "Delivered a 23-collection MongoDB schema spanning 127k players, 51k transfers, 10.8k teams and 1.2k leagues across 171 countries.",
      "Built a 115-endpoint PHP REST API and a React/Next.js frontend used by 100+ registered users.",
      "Built an automated pipeline ingesting 7.6k news articles and tracking 3.2k fixtures per week, turning high-volume, unstructured data into a clear normalisation and storage strategy.",
      "Traced a slow production endpoint to a full data sync on every request, then redesigned the query and caching strategy.",
      "Cut that endpoint's response time by 92% (4.9s to 0.4s) and its payload by 99% (3.3MB to 25KB).",
      "Used Claude Code and other AI-assisted tools to move faster, critically reviewing and validating all AI-generated code before release.",
    ],
    skills: [
      "Next.js",
      "React",
      "PHP",
      "MongoDB",
      "REST APIs",
      "Data Pipelines",
      "Caching",
      "AI-Assisted Development",
    ],
    current: true,
  },
  {
    role: "Founder & Full-Stack Developer",
    company: "Yibera",
    period: "Nov 2025 – Mar 2026",
    summary: "A security-first hospital management system with patient, staff and admin portals (yibera.com).",
    achievements: [
      "Built session-based authentication with bcrypt password hashing.",
      "Added email-OTP two-factor authentication and CSRF protection on every form.",
      "Enforced role-based access across 3 isolated portals: patient, staff and admin.",
      "Built a custom PHP MVC application with 16 controllers and 88 routes.",
      "Designed a 9-table MySQL schema, load-tested with 29,000 records.",
      "Covered patient records, billing, appointments, staff management and pharmacy inventory.",
    ],
    skills: [
      "PHP",
      "Custom MVC",
      "MySQL",
      "JavaScript",
      "React",
      "Security",
      "Authentication",
    ],
  },
  {
    role: "Frontend Developer",
    company: "AlphaBuild",
    period: "Contract",
    summary: "Construction and project management platform.",
    achievements: [
      "Developed responsive React and Next.js interfaces that work across desktop, tablet and mobile.",
      "Translated design requirements into reusable components, keeping the UI consistent with the design system.",
      "Collaborated with the team to implement new features and enhancements.",
      "Optimised page performance and user experience.",
      "Kept the frontend code clean, scalable and maintainable.",
      "Took part in testing, debugging and feature refinement.",
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
    role: "Software Engineering Tutor Intern",
    company: "Edlivky Coding Academy",
    period: "Apr 2025 – Aug 2025",
    summary: "Taught a cohort of 25+ students to build and ship real web applications.",
    achievements: [
      "Delivered project-based instruction to a cohort of 25+ students over 20 weeks.",
      "Taught HTML, CSS, JavaScript, React, PHP and MySQL through hands-on projects.",
      "Guided the cohort to 50+ deployed applications.",
      "Ran 30+ code review and debugging workshops.",
      "Gave constructive, specific feedback on students' code.",
      "Adapted explanations to people at different skill levels.",
    ],
    skills: [
      "Teaching",
      "Mentorship",
      "Code Review",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "PHP",
      "MySQL",
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

// Mirrors the Technical Skills section of the CV.
export const techStack = [
  {
    category: "Programming",
    items: ["Java", "Python", "TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js / Express","SpringBoot", "React Native", "Laravel", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Testing",
    items: ["Jest", "Cypress", "JUnit", "PHPUnit"],
  },
  {
    category: "Cloud",
    items: ["AWS", "Azure"],
  },
  {
    category: "DevOps & Version Control",
    items: ["Git", "GitHub", "Docker", "Kubernetes", "CI/CD", "Postman", "Linux", "Bash"],
  },
  {
    category: "Collaboration",
    items: ["Jira", "Asana", "ClickUp", "Figma"],
  },
  {
    category: "AI-Assisted Development",
    items: ["Claude Code", "Claude API", "GitHub Copilot", "OpenAI Codex"],
  },
] as const;
