# Portfolio 2.0 - Phased Modernization & Implementation Plan

## 1. Project Overview & Objectives

Transform Dhruva Bhattacharya's portfolio from a static Create React App bundle into **Portfolio 2.0**:
- **Single-Repository Architecture**: All code, automation scripts, workflows, data, and deployment configs live in this single repository (`DhruvaBhattacharya.github.io`). Zero external repo overhead.
- **Modern Tech Stack**: Vite 6 + React 18 + Tailwind CSS 3.4 + Lucide Icons.
- **Local Dev First**: Runs instantly on localhost (`npm run dev`) with instant HMR and offline mock/baseline data.
- **Drop-in Latest Photos**: Ready-to-use photo slot (`public/images/profile.jpg` / `src/assets/profile.jpg`) with fallback styling until the user's latest photos are added.
- **In-Repo Automated Profile Sync**: Weekly cron job (Saturday 1:00 PM IST / `30 7 * * 6` UTC) extracting LinkedIn Bio & Experience, plus GitHub Top Contributions. Changes are auto-committed to `main` in this repo and built/pushed directly to GitHub Pages.
- **Unified Profile Fusion**: Merging verified achievements from `Latest_resume-DhruvaBhattacharya .pdf` (TCS Backend Engineer, Microsoft ESS AI Agent, Logic Labs, 900+ LeetCode, Alibaba Rank 1) with legacy media assets and credentials.
- **Automated Deployment**: GitHub Actions compilation and automated push to GitHub Pages (`DhruvaBhattacharya.github.io`).

---

## 2. Dependency Folder Tree: Old vs. New Modernization

```
E:\Portfolio 2.0\
│
├── 📂 DhruvaBhattacharya.github.io-master/   # [LEGACY REPOSITORY - PRESERVED]
│   └── 📂 DhruvaBhattacharya.github.io-master/
│       ├── 📂 static/
│       │   ├── 📂 js/                        # Legacy CRA Webpack bundles (chunk maps extracted)
│       │   └── 📂 media/                     # Legacy SVG icons, badges, company logos (ISRO, Alibaba, etc.)
│       ├── 📄 index.html                     # Legacy static entry
│       └── 📄 manifest.json                  # Legacy web app manifest
│
├── 📂 .github/                               # [CI/CD AUTOMATION]
│   └── 📂 workflows/
│       ├── 📄 portfolio-sync-deploy.yml      # Master cron pipeline (Saturdays 1 PM IST / 07:30 UTC)
│       ├── 📄 sync-linkedin.yml              # Dedicated LinkedIn Bio & Experience synchronization
│       └── 📄 sync-contributions.yml         # GitHub GraphQL top contributions & repo metrics
│
├── 📂 scripts/                               # [DATA HARVESTING & CONSOLIDATION]
│   ├── 📄 sync-linkedin.cjs                  # Headless crawler extracting Bio & Experience
│   ├── 📄 sync-github-contributions.cjs      # GitHub GraphQL API contributor ingestion
│   └── 📄 consolidate-data.cjs               # Data validator and schema merger
│
├── 📂 public/                                # [STATIC WEB ASSETS]
│   ├── 📄 favicon.ico
│   ├── 📄 resume.pdf                         # Copy of Latest_resume-DhruvaBhattacharya .pdf
│   └── 📂 images/                            # Company & credential brand logos
│
├── 📂 src/                                   # [MODERNIZED VITE + REACT APPLICATION]
│   ├── 📂 assets/                            # Migrated SVGs, icons, and vector illustrations
│   ├── 📂 components/
│   │   ├── 📂 common/                        # Navbar, Footer, ThemeToggle, Badge, Button, Modal
│   │   ├── 📂 hero/                          # Hero banner, status indicator, dynamic impact counters
│   │   ├── 📂 experience/                    # Interactive TCS, Microsoft ESS, TechXR timeline
│   │   ├── 📂 projects/                      # Filterable project grid (GenAI, Systems, MERN) + modal
│   │   ├── 📂 skills/                        # Categorized skills matrix with proficiency badges
│   │   ├── 📂 contributions/                 # Live GitHub contribution graph & stats
│   │   ├── 📂 education-certs/               # B.Tech degree, Alibaba Cloud #1, SIH, AWS/Azure certs
│   │   └── 📂 contact/                       # Contact details, vCard generator, social links
│   ├── 📂 data/                              # [DECOUPLED DATA LAYER - SINGLE SOURCE OF TRUTH]
│   │   ├── 📄 profile.json                   # Personal details, hero texts, contact & socials
│   │   ├── 📄 experience.json                # Work experience with verified enterprise metrics
│   │   ├── 📄 linkedin-sync.json             # Dynamic snapshot synced from LinkedIn
│   │   ├── 📄 github-contributions.json      # Dynamic snapshot synced from GitHub API
│   │   ├── 📄 projects.json                  # Flagship projects & system architecture case studies
│   │   ├── 📄 skills.json                    # Categorized technical skills
│   │   └── 📄 certifications.json            # Certifications, competitive programming, and awards
│   ├── 📂 hooks/                             # Custom hooks (useTheme, useScrollPosition)
│   ├── 📂 styles/                            # Tailwind entry & custom glassmorphic utility classes
│   ├── 📄 App.jsx                            # Root application component
│   └── 📄 main.jsx                           # Application entry point
│
├── 📄 Latest_resume-DhruvaBhattacharya .pdf  # Current verified resume
├── 📄 legacy_portfolio_data.js               # Clean extracted legacy data for reference
├── 📄 package.json                           # Dependencies & scripts
├── 📄 tailwind.config.js                     # Tailwind styling configuration
├── 📄 postcss.config.js                      # PostCSS plugins
├── 📄 vite.config.js                         # Vite build configuration (base path for gh-pages)
├── 📄 setup.txt                              # Setup guide for GitHub Actions & workflows
├── 📄 CONTEXT.md                             # Architectural context & system design
└── 📄 PLAN.md                                # Phased execution plan (this document)
```

