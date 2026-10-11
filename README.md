# संरचना Design Studio (Sanrachana Design Studio)
> Premium Architecture, Bespoke Interior Architecture, 3D Elevation & Turnkey Space Planning Studio Website.

Official Instagram: [@sanrachana_design_studio_](https://www.instagram.com/sanrachana_design_studio_/)

---

## 🏛️ Project Overview

**Sanrachana Design Studio** (`संरचना`) is a modern, high-performance, responsive web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It is crafted with a bespoke architectural aesthetic inspired by natural limestone, warm travertine, graphite, and bronze accents.

### ✨ Key Features

1. **Brand Identity & Devanagari Typography**:
   - Distinctive brand mark (`सं` / `संरचना`) paired with *Cinzel* architectural serif headings and *Plus Jakarta Sans* UI typography.
   - Dark/stone luxury color palette with glassmorphism and subtle micro-interactions.

2. **Core Pages & Sections**:
   - **Home (`/`)**: High-impact architectural hero, stats counters, disciplines preview, featured project showcase, design philosophy ("Form, Function, Soul"), 4-step process timeline, Instagram photo grid, client testimonials, and consultation CTA.
   - **About (`/about`)**: Studio narrative exploring the Sanskrit origins of *संरचना*, four architectural pillars, and collaboration principles.
   - **Services (`/services`)**: In-depth showcase of 5 core disciplines (Architectural Design, Luxury Interior Architecture, 3D Elevation & Photorealistic Renders, Space Planning & Vastu, Turnkey Execution) with itemized tangibles and deliverables.
   - **Portfolio (`/portfolio`)**: Interactive filterable gallery (All, Residential, Interior, Commercial, 3D Visualization) with search and full-screen **Lightbox Modal** with keyboard controls (`Esc`, `ArrowLeft`, `ArrowRight`).
   - **Design Process (`/process`)**: 4-phase structured journey (Discovery $\rightarrow$ Concept & 3D $\rightarrow$ Working Drawings & BOQ $\rightarrow$ Execution & Handover) with timelines and FAQs.
   - **Cost Estimator (`/estimator`)**: Real-time project cost calculator computing indicative INR ballpark ranges based on property type, carpet area, service category, finish tier, and add-ons with **"Export Quote to WhatsApp"** and **"Transfer to Consultation Form"**.
   - **Contact (`/contact`)**: Secure consultation form, direct WhatsApp click-to-chat, click-to-call, mailto link, Instagram profile connection, and configurable Google Maps embed.
   - **Privacy Policy (`/privacy`)**: Transparent data handling and client confidentiality policy.
   - **Custom 404 (`/not-found`)**: Architectural "Blueprint Not Found" fallback.

3. **Communication Integrations**:
   - **WhatsApp Click-to-Chat**: Free click-to-chat with formatted message pre-population and graceful fallback when unset.
   - **Direct Calling & Emailing**: `tel:` and `mailto:` links that activate only when configured.
   - **Website Enquiry Form**: Server-side API (`/api/contact`) with in-memory sliding-window rate limiting, honeypot spam protection, input sanitization, and Resend transactional email integration (with automatic mock fallback in development).
   - **Instagram Social Destination**: Links directly to `@sanrachana_design_studio_`.

4. **SEO & Performance**:
   - Dynamic sitemap (`/sitemap.xml`) and robots (`/robots.txt`).
   - JSON-LD Structured Data (`ProfessionalService` schema).
   - OpenGraph and Twitter card metadata for high-converting social shares.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.17+` or `v20+` / `v22+`
- npm `v9+` or `v10+`

### Installation & Setup

1. **Navigate to the project directory**:
   ```bash
   cd C:\Users\sanyo\.gemini\antigravity-ide\scratch\sanrachana-design-studio
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and set your studio details:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run the automated test suite**:
   ```bash
   npm test
   ```

6. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## ⚙️ Environment Variables Configuration

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Base canonical website URL | `https://sanrachanadesign.com` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Official studio Instagram profile | `https://www.instagram.com/sanrachana_design_studio_/` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International phone without `+` or spaces | `919876543210` |
| `NEXT_PUBLIC_PHONE_NUMBER` | Formatted phone number for `tel:` links | `+91 98765 43210` |
| `NEXT_PUBLIC_EMAIL` | Inquiry email address | `contact@sanrachanadesign.com` |
| `NEXT_PUBLIC_STUDIO_ADDRESS` | Physical office address | `Studio 402, High Street, Mumbai, Maharashtra` |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | Optional Google Maps iframe embed URL | `https://www.google.com/maps/embed?pb=...` |
| `NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL` | Optional Google Maps direct directions URL | `https://maps.google.com/?q=...` |
| `RESEND_API_KEY` | Resend API key for transactional emails | `re_123456789...` |
| `CONTACT_EMAIL_RECIPIENT` | Inbox where website inquiries will be sent | `inquiries@sanrachanadesign.com` |
| `EMAIL_FROM` | Verified sender address | `onboarding@resend.dev` |

> **Note on Missing Contact Details**: All contact elements (WhatsApp, Phone, Email, Address, Maps) include safe fallbacks and will gracefully hide or link to the inquiry form when unset, preventing broken links or fake data.

---

## 🧪 Testing Suite

The project includes an automated test suite with **Vitest**:
- `src/tests/site-config.test.ts`: Contact helpers and safe fallbacks.
- `src/tests/whatsapp.test.ts`: Number normalization, availability, and message builder.
- `src/tests/estimator.test.ts`: Cost estimation logic, finish tiers, and add-on pricing.
- `src/tests/rate-limit.test.ts`: In-memory rate limiting and brute-force protection.
- `src/tests/contact-api.test.ts`: Input validation, honeypot spam traps, and mock dispatch.

Run tests:
```bash
npm test
```

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub/GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Under **Environment Variables**, add the variables from `.env.example`.
4. Deploy! Vercel will automatically build the Next.js App Router application with edge optimization and global CDN caching.

### Deploying to a Custom Server / Node.js
```bash
npm run build
NODE_ENV=production npx next start -p 3000
```
