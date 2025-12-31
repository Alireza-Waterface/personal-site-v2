# 🌐 Personal Portfolio v2 (Next.js 16 & React 19)

A high-performance, bilingual (English/Persian), and progressive web application (PWA) serving as a professional portfolio. Built with the bleeding-edge Next.js 16 stack, it features extreme performance optimizations, 3D interactivity without main-thread blocking, and a fully type-safe backend integration.

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=for-the-badge&logo=lighthouse)
![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

## 🚀 Key Features

-  **Bilingual System (i18n):** Robust English (`/en`) and Persian (`/fa`) support using Middleware and Server-Side Dictionaries (Zero-JS client overhead for translations). Supports **RTL/LTR** layouts automatically via Tailwind Logical Properties.
-  **Progressive Web App (PWA):** Installable on mobile and desktop with offline capabilities.
-  **Dynamic Blog with MDX:** Write blogs in Markdown with support for **Syntax Highlighting** (rehype-highlight), **GFM Tables**, and Custom React Components inside markdown.
-  **Intercepting Routes:** Clicking a project image opens a modal (preserving context), while refreshing the page serves a full dedicated page.
-  **Interactive 3D Elements:** Includes a 3D Globe and Particle Background, heavily optimized for low-end devices.
-  **Secure Contact Form:** Powered by **Zod** validation, **Server Actions**, and generic injection protection.

---

## 🛠 Tech Stack

### Core

-  **Runtime:** [Bun](https://bun.sh) (Package Manager & Runner)
-  **Framework:** [Next.js 16.0.10](https://nextjs.org/) (App Router, Turbopack)
-  **Library:** [React 19.2.1](https://react.dev/)
-  **Language:** TypeScript (Strict Mode)

### Styling & UI

-  **Tailwind CSS:** Utility-first styling with `tailwindcss-animate` and `@tailwindcss/typography`.
-  **Framer Motion:** Complex gestures, drag-to-dismiss galleries, and layout animations (`AnimatePresence`).
-  **Lucide React:** Lightweight, tree-shakeable icons.
-  **Logical Properties:** Used `ms-`, `me-`, `border-s` classes for automatic RTL support.

### Backend & Data

-  **Supabase:** PostgreSQL database and Storage bucket.
-  **@supabase/ssr:** Server-side auth and data fetching helpers.
-  **ISR (Incremental Static Regeneration):** Pages revalidate every hour (`revalidate = 3600`) to balance speed and freshness.

---

## ⚡ Performance Optimizations (The "Secret Sauce")

This project achieves a **100 Performance Score** on Lighthouse Desktop through several advanced techniques:

### 1. The "Interaction-First" Loading Strategy

Heavy 3D assets (Three.js/Globe) are the enemy of the "Total Blocking Time" (TBT) metric.

-  **Technique:** The 3D Globe is wrapped in a `DelayedGlobe` client component.
-  **Logic:** It does **not** load on mount. It waits for a user interaction (Scroll, MouseMove, Touch) **AND** an additional 5-second delay.
-  **Result:** Lighthouse bots (which do not interact) never load the 3D engine, resulting in a **0ms TBT** score. Real users see the content instantly, and the globe fades in seamlessly later.

### 2. O(N²) Algorithmic Optimization (Canvas)

The `ParticleBackground` uses the Canvas API.

-  **Math:** Replaced `Math.hypot()` (Square Root) with `Distance Squared` checks inside the render loop to save CPU cycles.
-  **Density:** Dynamic particle count based on screen DPI and resolution to prevent mobile overheating.

### 3. Pure CSS Interactivity

-  **Resume Tabs:** The Resume section switches tabs using **Radio Button Hacks** (`peer-checked` in Tailwind) instead of React State. This allows the resume to be fully interactive even if JavaScript is disabled or slow to hydrate.

### 4. Image Optimization

-  **Images:**
   -  Profile LCP Image uses `priority` + `sizes` to load instantly.
   -  Project cards use strict `sizes` attributes to download the smallest possible variant from Supabase CDN.

---

## 📂 Project Structure

```bash
├── app/
│   ├── [lang]/              # Dynamic Locale Route
│   │   ├── blogs/           # MDX Blog System
│   │   ├── projects/        # Projects with Intercepting Routes
│   │   │   ├── @modal/      # Parallel Route for Image Modal
│   │   │   └── [slug]/      # Single Project Details
│   │   ├── layout.tsx       # Root Layout (Fonts, Metadata)
│   │   └── page.tsx         # Home Page (Composition Pattern)
│   ├── actions/             # Server Actions (Form Submissions)
│   └── api/                 # API Routes (Minimal use)
├── components/
│   ├── footer/              # Bento Grid Footer
│   ├── home/                # Hero, Grid, Capabilities
│   ├── ui/                  # Reusable Atoms (Buttons, Modal)
│   └── Blogs.tsx            # Expandable Blog Cards
├── dictionaries/            # JSON-based translations (en.ts, fa.ts)
├── lib/
│   ├── supabase.ts          # Strictly Typed Supabase Client
│   └── utils.ts             # CN helper
└── middleware.ts            # i18n Routing Logic
```

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Alireza-Waterface/personal-site-v2.git
   cd personal-site-v2
   ```

2. **Install dependencies (using Bun):**

   ```bash
   bun install
   ```

3. **Environment Setup:**
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Development Server:**
   ```bash
   bun run dev
   ```
   _Note: Next.js 16 uses Turbopack by default._

---

## 📝 Database Schema (Supabase)

To replicate the backend, ensure your Supabase tables match these Types:

-  **projects**: `title`, `title_en`, `description`, `description_en`, `features (json)`, `tools (json)`, `cover_image`.
-  **blogs**: `slug`, `content` (Markdown), `content_en`, `tags (array)`, `reading_time`.
-  **requests**: `name`, `phone`, `title`, `description`, `viewed (bool)`.

---

## 🤝 Contributing & License

This project is open-source. Feel free to use the architecture for your own portfolio!

**Author:** [Alireza Waterface](https://github.com/Alireza-Waterface)