---

## 3. Phased Execution Roadmap

### Phase 1: Environment Scaffolding & Dependency Setup
- [x] Initialize Vite project with React and JavaScript template.
- [x] Configure Tailwind CSS v3.4+, PostCSS, and Autoprefixer.
- [x] Install core UI libraries: `lucide-react` (icons), `clsx`, `tailwind-merge`.
- [x] Configure `vite.config.js` with proper `base: process.env.VITE_BASE_PATH || './'`.
- [x] Validate local dev server startup (`npm run dev`) and production build pipeline (`npm run build` completed in 1.63s).

### Phase 2: Asset Migration & Data Layer Extraction
- [x] Extract SVG vectors and images from `DhruvaBhattacharya.github.io-master/DhruvaBhattacharya.github.io-master/static/media/` into `src/assets/` (78 assets copied).
- [x] Copy `Latest_resume-DhruvaBhattacharya .pdf` into `public/resume.pdf` for direct download/viewing.
- [x] Construct the normalized JSON data schema in `src/data/`:
  - [x] `profile.json`: Name, title, immediate joiner status, email, phone, location, social links, impact metrics.
  - [x] `experience.json`: TCS (Telecom OSS/BSS, MongoDB clustering, Redis caching, 85% latency reduction), Microsoft ESS AI Agent (Copilot Studio, Azure Logic Apps, Azure AI Document Intelligence), TechXR AR/VR Intern, previous internships.
  - [x] `projects.json`: Logic Labs (AI EdTech + RAG chatbot), Production Incident Resolution (Brevo HTTPS integration), and historical open-source projects.
  - [x] `skills.json`: Languages, Backend & APIs, Databases & Caching, Cloud & DevOps, AI/GenAI, Design tools.
  - [x] `certifications.json`: Azure AI Engineer, AWS Cloud Practitioner, AWS ML for NLP, UpGrad GenAI, Alibaba Cloud Asia Rank 1, SIH Finalist, 900+ LeetCode problems.

### Phase 3: Awesome Modern UI Component Engineering
- [x] **Navigation, Splash & Branding**:
  - SignatureLogo `< Dhruva Bhattacharya />` rendered with Agustina vector font styling.
  - Smooth initial SplashScreen with vector signature and dissolve transition.
  - Removed "Portfolio 2.0" mention to ensure seasoned, executive developer tone.
  - Sticky glassmorphic navbar with active section indicators and resume download.
