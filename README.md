# The Streaming Shakeout

**An Interactive Data Story — Protogen P302**

> How content strategy is reshaping who wins — and who loses — in the streaming wars.

---

## About This Project

The Streaming Shakeout is an interactive, scrollable data story that explores why some streaming platforms are surging while others are collapsing — and what role content strategy plays in subscriber retention.

Built for a **Content Strategist or Audience Insights Manager**, this application presents a narrative-driven experience with interactive charts, filters, scroll animations, and key insight callouts. The story follows a clear arc: from the big picture of industry growth, through platform-level divergence, into the content and engagement data that explains *why*, and finally to a clear takeaway.

**This is not a dashboard.** It's a story told with data.

---

## The Narrative

The data story follows this arc:

1. **The Hook** — Streaming isn't growing anymore. It's reshuffling.
2. **The Divergence** — Five platforms, five very different trajectories over three years.
3. **Content Is King** — Platforms that invested in originals are winning. Those that didn't are losing.
4. **Engagement Proves It** — Original content has dramatically higher completion rates and viewing hours.
5. **The Churn Problem** — The #1 reason people cancel isn't price. It's content.
6. **The Takeaway** — If you're not investing in originals, you're renting an audience.

---

## The Platforms (Fictional)

| Platform | Role in the Story | Trend |
|---|---|---|
| **StreamMax** | The declining giant | Peaked mid-2023, cut originals, now losing subscribers |
| **VuePlus** | The rising star | Heavy investment in originals and live content, surging growth |
| **CineWave** | The steady veteran | Consistent content strategy, stable subscribers, low churn |
| **FlickHub** | The struggling newcomer | Launched strong but underinvested, now collapsing |
| **PrimeView** | The slow grower | Balanced strategy, steady improvement over time |

---

## Features

### Interactive Elements
- **Platform toggles** — Show or hide individual platforms on any chart
- **Year filters** — Filter content and engagement data by year (2022, 2023, 2024)
- **Metric toggles** — Switch between completion rate and hours per viewer
- **Chart tooltips** — Hover or focus on any data point for exact values
- **Scroll-triggered animations** — Sections and charts animate into view as you scroll
- **Smooth scroll navigation** — Sticky header with links to jump between sections

### Data Visualizations
- Multi-line subscriber growth chart (36 months, 5 platforms)
- Stacked bar chart showing content library composition
- Grouped bar chart comparing engagement metrics by content type
- Churn rate trend lines over time
- Churn reason distribution chart

### Accessibility (WCAG 2.1 AA)
- Skip navigation link
- Full keyboard navigation
- Screen reader support with ARIA labels and alt text for all charts
- Sufficient color contrast ratios
- Visible focus indicators
- Reduced motion support (respects `prefers-reduced-motion`)
- Semantic HTML throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Database

The application reads from a Supabase PostgreSQL database with 5 tables:

| Table | Rows | Description |
|---|---|---|
| `platforms` | 5 | Platform names, launch years, chart colors |
| `subscriber_data` | 180 | Monthly subscriber counts (Jan 2022 – Dec 2024) |
| `content_library` | 90 | Content catalog by type, platform, and year |
| `churn_data` | 60 | Quarterly churn rates and primary reasons |
| `engagement_metrics` | 90 | Completion rates and viewing hours by content type |

All data is **fictional** and was created for educational purposes.

---

## Project Structure

```
streaming-data-story/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/        → Header, Footer, SkipNav
│   │   ├── sections/      → 7 story sections (Hero through Takeaway)
│   │   ├── charts/        → 5 Recharts chart components
│   │   ├── ui/            → Reusable UI (toggles, filters, cards, animations)
│   │   └── providers/     → Framer Motion reduced motion provider
│   ├── hooks/             → 5 custom hooks for Supabase data fetching
│   ├── lib/               → Supabase client, shared constants
│   └── types/             → TypeScript interfaces for database tables
├── .env.local             → Supabase credentials (not committed to git)
├── BRIEF.md               → Full design and implementation brief
└── README.md              → This file
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- A [Supabase](https://supabase.com/) account with the database set up and seeded
- npm (comes with Node.js)

### Environment Variables

Create a `.env.local` file in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Data Disclaimer

All data presented in this application is **fictional and simulated**. The streaming platforms (StreamMax, VuePlus, CineWave, FlickHub, PrimeView) are entirely invented. No real company data was used. This project was created for educational purposes as part of the **Protogen P302 — Interactive Data Story** program.

---

## Accessibility Statement

This application was designed and built with accessibility as a core requirement, targeting **WCAG 2.1 Level AA** compliance. This includes:

- Semantic HTML structure
- Keyboard navigability for all interactive elements
- Screen reader compatibility with ARIA labels and roles
- Alt text descriptions for all data visualizations
- Color contrast ratios meeting AA thresholds
- Support for reduced motion preferences
- Skip navigation for efficient keyboard browsing
- Visible focus indicators on all interactive elements

If you encounter any accessibility issues, please open an issue in this repository.

---

## Credits

- **Program:** Protogen P302 — Interactive Data Story
- **Industry:** Media & Communications
- **Built with:** Next.js, TypeScript, Tailwind CSS, Recharts, Framer Motion, Supabase
- **Deployed on:** Vercel

---

## License

This project is for educational purposes only.