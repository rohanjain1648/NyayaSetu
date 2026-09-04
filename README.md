# ⚖️ NyayaSetu AI (न्यायसेतु)
### *The Next-Generation Indian Legal Intelligence & Litigation Operating System*

[![ILTN Vibeathon 2026](https://img.shields.io/badge/ILTN%20Vibeathon-2026%20Edition-black?style=for-the-badge)](https://iltn.in)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🏛️ Executive Summary

On **July 1, 2024**, the Republic of India witnessed the largest criminal law reform in modern history. The century-old colonial enactments—the **Indian Penal Code (1860)**, the **Code of Criminal Procedure (1973)**, and the **Indian Evidence Act (1872)**—were repealed and superseded by the **Bharatiya Nyaya Sanhita (BNS)**, **Bharatiya Nagarik Suraksha Sanhita (BNSS)**, and **Bharatiya Sakshya Adhiniyam (BSA)**.

For over 1.7 million practicing advocates, corporate counsels, judicial officers, and law enforcement agencies across India, this transition created unprecedented friction:
* Confusion over statutory section mappings and transitional proceedings.
* Fatal limitation calculation errors (e.g. S.138 NI Act 30-day notice and 15-day cure clocks).
* Disparate state court fees and shifting pecuniary thresholds.
* Evolving data protection liabilities under the **Digital Personal Data Protection (DPDP) Act, 2023**.

**NyayaSetu AI** was engineered as an end-to-end, zero-latency **Litigation Operating System** designed specifically for India's legal community. Built during the **ILTN Legal Vibeathon 2026**, it combines statutory intelligence, algorithmic procedural calculators, automated court-paper drafting, and hybrid AI copilot capabilities into a single, high-contrast, executive-grade dashboard.

---

## 🚀 Key Modules & Capabilities

```
┌────────────────────────────────────────────────────────────────────────────┐
│                             NYAYASETU AI OS                                │
├───────────────┬───────────────┬───────────────┬────────────┬───────────────┤
│   SanhitaX    │   NyayaKram   │Vakalat Studio │NyayaDrishti│  Vidhi Mitra  │
│  Transition   │  Limitation & │ Court-Docket  │DPDP & Audit│ AI Copilot &  │
│  Cross-Matrix │   Court Fees  │   Drafting    │ Compliance │  Cause Diary  │
└───────────────┴───────────────┴───────────────┴────────────┴───────────────┘
```

### 1. 📖 SanhitaX: Statutory Cross-Matrix & FIR Migrator
* **Bidirectional Cross-Matrix**: Instant lookup mapping legacy statutes (`IPC`, `CrPC`, `IEA`) to their corresponding new sections in `BNS`, `BNSS`, and `BSA`.
* **Substantive Modification Tracker**: Highlights substantive deviations—such as mandatory community service, terrorism definitions, organized crime, forensic mandates, and expanded police remand provisions.
* **FIR & Charge-Sheet Migration Parser**: Allows advocates and investigating officers to paste verbatim FIR or charge-sheet excerpts drafted under old laws. The parser detects all cited sections and dynamically generates a court-ready migration schedule.
* **Classification Intelligence**: Displays bailability, compoundability, and cognizable classifications alongside landmark Supreme Court precedents.

### 2. ⏱️ NyayaKram: Statutory Limitation & Court Fee Calculator
* **Section 138 NI Act Cheque Bounce Simulator**:
  * Calculates strict, non-negotiable statutory timelines under S.138(b) (30-day demand notice window).
  * Enforces the 15-day statutory cure period under S.138(c) before cause of action arises.
  * Calculates the 30-day institution deadline for criminal complaints under Section 142(1)(b).
  * Displays dynamic countdown badges, condonation guidance, and judicial warnings.
* **Limitation Act, 1963 Presets**: Computes precise expiry dates for money recovery suits, breach of contracts, tort claims, declaratory reliefs, and appeals, with strict Section 5 condonation feasibility indicators.
* **Pecuniary Jurisdiction & Ad-Valorem Court Fee Estimator**:
  * State-specific computation engine supporting **Delhi, Maharashtra (Bombay), Karnataka, Tamil Nadu, and West Bengal**.
  * Multi-tier slab calculations for ad-valorem institution fees and determines competent forum (*Civil Judge Junior Division vs. Senior Division vs. High Court Original Side*).

### 3. 📜 Vakalat Studio: Court Pleadings & Electronic Certificate Studio
* **Automated Notice Generator**:
  * Section 138 Negotiable Instruments Act Statutory Demand Notice.
  * Consumer Protection Act Defect & Deficiency Notice.
  * Commercial Summary Suit Plaint under Order XXXVII CPC.
  * Section 63 BSA (formerly Section 65B IEA) Certificate for Electronic Records.
* **Authentic Court Paper Previews**:
  * **Court Docket Green Paper** (authentic green ledger paper styling with standard legal borders).
  * **High Court Ivory Laid Paper** format.
* **Print & PDF Export**: Instant print-ready formatting optimized for A4/Legal docket filing.

### 4. 🛡️ NyayaDrishti: DPDP Act 2023 & Contract Risk Auditor
* **Clause-by-Clause Contract Auditing**: Identifies ambiguous indemnity terms, unilateral termination triggers, and uncapped liability exposures.
* **DPDP 2023 Compliance Engine**: Evaluates commercial agreements against India's Data Protection regime:
  * Section 5 Notice requirements.
  * Section 6 Valid & unconditional consent mechanics.
  * Section 16 Cross-border data transfer adherence.
  * Grievance redressal timelines and Data Protection Board (DPB) penalty mitigations.

### 5. 🤖 Vidhi Mitra: Dual-Engine Legal AI Copilot
* **Multi-Provider AI Architecture**:
  * **Groq API**: Powered by ultra-fast Llama 3 70B Versatile for deep statutory synthesis.
  * **OpenAI API**: Powered by GPT-4o for nuanced legal drafting and case analysis.
  * **Offline Vidhi Engine**: Zero-network fallback engine executing fully inside the browser with zero latency and complete attorney-client data privacy.
* **Command Palette (Ctrl + K)**: Quick global search across all 350+ sections, limitation schedules, and legal templates.

### 6. 📅 Cause List Diary & Hearing Tracker
* Advocate hearing roster for tracking upcoming matters across High Courts, District Courts, and Tribunals (NCLT/DRT).
* Categorized by listing stage (*Notice, Pleadings, Evidence, Final Arguments, Pronouncement of Orders*).
* Priority tags, courtroom numbers, and judge coram tracking.

---

## 🎨 Design System & Aesthetics

NyayaSetu AI is built with an **Executive Monochrome Dashboard Architecture**:
* **Theme**: High-contrast white canvas (`#FFFFFF` / `#F8FAFC`) with crisp charcoal typography (`#0F172A`).
* **Buttons**: Sharp black action controls (`bg-black text-white hover:bg-slate-800`).
* **Sidebar**: Fixed vertical left-hand navigation with quick module switching.
* **Header**: Persistent top horizontal bar with global search (`Ctrl + K`), system health indicators, and AI provider toggles.
* **Typography**:
  * Headings: **Cinzel** (Google Fonts) — classical legal gravitas.
  * Interface: **Plus Jakarta Sans** — modern executive readability.
  * Citations: **JetBrains Mono** — precise statutory references.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) with `@tailwindcss/vite` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design System |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Delight & Feedback** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **AI LLM Providers** | Groq Cloud (Llama 3 70B), OpenAI (GPT-4o), and Offline In-Browser Deterministic Engine |

---

## 📦 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/nyayasetu-ai.git
cd itln
npm install
```

### 2. Configure Environment (Optional)
To use cloud LLM inference, configure your API keys in the app settings modal (click on the AI status pill in the top header) or create a `.env` file:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```
> **Note**: An API key is **not** required to use NyayaSetu AI! By default, the application runs on the built-in **Offline Vidhi Engine**, giving you instant, offline legal assistance with zero cloud dependencies.

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
```
The compiled, production-optimized assets will be generated in the `dist/` directory.

---

## 📂 Project Architecture

```
itln/
├── index.html                       # Application shell with font preloads & meta tags
├── package.json                     # Dependencies and build scripts
├── vite.config.ts                   # Vite configuration with @tailwindcss/vite
├── src/
│   ├── main.tsx                     # React entry point
│   ├── App.tsx                      # Layout orchestrator (Sidebar + Header + Content)
│   ├── index.css                    # Tailwind CSS v4 setup & custom tokens
│   ├── components/
│   │   ├── common/
│   │   │   ├── Sidebar.tsx          # Left vertical navigation menu
│   │   │   ├── Header.tsx           # Top horizontal search & AI status bar
│   │   │   ├── Preloader.tsx        # Cinematic legal scales preloader
│   │   │   ├── QuickSearchModal.tsx # Ctrl+K command palette
│   │   │   ├── SettingsModal.tsx    # AI provider configuration modal
│   │   │   └── Footer.tsx           # Footer with ILTN Vibeathon attribution
│   │   ├── sanhita/
│   │   │   └── SanhitaExplorer.tsx  # SanhitaX migration matrix & FIR parser
│   │   ├── calculator/
│   │   │   ├── LimitationCalculator.tsx # S.138 & Limitation Act 1963 calculators
│   │   │   └── CourtFeeCalculator.tsx   # Multi-state court fees & pecuniary forums
│   │   ├── drafting/
│   │   │   └── NoticeStudio.tsx     # Vakalat Studio notice & green paper docket
│   │   ├── compliance/
│   │   │   └── ContractAuditor.tsx  # NyayaDrishti DPDP 2023 & contract auditor
│   │   ├── copilot/
│   │   │   └── VidhiCopilot.tsx     # Vidhi Mitra AI chat interface
│   │   └── diary/
│   │       └── CauseListDiary.tsx   # Advocate daily hearing cause list
│   ├── data/
│   │   ├── sanhitaMapping.ts        # IPC ↔ BNS, CrPC ↔ BNSS, IEA ↔ BSA matrix
│   │   ├── limitationRules.ts       # Limitation Act 1963 statutory articles
│   │   ├── courtFeesData.ts         # State-wise fee slabs & pecuniary limits
│   │   └── complianceRules.ts       # DPDP 2023 audit rules and benchmarks
│   ├── types/
│   │   └── legal.ts                 # TypeScript interfaces for all legal entities
│   └── utils/
│       ├── aiService.ts             # Groq, OpenAI, and Offline Vidhi client
│       ├── dateUtils.ts             # Indian date formatters & S.138 countdown logic
│       └── documentExport.ts        # Currency formatters & legal print/export helpers
```

---

## ⚖️ Legal Disclaimer

NyayaSetu AI is designed as a litigation aid and intelligence system for legal practitioners, law firms, and researchers. It does not constitute formal attorney-client advice. Advocates should always verify section references against official Gazettes of India and state-specific court fee amendments.

---

## 🏆 ILTN Legal Vibeathon 2026

* **Event**: ILTN Online Vibeathon for India's Legal Community
* **Focus Area**: Access to Justice, Modern Legal Operations & Statutory Migration
* **Created by**: *NyayaSetu Development Team*
* **License**: MIT
