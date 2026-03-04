# GHAR Foundation - Project Documentation

## Overview
Official website for GHAR Foundation, a German-registered humanitarian 
organization providing aid to crisis-affected regions in Sudan and Yemen.

## Tech Stack
- Frontend: Next.js 16 (App Router)
- CMS: Sanity.io (Embedded Studio at /studio)
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- Payments: PayPal Giving Fund → Stripe (later)
- i18n: next-intl (EN default / AR / DE + Auto-detect)
- Hosting: Vercel (Auto Deploy from main branch)
- Repo: https://github.com/ibra8080/GHAR

## Sanity Config
- Project ID: eg9gx04a
- Dataset: ghar
- Studio URL: /studio

## Supabase Config
- Project URL: https://kpojqhpyllzaxcpgmhmo.supabase.co
- Organization: GHAR Foundation
- Region: Europe

## Vercel Config
- Live URL: https://ghar-seven.vercel.app
- Production Branch: main
- Auto Deploy: enabled

## Database Tables (Planned)
- donors (name, email, amount, date, invoice_number)
- volunteers (name, email, country, specialty, availability, message)
- subscribers (email, language, created_at)

## Pages
- / Home
- /about About
- /projects Projects (Sudan - Yemen)
- /donate Donation + PayPal + Auto Invoice
- /partners Corporate Partners
- /transparency Transparency Reports
- /volunteer Volunteer & Jobs
- /contact Contact

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
- Welcome Page

### Sprint 2 - IN PROGRESS
- Home Page
- About Page
- Projects Page

### Sprint 3 - PLANNED
- Donation Page + PayPal
- Auto Invoice (pdf-lib)
- Volunteer & Jobs Page
- Supabase Forms

### Sprint 4 - PLANNED
- Full i18n + RTL
- SEO Optimization
- GDPR Compliance

### Sprint 5 - PLANNED
- Testing
- Final Launch

## Key Decisions
- PayPal Giving Fund first (faster approval than Stripe)
- Stripe to be added after approval
- Launchgood as additional donation channel
- DZI certification target after 2 years of operation
- Figma only for Home Page before Sprint 2