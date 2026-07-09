export type GalleryItem = { label: string; src?: string };

export type SystemNode = { label: string; value: string };

export type ProcessStep = { step: string; title: string; detail?: string };

export type Challenge = { title: string; detail: string };

export type Cta = {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  summary: string;
  tech: string[];
  image?: string;
  liveUrl: string;
  liveLabel: string;
  flagship?: boolean;
  status?: string;
  /** Optional, manually-curated related content (content slugs). */
  relatedContent?: string[];
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    systemDesign: SystemNode[];
    processTitle: string;
    process: ProcessStep[];
    database: string[];
    metrics?: { value: string; label: string }[];
    challenges: Challenge[];
    impact: string;
    roadmap: string[];
    gallery: GalleryItem[];
    ctas: Cta[];
  };
};

export const projects: Project[] = [
  {
    slug: "mexo",
    name: "MEXO",
    category: "Football Technology Platform",
    subtitle: "Football Platform",
    summary:
      "A football platform that aggregates and organizes news, transfers, competitions, and team information into a structured, searchable experience. Built to solve fragmented football coverage by bringing content from multiple sources into one centralized ecosystem.",
    tech: ["Next.js", "PHP", "MySQL", "Tailwind CSS"],
    image: "/mexo1.jpeg",
    liveUrl: "#",
    liveLabel: "View Project",
    flagship: true,
    status: "Actively Building",
    relatedContent: [
      "building-a-football-database",
      "automating-football-content-categorization",
      "lessons-learned-building-mexo",
    ],
    caseStudy: {
      overview:
        "A football platform designed to connect fans with the game - news, transfers, competitions, teams, and the communities that bring them together.",
      problem:
        "Football coverage is fragmented across dozens of sources. Fans jump between sites for news, transfers, scores, and team context with no single structured place that ties everything together.",
      solution:
        "MEXO aggregates and structures football content into a single platform. News from multiple sources is normalized, categorized, mapped to teams and competitions, and made searchable through one centralized experience.",
      systemDesign: [
        { label: "Client", value: "Next.js + Tailwind CSS" },
        { label: "API", value: "PHP REST API" },
        { label: "Database", value: "MySQL" },
        { label: "External Sources", value: "Football news feeds and data providers" },
      ],
      processTitle: "Content Pipeline",
      process: [
        { step: "01", title: "Ingest", detail: "Pull articles and football data from multiple sources." },
        { step: "02", title: "Normalize", detail: "Clean and standardize incoming data." },
        { step: "03", title: "Categorize", detail: "Automatically map content to teams, competitions, and categories." },
        { step: "04", title: "Publish", detail: "Serve structured content to users." },
      ],
      database: ["Teams", "Competitions", "Articles", "Sources", "Categories"],
      metrics: [
        { value: "5,000+", label: "Articles Processed" },
        { value: "500+", label: "Teams Covered" },
        { value: "40+", label: "Competitions Covered" },
        { value: "20+", label: "News Sources" },
      ],
      challenges: [
        {
          title: "Source normalization",
          detail:
            "Articles arrive in inconsistent formats from many providers - a normalization layer cleans, dedupes, and standardizes every item before it reaches the database.",
        },
        {
          title: "Automated categorization",
          detail:
            "Mapping unstructured news to the right teams and competitions required a reliable tagging pipeline that scales as new sources are added.",
        },
        {
          title: "SEO at scale",
          detail:
            "Generating thousands of fast, indexable pages meant careful attention to rendering strategy, structured data, and performance.",
        },
      ],
      impact:
        "MEXO turns fragmented football coverage into one structured, searchable platform - processing thousands of articles across hundreds of teams and dozens of competitions, all from a unified content pipeline.",
      roadmap: ["User Accounts", "Communities", "Predictions", "Match Tracking", "Personalized Feeds"],
      gallery: [
        { label: "Homepage", src: "/mexo1.jpeg" },
        { label: "Article Pages", src: "/mexo2.jpeg" },
        { label: "Team Pages" },
        { label: "Competition Pages" },
        { label: "Admin Dashboard" },
        { label: "Mobile Views" },
      ],
      ctas: [
        { label: "View Platform", href: "#", primary: true, external: true },
        { label: "Follow Development", href: "https://x.com/", external: true },
      ],
    },
  },
  {
    slug: "yibera",
    name: "Yibera",
    category: "Hospital Management System",
    subtitle: "Hospital Management System",
    summary:
      "A web-based hospital management system - a public marketing site plus three role-based portals (patients, staff, admins) behind a security-first PHP auth layer. Patients self-register, request and track appointments, and follow their care; admins manage patients, staff, pharmacy inventory, and reports.",
    tech: ["PHP 8", "Custom MVC", "MySQL / MariaDB", "Tailwind CSS", "Vanilla JS", "Apache"],
    image: "/yibera/mainyiberaimage.png",
    liveUrl: "https://yibera.com",
    liveLabel: "View Project",
    relatedContent: [
      "designing-appointment-booking-systems",
      "ui-decisions-for-healthcare-platforms",
    ],
    caseStudy: {
      overview:
        "Yibera is a web-based hospital management system - a public marketing site plus three role-based portals (patients, staff, admins) behind a security-first authentication layer. It unifies patient intake, appointments, prescriptions, lab results, pharmacy inventory, and billing into one operational system.",
      problem:
        "Hospitals juggle disconnected workflows - patient intake, appointment requests, staff records, pharmacy stock, lab results, and billing - often spread across paper, spreadsheets, and siloed tools. Patients have no single place to register, book, and follow their care, and staff and admins have no unified operational view.",
      solution:
        "A full HMS with three role-based portals behind a security-first auth layer. Patients self-register, book and manage appointments, and view prescriptions, lab results, and invoices. Staff (created by admins) sign in to a clinical/operational view, while admins manage patients, staff, and pharmacy inventory and see analytics. Booking is currently request-and-confirm - an admin confirms each appointment - not real-time slot selection.",
      systemDesign: [
        { label: "Frontend", value: "Server-rendered PHP views + Tailwind (compiled, purged, minified); progressive enhancement with vanilla JS, Chart.js, AOS, Swiper. No SPA." },
        { label: "Backend", value: "PHP 8 custom MVC - no framework or Composer. Front-controller + router with thin models over mysqli using prepared statements." },
        { label: "Database", value: "MySQL / MariaDB. Schema self-provisions on first request - idempotent CREATE TABLE IF NOT EXISTS plus additive column migrations." },
        { label: "Notifications", value: "Dependency-free SMTP client (raw sockets, SSL/STARTTLS, AUTH LOGIN) for OTP/verification, with mail() + file-log fallback." },
        { label: "Infra", value: "Apache on shared hosting; .htaccess for forced HTTPS, asset caching, gzip, and security headers; gitignored env-style config for secrets." },
      ],
      processTitle: "User Journey",
      process: [
        { step: "01", title: "Register / Activate", detail: "Self-signup, or email-OTP activate/reset for patients booked by an admin." },
        { step: "02", title: "Onboarding", detail: "Optional, skippable profile completion." },
        { step: "03", title: "Sign In", detail: "Password (bcrypt cost 12) + optional email-OTP 2FA, protected by brute-force lockout." },
        { step: "04", title: "Book", detail: "Choose department + preferred date/time - appointment is created as pending." },
        { step: "05", title: "Confirm", detail: "Admin/staff move it to confirmed or completed; the patient sees the status." },
        { step: "06", title: "Follow Care", detail: "View prescriptions, lab results, and invoices; pay invoices (simulated)." },
      ],
      database: [
        "patient - demographics, insurance, portal auth",
        "staff - provider profile, department, portal auth",
        "admin_users - admin / super-admin accounts",
        "appointment - patient, department, date/time, status",
        "prescription - EMR records per patient",
        "lab_report - EMR lab results per patient",
        "invoice - billing: amount, status, due/paid",
        "medication - pharmacy inventory",
        "login_attempts - brute-force throttle ledger",
      ],
      metrics: [
        { value: "3", label: "Role-Based Portals" },
        { value: "9", label: "Database Tables" },
        { value: "12", label: "bcrypt Cost Factor" },
        { value: "OTP", label: "Email 2FA + Lockout" },
      ],
      challenges: [
        {
          title: "Multi-actor auth with isolated guards",
          detail:
            "Three identity types (admin / patient / staff) live in separate tables and session namespaces via three guard classes, so a valid patient session can't traverse into staff or admin areas. More code than one users table with RBAC - but strong blast-radius isolation.",
        },
        {
          title: "Security as defense-in-depth",
          detail:
            "CSRF tokens on every state-changing form, brute-force lockout (5 tries → 15 min, scoped per identifier + IP), password policy with rehash-on-login, opt-in email-OTP 2FA, session-ID regeneration, idle/absolute timeouts, and HTTPS/HSTS edge hardening.",
        },
        {
          title: "Schema migrate-on-boot",
          detail:
            "No shell/CLI on shared hosting, so Database::migrate() runs idempotently on the first request of a session to self-heal the schema on deploy. It isn't versioned - at scale I'd move to a real migration runner in CI/CD.",
        },
        {
          title: "Dependency-free transactional email",
          detail:
            "A from-scratch SMTP client (raw sockets, SSL/STARTTLS, AUTH LOGIN) sends OTP/verification anywhere, falling back to mail() then a file log. Gaps: no retries/queue, no bounce handling, and OTP send is synchronous on the request path.",
        },
        {
          title: "Honest data-model tension",
          detail:
            "Public booking still writes to patient.Status while the portal added an appointment table for multiple bookings - a real dual-source-of-truth smell (admin stats still read patient.Status). The fix is to move all scheduling onto appointment and keep patient as pure identity.",
        },
        {
          title: "Where it breaks at scale",
          detail:
            "Single Apache box, file-based sessions, same-host MySQL, synchronous email. Scaling out means Redis/DB sessions, managed MySQL with read replicas for reporting, a queue for email, a CDN/object store for images, and versioned CI/CD migrations.",
        },
      ],
      impact:
        "Yibera is a working full hospital management system - a public site plus patient, staff, and admin portals over a 9-table MySQL schema, with multi-actor authentication, defense-in-depth security, and self-provisioning migrations - built on zero-dependency PHP 8 so it deploys on plain shared hosting.",
      roadmap: [
        "Real availability & slot engine",
        "Provider discovery & search",
        "Payment gateway (real billing)",
        "Unified identity service with RBAC",
        "Versioned CI/CD migrations",
        "Email job queue + provider",
        "Redis sessions & caching",
        "Managed MySQL read replicas",
        "CDN / object store + WebP images",
        "Structured logging, metrics & alerts",
      ],
      gallery: [
        { label: "Home Page", src: "/yibera/yibera-page-05.png" },
        { label: "Services", src: "/yibera/yibera-page-04.png" },
        { label: "About Us", src: "/yibera/yibera-page-06.png" },
        { label: "Contact Us", src: "/yibera/yibera-page-07.png" },
        { label: "Testimonial", src: "/yibera/yibera-page-02.png" },
        { label: "Footer", src: "/yibera/yibera-page-03.png" },
        { label: "Book Appointment", src: "/yibera/yibera-page-08.png" },
        { label: "Login", src: "/yibera/yibera-page-09.png" },
        { label: "Patient Login", src: "/yibera/yibera-page-10.png" },
        { label: "Dashboard", src: "/yibera/yibera-page-11.png" },
        { label: "Appointment", src: "/yibera/yibera-page-12.png" },
        { label: "Prescription", src: "/yibera/yibera-page-13.png" },
        { label: "Profile", src: "/yibera/yibera-page-14.png" },
        { label: "Billing", src: "/yibera/yibera-page-15.png" },
        { label: "Reports", src: "/yibera/yibera-page-16.png" },
        { label: "Staff Onboarding", src: "/yibera/yibera-page-17.png" },
        { label: "Staff Dashboard", src: "/yibera/yibera-page-18.png" },
        { label: "Staff Profile", src: "/yibera/yibera-page-19.png" },
      ],
      ctas: [
        { label: "Visit Site", href: "https://yibera.com", primary: true, external: true },
      ],
    },
  },
  {
    slug: "alphabuild",
    name: "AlphaBuild",
    category: "Construction Business Platform",
    subtitle: "Construction Business Platform",
    summary:
      "A modern web platform built for construction businesses to showcase projects, generate leads, and strengthen their online presence. Focused on responsive design, user experience, and effective client engagement.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    image: "/alphabuild1.jpeg",
    liveUrl: "https://alphabuild.osayukiobazee.xyz",
    liveLabel: "View Project",
    relatedContent: ["building-responsive-client-websites", "frontend-development-workflow"],
    caseStudy: {
      overview:
        "A modern platform designed to help construction companies showcase projects, manage client interactions, and streamline communication between teams and customers.",
      problem:
        "Many construction businesses rely on outdated websites that fail to properly showcase their capabilities or generate qualified leads.",
      solution:
        "AlphaBuild provides a professional digital presence where companies can display projects, attract clients, and manage inquiries efficiently.",
      systemDesign: [
        { label: "Frontend", value: "React" },
        { label: "Framework", value: "Next.js" },
        { label: "Database", value: "MySQL" },
        { label: "Admin System", value: "Project management dashboard" },
      ],
      processTitle: "Core Features",
      process: [
        { step: "01", title: "Showcase Projects" },
        { step: "02", title: "Lead Capture" },
        { step: "03", title: "Manage Content" },
        { step: "04", title: "Convert Visitors" },
      ],
      database: ["Projects", "Services", "Clients", "Team", "Testimonials"],
      challenges: [
        {
          title: "Performance with rich media",
          detail:
            "Project showcases are image-heavy - loading and responsiveness were optimized to stay fast across every device.",
        },
        {
          title: "Reusable design system",
          detail:
            "Consistent, reusable components let content scale without breaking the UI or design language.",
        },
        {
          title: "Lead capture",
          detail:
            "Inquiry flows were designed to turn visitors into actionable, qualified leads for the business.",
        },
      ],
      impact:
        "AlphaBuild gives construction businesses a professional digital presence that showcases their work and converts visitors into qualified leads.",
      roadmap: ["Client Portal", "Project Tracking", "Quotation System", "Online Consultations", "Progress Updates"],
      gallery: [
        { label: "Homepage", src: "/alphabuild1.jpeg" },
        { label: "Projects Showcase", src: "/alphabuild2.jpeg" },
        { label: "Services Page" },
        { label: "Contact System" },
        { label: "Admin Dashboard" },
        { label: "Mobile Screens" },
      ],
      ctas: [
        { label: "Visit Site", href: "https://alphabuild.osayukiobazee.xyz", primary: true, external: true },
        { label: "Contact Team", href: "/#contact" },
      ],
    },
  },
  {
    slug: "ecocycle",
    name: "EcoCycle",
    category: "Unity Recycling Education Game",
    subtitle: "Unity Recycling Education Game",
    summary:
      "An educational game developed in Unity that teaches recycling and environmental awareness through interactive gameplay. Players sort waste correctly, earn rewards, and learn sustainable habits in a fun and engaging way.",
    tech: ["Unity", "C#"],
    image: "/game1.jpeg",
    liveUrl: "#",
    liveLabel: "Play Game",
    relatedContent: ["my-unity-development-journey", "building-educational-games"],
    caseStudy: {
      overview:
        "An educational game designed to teach recycling and environmental awareness through engaging gameplay and interactive challenges.",
      problem:
        "Many people understand recycling is important but struggle to identify recyclable materials and proper waste sorting methods.",
      solution:
        "EcoCycle transforms recycling education into a fun interactive experience where players sort waste correctly, earn rewards, and learn sustainable habits.",
      systemDesign: [
        { label: "Engine", value: "Unity" },
        { label: "Language", value: "C#" },
        { label: "Gameplay Systems", value: "Scoring, Level Progression, Object Detection" },
        { label: "Assets", value: "Interactive Environmental Assets" },
      ],
      processTitle: "Gameplay Loop",
      process: [
        { step: "01", title: "Collect" },
        { step: "02", title: "Identify" },
        { step: "03", title: "Sort" },
        { step: "04", title: "Score" },
      ],
      database: ["Waste Items", "Levels", "Achievements", "Scoring", "Leaderboard"],
      challenges: [
        {
          title: "Object detection & sorting logic",
          detail:
            "Reliable systems validate whether players sort each item into the correct bin, with instant feedback.",
        },
        {
          title: "Progression & scoring",
          detail:
            "Level progression and scoring loops were tuned to stay engaging while reinforcing the learning goals.",
        },
        {
          title: "Performance on modest hardware",
          detail:
            "Unity assets and systems were optimized to run smoothly across a range of devices.",
        },
      ],
      impact:
        "EcoCycle makes recycling education hands-on - players learn correct waste sorting through play, reinforcing sustainable habits in a fun, rewarding loop.",
      roadmap: ["Mobile Release", "Leaderboards", "New Maps", "Multiplayer Challenges", "Environmental Events"],
      gallery: [
        { label: "Main Menu", src: "/game1.jpeg" },
        { label: "Gameplay", src: "/game2.jpeg" },
        { label: "Scoring System" },
        { label: "Level Progression" },
        { label: "Achievements" },
        { label: "Mobile Version Mockups" },
      ],
      ctas: [
        { label: "Play Game", href: "#", primary: true, external: true },
        { label: "View Development Log", href: "#", external: true },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