- [x] **Hero Section**:
  - Punchy headline highlighting Backend Engineering & Generative AI.
  - Live pulse pill: `"🟢 Targeting Product-Based SDE / Backend & AI Engineering Roles"`.
  - Recruiter signal badge: `"Targeting Product-Based SDE / Backend & AI Engineering Roles"`.
  - Impact metric counters: `85% Latency Cut`, `40% Throughput Boost`, `900+ LeetCode Solved`, `Rank 1 in Asia (Alibaba Cloud Low Code Development Contest 2022)`.
  - Dedicated interactive Photo Persona Switcher featuring all 4 user photos (`Professional 2`, `Coding Dhruva`, `Professional 1`, `Casual Dhruva`) with custom face-centering optical alignment (`professional-2-portrait.webp`, `center 10%`, container `h-[460px] sm:h-[500px]`) ensuring Dhruva's face, glasses, and expression remain uncropped and visible.
- [x] **Experience Section (Strict STAR Pattern)**:
  - Formatted strictly in **STAR pattern** (Situation, Task, Action, Result) without deviating from resume or LinkedIn.
  - Tata Consultancy Services (TCS): TCS HOBS Telecom OSS/BSS & Microsoft ESS AI Agent (Client: Microsoft delivered via TCS).
  - TechXR Innovations (AR/VR Intern).
  - Removed irrelevant legacy internships (The Sparks Foundation, SmartKnower, Community volunteering).
- [x] **Projects Section (Top 3 Genuine Projects Only)**:
  - Featured only 3 genuine flagship engineering case studies:
    1. Logic Labs – AI-Powered EdTech Platform with RAG (Groq, Llama-3.3-70B, Prompt Engineering).
    2. Production Incident Resolution – OTP Signup Outage (Brevo HTTPS API, Decoupled Architecture).
    3. Dynamic Weather Forecasting & Predictive Analytics (Python, Flask, Time-Series Modeling).
  - Interactive architecture deep-dive modals with metrics and verified links.
- [x] **Skills & Certifications Showcase**:
  - Prioritized high-impact skills: Prompt Engineering, RAG Pipelines, Azure Document Intelligence OCR, Copilot Studio, Spring Boot, MongoDB document clustering, Redis caching.
  - Verified certification badges (Azure AI Engineer, AWS Cloud, AWS ML, UpGrad GenAI).
- [x] **Competitive Programming & GitHub Contributions**:
  - Retained strictly **LeetCode (900+)** and **GeeksforGeeks (GFG)** profiles; removed all others.
  - Direct links to concrete GitHub repositories (`weather-forecast-`, `DhruvaBhattacharya.github.io`).
- [x] **Contact & Footer Section**:
  - Unified Profile & Status Chip displaying `profile-headshot.webp` (800x800 square face-centered crop) ensuring 100% facial clarity and symmetry with `Targeting Product-Based SDE / Backend & AI Engineering Roles` status.
  - Recruiter status: `Targeting Product-Based SDE / Backend & AI Engineering Roles`.
  - Removed phone number completely; retained only direct email `dhruvabhattacharya130102@gmail.com` with 1-click clipboard copy.
  - Removed user-facing cron sync banner for clean aesthetics.
  - Added exact footer: `Made with ❤️ by Dhruva Bhattacharya`.

### Phase 4: Dynamic CI/CD Automation Scripts
- [x] **`scripts/sync-linkedin.cjs`**:
  - Automated extractor targeting `https://www.linkedin.com/in/dhruvabhattacharya/`.
  - Scrapes headline, summary bio, and experience timeline.
  - Implements defensive parsing: gracefully falls back to existing baseline if LinkedIn serves captcha or anti-bot walls.
- [x] **`scripts/sync-github-contributions.cjs`**:
  - Uses GitHub API to fetch user profile, pinned repos, total commit contributions, and top languages.
  - Outputs payload safely to be consumed by consolidation engine.
- [x] **`scripts/consolidate-data.cjs`**:
  - Validates JSON schema integrity of all data sources.
  - Merges synced LinkedIn details into the primary experience feed and profile summary.
  - Ingests top GitHub repositories into the projects showcase.

