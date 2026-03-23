# GHAR Foundation - Project Documentation

> Last Updated: March 2026

## Overview
Official website for GHAR Foundation, a German-registered humanitarian 
organization providing aid to crisis-affected regions in Sudan and Yemen.

## 🔗 Development Conversations (Claude AI)
- Sprint 1 - Setup & Foundation
- Sprint 2 - Core Pages (Navbar, Footer, Home, About, Projects)
- Sprint 3 - Features (News, Donate, Volunteer, Transparency, lib/data.ts)

## Tech Stack
- **Frontend:** Next.js 16 (App Router)
- **CMS:** Sanity.io (Embedded Studio at /studio) — not yet connected to pages
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend (confirmation emails)
- **Payments:** PayPal (pending Business account) → Stripe (later)
- **i18n:** next-intl (EN default / AR / DE + Auto-detect)
- **Hosting:** Vercel (Auto Deploy from main branch)
- **Repo:** https://github.com/ibra8080/GHAR

## 🎨 Brand Colors
- Primary: #1A6FA0
- Secondary: #2D8F16
- Accent: #EF8800
- Dark: #2A2A2A
- Background: #FCFCFA

## Sanity Config
- Project ID: eg9gx04a
- Dataset: ghar
- Studio URL: /studio

## Supabase Config
- Project URL: https://kpojqhpyllzaxcpgmhmo.supabase.co
- Region: Europe (Frankfurt)

## Vercel Config
- Live URL: https://ghar-seven.vercel.app
- Production Branch: main
- Auto Deploy: enabled

## Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=eg9gx04a
NEXT_PUBLIC_SANITY_DATASET=ghar
NEXT_PUBLIC_SUPABASE_URL=https://kpojqhpyllzaxcpgmhmo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_fNx7V_VTzPS-5crWWnvzig_Wu6qNXbA
RESEND_API_KEY=re_QPS2X7pC_P496DX3ekVmhfcTxxVfioj3x
```

## Database Tables
- **contact_messages** → id, name, email, message, created_at
- **donors** → id, name, email, amount, donation_type, project, paypal_tx_id, status, created_at
- **volunteers** → id, name, phone, email, country, specialty, availability, message, created_at

## 📄 Pages
| Page | Route | Status |
|------|-------|--------|
| Home | / | ✅ Live |
| About | /about | ✅ Live |
| Projects | /projects | ✅ Live |
| Project Detail | /projects/[id] | ✅ Live |
| News | /news | ✅ Live |
| Donate | /donate | ✅ Live |
| Volunteer | /volunteer | ✅ Live |
| Transparency | /transparency | ✅ Live |

## 📁 Key Files
```
lib/data.ts                                    → Central data store (temporary, will be replaced by Sanity)
app/globals.css                                → Brand colors (@theme inline syntax)
components/layout/Navbar.tsx                   → Main navigation
components/layout/Footer.tsx                   → Main footer
app/api/send-volunteer-confirmation/route.ts   → Resend email API
```

## GitHub Workflow
- main → Production
- develop → Integration
- feature/xxx → Per feature

## Agile Progress

### Sprint 1 ✅ DONE
- Next.js + Tailwind setup
- GitHub + Kanban Board
- Vercel Auto Deploy
- Sanity CMS + Embedded Studio
- Supabase integration
- next-intl (EN/AR/DE)

### Sprint 2 ✅ DONE
- Navbar + Footer
- Home Page (Hero slider, Projects, Stats, News)
- About Page (Story, Mission, Values, Team, Contact Form)
- Projects Page + Project Detail Page

### Sprint 3 ✅ DONE
- lib/data.ts (Central data store)
- News Page (Pagination + Year filter)
- Donate Page (PayPal + Supabase)
- Volunteer Page (Form + Supabase + Resend email)
- Transparency Page

### Sprint 4 ⏳ NEXT
- [ ] i18n — Arabic (RTL) + German + English
- [ ] SEO — Metadata for all pages
- [ ] GDPR — Cookie consent + Privacy Policy
- [ ] PayPal Business — Connect organization account
- [ ] Resend Domain — Connect ghar.de

### Sprint 5 ⏳ PLANNED
- Testing & Final Launch

## Key Decisions
- PayPal Giving Fund first (faster approval than Stripe)
- Stripe to be added after approval
- Launchgood as additional donation channel
- DZI certification target after 2 years of operation
- lib/data.ts is temporary — will be replaced by Sanity CMS in Sprint 5
- Resend free plan: sends only to registered email until ghar.de domain is connected

## ⚠️ Important Technical Notes
- `globals.css` uses `@theme inline` syntax — do NOT use standard Tailwind config
- Straight quotes `"` cause TypeScript errors in JSX — use `&ldquo;` / `&rdquo;`
- Git conflicts resolved via `git checkout --theirs` for globals.css and layout.tsx