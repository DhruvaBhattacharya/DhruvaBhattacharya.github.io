# Portfolio 2.0 - System Context & Architecture Specification

## 1. Executive Overview

**Portfolio 2.0** is the next-generation, high-performance personal portfolio and engineering showcase for **Dhruva Bhattacharya**. The platform transitions from a legacy Create-React-App static bundle to a modern, dynamic, data-driven web platform powered by **Vite + React + Tailwind CSS**, featuring automated weekly profile synchronization via **GitHub Actions** and real-time GitHub contribution ingestion.

---

## 2. Engineering Profile & Unified Data Source

Data is synthesized from the legacy build files (`DhruvaBhattacharya.github.io-master`), the latest professional resume (`Latest_resume-DhruvaBhattacharya .pdf`), and live external endpoints (LinkedIn and GitHub).

### 2.1 Core Identity & Contact
- **Name**: Dhruva Bhattacharya
- **Role**: Backend Software Engineer & Generative AI / Microservices Developer
- **Status**: Targeting Product-Based SDE / Backend & AI Engineering Roles
- **Email**: `dhruvabhattacharya130102@gmail.com`
- **Location**: Jabalpur, Madhya Pradesh, India
- **GitHub**: [github.com/dhruvaop](https://github.com/dhruvaop)
- **LinkedIn**: [linkedin.com/in/dhruvabhattacharya](https://www.linkedin.com/in/dhruvabhattacharya/)
- **LeetCode**: 900+ Solved ([LeetCode Profile](https://leetcode.com/dhruvaop))
- **GeeksforGeeks**: [geeksforgeeks.org/profile/dhruvabhattacharya](https://www.geeksforgeeks.org/profile/dhruvabhattacharya)

---

### 2.2 Professional Experience (Synthesized from Latest Resume)

#### 1. Tata Consultancy Services (TCS) — Aug 2024 – Present
**Role**: System Engineer – Backend Developer  
**Key Projects & Impact**:
- **TCS HOBS – Telecom OSS/BSS Platform** *(Java, Spring Boot, Microservices)*:
  - Multi-tenant enterprise platform for global telecom operators (Sonatel, Malaysian Telecom, OGN, Vodafone) managing invoicing, billing, ticketing, and account lifecycle.
  - Re-architected cross-database query layer into a consolidated MongoDB document-store cluster, eliminating heavy cross-DB joins on high-volume account data and drastically accelerating UI data-load throughput.
  - Engineered Redis-backed caching for high-read endpoints: **cut average API latency from 1000ms to 150ms (85% reduction)** and expanded transaction throughput by **40%**.
  - Built parallel and sequential API orchestration flows in account provisioning: **reduced backend processing time by 25%** with **99.9% uptime** under multi-tenant load.
  - Delivered a webhook-driven SLA-breach alert system detecting tickets approaching/exceeding 24-hr SLAs; led migration of legacy SOAP/JAXB (XML) services to stateless, annotation-driven REST microservices.
  - Slashed production incidents by 18%, debugging time by 25%, and defect leakage by 20% via structured logging, health checks, and smoke tests.

- **Microsoft ESS (Employee Self-Service) AI Agent** *(Generative AI / Azure Automation)*:
  - Delivered via TCS for client **Microsoft** using the internal Microsoft technology stack.
  - Built Copilot Studio connectors to internal Microsoft APIs surfacing leave balances, ticket statuses, payroll, and device requests directly inside M365 Copilot.
  - Designed multi-agent orchestration flows using Azure Logic Apps and .NET Core to route queries and dispatch notifications across specialized sub-agents.
  - Owned response-quality validation: benchmarked against knowledge-base prompts to reliably maintain an **80%+ accuracy** release threshold.
  - Developed an Azure DevOps CI/CD pipeline (Playwright test automation, Azure Key Vault secrets) publishing aggregated responses to Copilot Studio with Application Insights observability.
  - Delivered multilingual OCR automation via Azure AI Document Intelligence for Purchase Order validation across 6+ languages (Arabic, Japanese, French, Italian, etc.), reducing manual data entry by **78%**.

#### 2. TechXR Innovations Pvt. Ltd. — Jul 2022 – Sep 2022
**Role**: AR/VR Intern  
- **Situation**: Interactive medical training required realistic 3D surgical simulations with low motion-to-photon latency.
- **Task**: Prototype and validate an interactive virtual reality surgical simulation in Unity.
- **Action**: Engineered 3D spatial mechanics, physics-based collision flows, and virtual tool manipulation.
- **Result**: Successfully delivered responsive VR prototype validated through iterative feedback cycles.

---

### 2.3 Flagship Projects

1. **Logic Labs – AI-Powered EdTech Platform**
   - **Stack**: MERN (MongoDB, Express, React, Node.js), Groq Cloud, Llama-3.3-70B, Razorpay, Cloudinary
   - **Features**: Full-stack role-based architecture (student/instructor/admin), payment gateway integration, media asset pipeline. Embedded RAG chatbot powered by Llama-3.3-70B with ingestion, chunking, embedding, retrieval, and hallucination-mitigation validators. Eliminated N+1 queries and patched 10+ web security vulnerabilities.
2. **Production Incident Resolution – OTP Signup Outage**
   - **Stack**: Node.js/Express, MongoDB/Mongoose, Railway, Netlify, Brevo HTTPS API
   - **Features**: Diagnosed silent signup failures caused by tightly coupled Mongoose `post('save')` hooks and environment-gated logging. Re-architected email delivery out of the ORM hook into the controller with resilient fallback, transitioning from restricted sandbox services to an authenticated Brevo HTTPS API. Fast-forward merged stale production branches and instituted mail-service health-check probes.

---

### 2.4 Education & Honors
- **Degree**: B.Tech in Computer Science & Engineering (Specialization: AI & Machine Learning)
- **Institution**: Gyan Ganga Institute of Technology & Sciences (GGITS), Jabalpur (2020 – 2024)
- **CGPA**: 8.28 / 10
- **Honors**:
  - **Rank 1 (Asia)** — Alibaba Cloud Low-Code Contest (3,000+ teams)
  - **Finalist** — Smart India Hackathon (SIH) National 36-hr Grand Finale
  - **900+ LeetCode Problems Solved** across Data Structures & Algorithms
- **Certifications**:
  - Microsoft Certified: Azure AI Engineer Associate
  - AWS Certified Cloud Practitioner & AWS Cloud Foundations
  - AWS Machine Learning for NLP
  - UpGrad Executive Program in Generative AI
  - Airtribe AI-First Software Engineering

---

## 3. Legacy vs Modernization Architecture

```
Legacy Architecture (1.0)               Portfolio 2.0 (Modernized)
=====================================   =================================================
• Create React App (CRA, Webpack)       • Vite 6 (ESM, Instant HMR, lightning builds)
• Monolithic bundle (1.5MB+ JS/CSS)      • Modular React 18/19 + Tailwind CSS 3.4+
• Hardcoded portfolio.js strings        • Decoupled Data Layer: JSON database + dynamic sync
• Manual edits required for updates     • In-Repo GitHub Actions Cron Sync (Sat 1PM IST)
• Static HTML deployment without CI/CD   • Automated CI/CD: Commits to main & deploys to Pages
• Fixed 2021 theme and obsolete styles   • Modern UI: Glassmorphism, Dark/Light mode,
                                          Smooth animations, interactive metrics
• No local dev mock system              • 100% Local-Dev Friendly (npm run dev out of the box)
• Fragmented multi-repo thinking        • SINGLE-REPO: All code, sync scripts & deployment here
```

### 3.0 Core Operating Principles
1. **Single-Repository Workflow**: No separate or secondary repositories. All codebase, automation scripts (`scripts/`), GitHub Actions workflows (`.github/workflows/`), and deployment targets live directly in this repository (`DhruvaBhattacharya.github.io`).
2. **In-Repo Automated Commits to Prod**: When the Saturday 1:00 PM IST cron job detects changes in LinkedIn or GitHub contributions, it automatically commits the updated data directly to `main` in this repository and publishes the production build to GitHub Pages.
3. **Local Development First**: The portfolio must run locally on developer machines (`npm run dev`) without needing any external API keys or network connection. All data layers feature reliable local fallbacks.
4. **Interactive Multi-Photo Persona Switcher**: Integrates all 4 uploaded user photos (`Professional 2`, `Coding Dhruva`, `Professional 1`, `Casual Dhruva`) into an interactive persona switcher (`👔 Professional`, `💻 Engineering`, `🎯 Portrait`, `🕶️ Creative`) in the Hero section, featuring custom face-centering optical alignment (`professional-2-portrait.webp`, `objectPosition: 'center 10%'`, card container `h-[460px] sm:h-[500px]`), and a dedicated 800x800 face-centered headshot avatar (`profile-headshot.webp`) with active recruiter status chip in the Contact section.


### 3.1 Dependency & Folder Tree (Modernization Matrix)

```
Portfolio-2.0/
├── .github/
│   └── workflows/
│       ├── linkedin-sync.yml         # Scheduled Cron (Sat 1PM IST): extracts Bio & Experience
│       ├── contributions-sync.yml    # Ingests top GitHub repos, stars, commit contributions
│       └── deploy.yml                # Consolidates data, compiles Vite bundle, deploys to Pages
├── DhruvaBhattacharya.github.io-master/  # [LEGACY] Original build files preserved for audit & assets
│   └── DhruvaBhattacharya.github.io-master/
│       └── static/media/             # Source of original SVG/PNG icons and certificates
├── scripts/                          # CI/CD Data Ingestion Scripts
│   ├── sync-linkedin.js              # Node/Puppeteer or Python crawler for LinkedIn Bio/Experience
│   ├── sync-github-contributions.js  # GraphQL query engine for GitHub stats & pinned repos
│   └── consolidate-data.js           # Validates schema and merges dynamic + static records
├── src/
│   ├── assets/                       # Migrated SVGs, brand logos, optimized PNGs/WebPs
│   ├── components/
│   │   ├── common/                   # Navbar, Footer, ThemeToggle, Button, Modal, Tooltip
│   │   ├── hero/                     # Hero banner, status badge ("Immediate Joiner"), metrics
│   │   ├── experience/               # Interactive timeline with TCS, Microsoft ESS, TechXR details
│   │   ├── projects/                 # Filterable card grid (GenAI, Systems, FullStack) + modal
│   │   ├── skills/                   # Category pill-tabs, radar/progress bars, tech icons
│   │   ├── contributions/            # Live GitHub activity graph, pinned repos, LeetCode card
│   │   ├── education-certs/          # University, awards (Alibaba #1, SIH), verified cert badges
│   │   └── contact/                  # Quick contact card, vCard export, direct mail, social bar
│   ├── data/                         # Decoupled Data Layer (Single Source of Truth)
│   │   ├── profile.json              # Bio, titles, greetings, socials, contact info
│   │   ├── experience.json           # Detailed work experience & metrics (TCS, Microsoft, TechXR)
│   │   ├── linkedin-sync.json        # Auto-updated bio & experience payload from LinkedIn cron
│   │   ├── github-contributions.json # Auto-updated GitHub repositories and contribution metrics
│   │   ├── projects.json             # Flagship and side projects with live demo/repo links
│   │   ├── skills.json               # Grouped technologies with proficiency and icons
│   │   └── certifications.json       # Degree, certifications, and contest awards
│   ├── hooks/                        # Custom hooks: useTheme, useDynamicData, useScrollSpy
│   ├── styles/                       # Tailwind entry, animations, glow utilities
│   ├── App.jsx                       # Root layout and section orchestration
│   └── main.jsx                      # DOM bootstrap
├── public/                           # Static assets, favicon, resume PDF copy
├── Latest_resume-DhruvaBhattacharya .pdf # Current verified resume
├── legacy_portfolio_data.js          # Extracted legacy portfolio configuration
├── setup.txt                         # Step-by-step CI/CD & repository setup instructions
├── CONTEXT.md                        # Architectural context (this document)
├── PLAN.md                           # Phased development and modernization roadmap
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 4. Dynamic Data Synchronization Strategy

```
                              +---------------------------------+
                              |  Every Saturday at 1:00 PM IST  |
                              |       (Cron: 30 7 * * 6)        |
                              +----------------+----------------+
                                               |
                       +-----------------------+-----------------------+
                       |                                               |
                       v                                               v
        +-----------------------------+                 +-----------------------------+
        |  Job 1: LinkedIn Sync       |                 |  Job 2: GitHub Ingestion    |
        |  - Target: Bio & Experience |                 |  - Top pinned repositories  |
        |  - Script: sync-linkedin.js |                 |  - Contribution calendar    |
        |  - Output: linkedin-sync.json                 |  - Output: github-contributions|
        +--------------+--------------+                 +--------------+--------------+
                       |                                               |
                       +-----------------------+-----------------------+
                                               |
                                               v
                                +-----------------------------+
                                |  Job 3: Data Consolidation  |
                                |  - Merges synced feeds      |
                                |  - Verifies JSON integrity  |
                                |  - Fallback preservation    |
                                +--------------+--------------+
                                               |
                                               v
                                +-----------------------------+
                                |  Job 4: Build & Deploy      |
                                |  - Vite production build    |
                                |  - Deploy to GitHub Pages   |
                                +-----------------------------+
```

### 4.1 LinkedIn Bio Sync (Zero-Authentication Public Pipeline)
- **Target URL**: `https://www.linkedin.com/in/dhruvabhattacharya`
- **Authentication**: Zero authentication required (NO session cookies, NO `li_at`, NO credentials).
- **Extracted Fields**:
  1. **Bio**: OpenGraph description and tagline (`I build backend systems that are designed to scale, not just work`).
  2. **Headline**: OpenGraph title and current title at Tata Consultancy Services.
- **Fail-Safe Mechanism**: The script follows HTTP 301/302 redirects automatically using public web crawler headers. If full experience or access is restricted by LinkedIn, updates are accepted strictly from the LinkedIn BIO metadata only without breaking the build or workflow. Verified enterprise metrics and STAR experience are preserved from `experience.json`.

### 4.2 GitHub Contributions Sync
- Uses GitHub GraphQL API with `GITHUB_TOKEN` (or personal token `GH_PAT`).
- Ingests:
  - Total stars, fork count, commit activity for the past 12 months.
  - Top 6 pinned and highest-starred repositories.
  - Primary language distribution.

---

## 5. UI/UX Design System Specifications (Apple Pro + Gen Z)

- **Framework**: Tailwind CSS v3.4+ with custom WebKit backdrop filters
- **Typography (Apple SF Pro)**:
  - Heading & Display: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", Inter, sans-serif`
  - Code & Metrics: `"SF Mono", "JetBrains Mono", Menlo, monospace`
- **Color Palette & Material Aesthetics**:
  - Background (Dark): Apple Obsidian `#020617` with subtle titanium radial lighting
  - Background (Light): Apple Crisp Frost `#F8FAFC` with soft borders
  - Glassmorphic Surfaces: `apple-glass-nav` (`-webkit-backdrop-filter: blur(20px) saturate(180%)`), high-precision border rings (`border-white/10`)
  - Primary Accent: Neon Cyan (`#06B6D4` / `cyan-400`) & Electric Indigo (`#6366F1`)
- **Key Interactivity & Dynamic Features**:
  - Live pulse indicator: "🟢 Targeting Product-Based SDE / Backend & AI Engineering Roles"
  - Gen Z Theme Switcher: Hover warning popover *"Programmers Like Dark Mode Light Attracts Bugs"* + interactive bug alert toast
  - Interactive Schedule Interview Dialog: Multi-channel launch via Gmail Web, desktop mail, and copy invitation template
  - Client Intelligence & Recruiter Check-In (`VisitorTracker.jsx`): Automatic browser/OS/aspect-ratio logging, guestbook name capture, and `Ctrl+Shift+V` analytics ledger
  - Highlight metric cards: `85% Latency Cut`, `40% Throughput Boost`, `900+ LeetCode`, `Alibaba Rank 1`
  - Performance: WebP image pipeline, `<link rel="preload">`, `loading="eager"`, and `decoding="async"` reducing payload by up to 64.2%