### Phase 5: GitHub Actions Workflows Configuration
- [x] Created `.github/workflows/portfolio-sync-deploy.yml`:
  - Configures cron schedule for **every Saturday at 1:00 PM IST** (`30 7 * * 6` UTC).
  - Includes `workflow_dispatch` trigger for immediate manual execution.
  - Runs LinkedIn sync script (`scripts/sync-linkedin.cjs`).
  - Runs GitHub contributions sync script (`scripts/sync-github-contributions.cjs`).
  - Consolidates data (`scripts/consolidate-data.cjs`).
  - Checks if data files changed; if changed, commits updates directly to `main` in THIS repo (`[skip ci]`).
  - Runs `npm run build` to generate production bundle in `dist/`.
  - Deploys compiled bundle to GitHub Pages using `actions/deploy-pages@v4`.

### Phase 6: Setup Documentation & Operational Instructions
- [x] Authored `setup.txt`:
  - Single-repository architecture guide.
  - Detailed instructions for setting up GitHub Secrets (`GH_PAT`, `LINKEDIN_LI_AT` optional cookie).
  - Enabling GitHub Pages in repository settings (Source: GitHub Actions).
  - Workflow permissions configuration (`read and write permissions`).
  - Local development and test procedures (`npm run dev`).

### Phase 7: Verification & Quality Assurance
- [x] Verified Vite production build without warnings or errors (built in 1.67s).
- [x] Verified `dist/` contains index.html, assets, and `resume.pdf`.
- [x] Verified local test run of sync scripts (`node scripts/sync-linkedin.cjs`, `node scripts/sync-github-contributions.cjs`, `node scripts/consolidate-data.cjs`).
- [x] Verified local dev server compatibility (`npm run dev`).
- [x] Verified single-repository architecture, ready for drop-in latest photos at `public/images/profile.jpg`.

### Phase 8: Apple Pro UI, Witty Gen Z Theming & Visitor Intelligence
- [x] **Image Load Time Optimization**:
  - Converted all portfolio images to high-efficiency WebP (`.webp`) format, achieving up to 64.2% payload reduction.
  - Added `<link rel="preload">` in `index.html` for instant hero image display.
  - Applied `loading="eager"` + `fetchPriority="high"` on above-the-fold hero assets and `loading="lazy"` + `decoding="async"` across the rest of the application.
- [x] **Apple Design System & SF Pro Typography**:
  - Integrated Apple's SF Pro Display and SF Pro Text typography system with fallback to native `-apple-system, BlinkMacSystemFont`.
  - Added Apple-inspired frosted glass components (`apple-glass-nav`, `-webkit-backdrop-filter: blur(20px)`), titanium grid patterns, and high-precision micro-interactions.
  - Implemented responsive fluid scaling and safe area insets (`padding-bottom: env(safe-area-inset-bottom)`) supporting ultra-wide (21:9), desktop (16:9), tablet (4:3), and mobile aspect ratios (9:19.5).
- [x] **Gen Z Light/Dark Mode Experience**:
  - Implemented custom hover popover on the theme toggle: *"Programmers Like Dark Mode Light Attracts Bugs"* with witty subtext (`🪲 Real devs don't burn their retinas...`).
  - Added animated interactive top toast upon toggling theme with instant feedback.
  - Seamless dark and light themes across all sections.
- [x] **Mobile Number Removal & Clean Resume**:
  - Verified 0 phone number references in any codebase files, JSON schemas, or components.
  - Programmatically redacted `+91 7223089620` from `public/resume.pdf` using PyMuPDF vector redaction, leaving clean links (`GitHub | LeetCode | LinkedIn | dhruvabhattacharya130102@gmail.com`).
- [x] **Client Intelligence & Recruiter Check-In System (`VisitorTracker.jsx`)**:
  - Automatically captures browser name, OS, screen resolution, aspect ratio, device type, visit count, and timestamps.
  - Politeness-delayed Apple-style check-in card for recruiters/visitors to record their name and company.
  - Accessible Analytics Ledger via `Ctrl + Shift + V` or clicking bottom-left status pill, with JSON export capability and `window.getPortfolioVisitors()` console hook.
- [x] **Copy Refinement**: Changed Hero CTA from *"View Production Experience (STAR)"* to *"View More"*.
- [x] **Interactive Interview Scheduling**:
  - Built interactive `ScheduleInterviewModal` solving silent mailto failures.
  - Direct 100% reliable 1-click launch via Gmail Web compose, desktop app fallback, and full invitation template copy.
- [x] **Footer Socials Centering**:
  - Redesigned `Footer.jsx` into a 3-column responsive grid centering `LinkedIn`, `GitHub`, `LeetCode`, and `GeeksforGeeks` squarely in the middle of the viewport.

### Phase 9: Carousel Automation, Clean Experience Presentation & Delayed Visitor Prompt
- [x] **Top GitHub Repositories Section Removed**: Removed repo grid in `Contributions.jsx` to focus exclusively on verified LeetCode (900+ Solved) and GeeksforGeeks algorithmic mastery.
- [x] **Photo Carousel Automation**: Configured automated 3.5s carousel cycling in `Hero.jsx` through all 4 personas, with hover-pause functionality and progress dot indicators.
- [x] **Sub-Photo Tag Removed**: Removed `<p className="mt-3 text-xs font-mono text-slate-500 text-center">Tata Consultancy Services (TCS) • Microsoft ESS AI Agent</p>` below the photo frame.
- [x] **Clean Work Experience Presentation**: Removed literal labels *"STAR Pattern"*, *"Situation:"*, *"Task:"*, *"Action:"*, and *"Result:"* while preserving the logical engineering breakdown (Context, Engineering Deliverables, Quantified Production Impact).
- [x] **Polite Visitor Check-In Trigger**: In `VisitorTracker.jsx`, updated the check-in modal trigger to require both: (1) at least 10 seconds elapsed, AND (2) user has scrolled near the bottom of the portfolio (Contact section).

### Phase 10: Zero-Authentication Public LinkedIn Bio Sync & Visitor Intelligence Strategy
- [x] **Zero-Authentication LinkedIn Ingestion (`scripts/sync-linkedin.cjs`)**:
  - Completely unauthenticated: NO session cookies (`li_at`), NO tokens, NO credentials.
  - Recursively follows HTTP 301/302 redirects to extract public Open Graph metadata (`og:description`, `og:title`).
  - Strict Fail-Safe Rule: If LinkedIn restricts access, updates are accepted strictly from LinkedIn BIO metadata only without breaking the build or workflow.
  - Successfully harvested: `"I build backend systems that are designed to scale, not just work"`.
- [x] **Automated Data Consolidation (`scripts/consolidate-data.cjs`)**:
  - Merged fresh LinkedIn bio hook into `profile.json` as tagline and prepended to verified enterprise profile summary without truncating key production metrics.
- [x] **Clean GitHub Actions Workflow (`.github/workflows/portfolio-sync-deploy.yml`)**:
  - Removed all `LINKEDIN_LI_AT` environment secrets. Workflow runs seamlessly on weekly cron (Saturday 1:00 PM IST / `30 7 * * 6`) and manual dispatch.
- [x] **Visitor Intelligence Transmission Strategy (`VisitorTracker.jsx`)**:
  - Captures browser name/version, OS, device type, screen resolution, aspect ratio, timezone, referrer, visit count, and visitor check-in (Name, Company, Role).
  - Multi-tier data reception strategy:
    1. Local Persistence: Saved in `localStorage` (`dhruva_visitor_ledger`).
    2. Real-Time Webhook/Email Dispatch: Support for `VITE_VISITOR_WEBHOOK_URL` using `navigator.sendBeacon` for zero-overhead transmission directly to Dhruva's Discord, Telegram, or email webhook.
    3. On-Demand Analytics Ledger: Hotkey `Ctrl + Shift + V` or clicking bottom-left status pill to view live visitor ledger and download JSON report.
    4. Console Hook: `window.getPortfolioVisitors()`.

---

## 4. Verification & Validation Metrics

| Checkpoint | Target Standard | Verification Method |
| :--- | :--- | :--- |
| **Build Integrity** | Clean build with zero errors | `npm run build` exits with code 0 |
| **Lighthouse Score** | > 95 in Performance, Accessibility, SEO | Chrome Lighthouse audit |
| **Data Synchronization** | Accurate extraction without crash | Dry run `node scripts/consolidate-data.cjs` |
| **Cron Trigger Accuracy** | Every Saturday 1:00 PM IST (`30 7 * * 6`) | GitHub Actions cron validator |
| **Mobile Responsiveness** | Fully fluid without horizontal scroll | Responsive viewport emulation |
