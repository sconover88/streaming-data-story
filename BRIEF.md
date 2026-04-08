# BRIEF.md — Streaming Data Story

## AI Instructions

You are building an interactive data story web application from scratch. This document is your single source of truth. Read the ENTIRE document before writing any code. Then implement each section in the order listed in the Step-by-Step Implementation Plan. Do NOT skip any steps. Do NOT ask for confirmation — execute everything autonomously. After completing each step, move to the next one immediately.

---

## Project Overview

### What Is This?

An interactive data story that explores why streaming platforms are gaining or losing subscribers — and what role content strategy plays in retention. The application presents a narrative-driven, scrollable experience with interactive charts, filters, and animations. It is designed for a **Content Strategist or Audience Insights Manager** who wants to understand the relationship between content investment and subscriber behavior.

### The Story (Narrative Arc)

The data story follows this arc:

1. **The Hook:** "Streaming isn't growing anymore — it's reshuffling." Show that total industry subscribers are still growing, but individual platforms are diverging wildly.
2. **The Divergence:** Compare 5 fictional streaming platforms over 3 years (2022–2024). Some are surging, some are collapsing, and some are treading water.
3. **The Why — Content Strategy:** Platforms that invested heavily in original content are retaining subscribers. Platforms that relied on licensed content are bleeding subscribers.
4. **The Proof — Engagement:** Original content has dramatically higher completion rates and hours-per-viewer than licensed content.
5. **The Churn Story:** Churn rates correlate with content investment. The #1 reason people leave is "Content" — not price.
6. **The Takeaway:** "If you're not investing in originals, you're renting an audience." A clear, opinionated conclusion.

### The Audience

A Content Strategist or Audience Insights Manager at a streaming company or media organization. They are data-literate but time-poor. They want insights, not raw data. They want to understand what's happening, why, and what to do about it.

### Industry

Media & Communications

---

## Key Features

### Must-Have (MVP)

1. **Scrollable narrative layout** — The app is a single scrollable page divided into clearly defined story sections. Each section has a headline, narrative text, and one or more interactive charts.
2. **Subscriber growth line chart** — Multi-line chart showing all 5 platforms over 36 months. Users can toggle platforms on/off.
3. **Content library stacked bar chart** — Shows content mix (original vs. licensed by type) per platform per year. Users can filter by year.
4. **Churn rate line chart** — Shows quarterly churn rates per platform. Users can filter by churn reason.
5. **Engagement comparison bar chart** — Compares average completion rate and hours-per-viewer by content type. Users can filter by platform and year.
6. **Platform filter/toggle** — A global or per-chart control to show/hide specific platforms.
7. **Year filter** — Where applicable, filter data by year (2022, 2023, 2024).
8. **Scroll-triggered animations** — Sections and charts animate into view as the user scrolls (fade in, slide up).
9. **Responsive design** — Works on desktop, tablet, and mobile.
10. **Accessibility (WCAG 2.1 AA)** — Keyboard navigation, screen reader support, sufficient color contrast, alt text for charts, focus indicators, skip navigation link, ARIA labels.

### Nice-to-Have (If Time Permits)

11. **Key insight callout cards** — Highlighted stat cards (e.g., "VuePlus grew 303% in 3 years") that appear between narrative sections.
12. **Animated counters** — Numbers that count up when they scroll into view.
13. **Dark/light mode toggle** — Accessible theme switcher.
14. **Chart tooltips** — Hover/focus tooltips on all chart data points showing exact values.
15. **Summary/conclusion section** — A final section with key takeaways and a call-to-action.
16. **Smooth scroll navigation** — A sticky side nav or top nav that lets users jump to sections.
17. **Data source attribution** — A footer noting this is fictional/simulated data for educational purposes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Animation | Framer Motion |
| Database | Supabase (PostgreSQL) |
| ORM/Client | @supabase/supabase-js |
| Deployment | Vercel (handled separately) |
| Accessibility | WCAG 2.1 AA compliance |

---

## Database Schema

The Supabase database is already set up with the following 5 tables. All tables have Row Level Security enabled with public read access. The data is already seeded. Do NOT create or modify the database — only READ from it.

### Table: platforms
| Column | Type | Description |
|---|---|---|
| id | SERIAL PRIMARY KEY | Unique ID |
| name | TEXT | Platform name (StreamMax, VuePlus, CineWave, FlickHub, PrimeView) |
| launch_year | INTEGER | Year the platform launched |
| color | TEXT | Hex color for charts |

### Table: subscriber_data
| Column | Type | Description |
|---|---|---|
| id | SERIAL PRIMARY KEY | Unique ID |
| platform_id | INTEGER (FK → platforms.id) | Which platform |
| month | DATE | First of the month (2022-01 through 2024-12) |
| subscribers_millions | NUMERIC(6,2) | Total subscribers in millions |
| net_change_millions | NUMERIC(5,2) | Month-over-month change in millions |

### Table: content_library
| Column | Type | Description |
|---|---|---|
| id | SERIAL PRIMARY KEY | Unique ID |
| platform_id | INTEGER (FK → platforms.id) | Which platform |
| year | INTEGER | 2022, 2023, or 2024 |
| content_type | TEXT | One of: 'Original Series', 'Licensed Series', 'Original Film', 'Licensed Film', 'Documentary', 'Live/Sports' |
| title_count | INTEGER | Number of titles |

### Table: churn_data
| Column | Type | Description |
|---|---|---|
| id | SERIAL PRIMARY KEY | Unique ID |
| platform_id | INTEGER (FK → platforms.id) | Which platform |
| month | DATE | Quarterly (first of quarter month) |
| churn_rate_percent | NUMERIC(4,2) | Churn rate as percentage |
| primary_reason | TEXT | One of: 'Price', 'Content', 'Competition', 'Seasonal', 'Other' |

### Table: engagement_metrics
| Column | Type | Description |
|---|---|---|
| id | SERIAL PRIMARY KEY | Unique ID |
| platform_id | INTEGER (FK → platforms.id) | Which platform |
| year | INTEGER | 2022, 2023, or 2024 |
| content_type | TEXT | Same content types as content_library |
| avg_completion_rate | NUMERIC(5,2) | Average completion rate (percentage) |
| avg_hours_per_viewer | NUMERIC(5,2) | Average hours watched per viewer |

### Platform Data Summary (for reference)
| ID | Name | Color | Story Role |
|---|---|---|---|
| 1 | StreamMax | #E50914 | The declining giant — peaked mid-2023, cut originals, now losing subscribers |
| 2 | VuePlus | #1DA1F2 | The rising star — heavy investment in originals and live/sports, surging growth |
| 3 | CineWave | #6B3FA0 | The steady veteran — consistent content, stable subscribers, low churn |
| 4 | FlickHub | #2ECC71 | The struggling newcomer — launched strong but underinvested in content, now collapsing |
| 5 | PrimeView | #FF9900 | The slow grower — balanced strategy, steady improvement |

---

## Supabase Connection

The Supabase client should be configured as a reusable utility. Environment variables are already set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=<already set>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<already set>
```

Create a Supabase client utility file at `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## MVP Scope

The MVP is a single-page scrollable data story with 7 main sections:

| Section | Content | Chart(s) |
|---|---|---|
| 1. Hero | Title, subtitle, scroll prompt | None (animated text) |
| 2. The Big Picture | Industry overview narrative | Multi-line subscriber chart (all platforms) |
| 3. The Divergence | Platform comparison narrative | Subscriber chart with platform toggles |
| 4. Content is King | Content strategy narrative | Stacked bar chart (content library by platform/year) |
| 5. Engagement Tells the Story | Engagement narrative | Grouped bar chart (completion rate & hours by content type) |
| 6. The Churn Problem | Churn narrative | Line chart (churn rates) + bar chart (churn reasons) |
| 7. The Takeaway | Conclusion and key insights | Key stat callout cards, summary |

---

## Project Structure

```
streaming-data-story/
├── public/
│   └── (static assets if needed)
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css          ← Global styles, Tailwind imports, CSS custom properties
│   │   ├── layout.tsx           ← Root layout with metadata, fonts, skip-nav link
│   │   └── page.tsx             ← Main page that composes all sections
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       ← Sticky navigation header with section links
│   │   │   ├── Footer.tsx       ← Footer with data attribution and credits
│   │   │   └── SkipNav.tsx      ← Skip to main content link (accessibility)
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx          ← Section 1: Hero with title and scroll prompt
│   │   │   ├── BigPictureSection.tsx    ← Section 2: Industry overview
│   │   │   ├── DivergenceSection.tsx    ← Section 3: Platform comparison
│   │   │   ├── ContentSection.tsx       ← Section 4: Content strategy
│   │   │   ├── EngagementSection.tsx    ← Section 5: Engagement metrics
│   │   │   ├── ChurnSection.tsx         ← Section 6: Churn analysis
│   │   │   └── TakeawaySection.tsx      ← Section 7: Conclusion
│   │   ├── charts/
│   │   │   ├── SubscriberLineChart.tsx      ← Multi-line chart for subscriber data
│   │   │   ├── ContentStackedBarChart.tsx   ← Stacked bar chart for content library
│   │   │   ├── EngagementBarChart.tsx       ← Grouped bar chart for engagement
│   │   │   ├── ChurnLineChart.tsx           ← Line chart for churn rates
│   │   │   └── ChurnReasonBarChart.tsx      ← Bar chart for churn reasons
│   │   ├── ui/
│   │   │   ├── PlatformToggle.tsx       ← Toggle buttons to show/hide platforms
│   │   │   ├── YearFilter.tsx           ← Year selector (2022, 2023, 2024)
│   │   │   ├── InsightCard.tsx          ← Highlighted stat/insight callout card
│   │   │   ├── AnimatedCounter.tsx      ← Number that counts up on scroll
│   │   │   ├── ScrollReveal.tsx         ← Wrapper component for scroll-triggered animations
│   │   │   └── ChartWrapper.tsx         ← Accessible wrapper for all charts (ARIA, alt text)
│   │   └── providers/
│   │       └── MotionProvider.tsx       ← Framer Motion provider for reduced motion support
│   ├── hooks/
│   │   ├── useSubscriberData.ts         ← Fetch subscriber_data from Supabase
│   │   ├── useContentLibrary.ts         ← Fetch content_library from Supabase
│   │   ├── useChurnData.ts              ← Fetch churn_data from Supabase
│   │   ├── useEngagementMetrics.ts      ← Fetch engagement_metrics from Supabase
│   │   └── usePlatforms.ts             ← Fetch platforms from Supabase
│   ├── lib/
│   │   ├── supabase.ts                  ← Supabase client (already described above)
│   │   └── constants.ts                 ← Shared constants (colors, labels, section IDs)
│   └── types/
│       └── database.ts                  ← TypeScript types for all database tables
├── .env.local                           ← Supabase credentials (already created)
├── BRIEF.md                             ← This file
├── README.md                            ← Project readme
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Step-by-Step Implementation Plan

Execute these steps in order. Complete each step fully before moving to the next.

### Step 1: Foundation — Types, Constants, and Supabase Client

**Files to create/modify:**

1. **`src/types/database.ts`** — Create TypeScript interfaces for all 5 database tables:
   - `Platform` (id, name, launch_year, color)
   - `SubscriberData` (id, platform_id, month, subscribers_millions, net_change_millions)
   - `ContentLibrary` (id, platform_id, year, content_type, title_count)
   - `ChurnData` (id, platform_id, month, churn_rate_percent, primary_reason)
   - `EngagementMetric` (id, platform_id, year, content_type, avg_completion_rate, avg_hours_per_viewer)

2. **`src/lib/supabase.ts`** — Create the Supabase client as described in the Supabase Connection section above.

3. **`src/lib/constants.ts`** — Create shared constants:
   - `SECTION_IDS` object with IDs for each section (hero, big-picture, divergence, content, engagement, churn, takeaway)
   - `CONTENT_TYPES` array: ['Original Series', 'Licensed Series', 'Original Film', 'Licensed Film', 'Documentary', 'Live/Sports']
   - `CHURN_REASONS` array: ['Price', 'Content', 'Competition', 'Seasonal', 'Other']
   - `YEARS` array: [2022, 2023, 2024]

### Step 2: Data Hooks — Fetch Data from Supabase

**Files to create:**

1. **`src/hooks/usePlatforms.ts`** — Custom hook that fetches all rows from `platforms` table. Returns `{ platforms, loading, error }`.

2. **`src/hooks/useSubscriberData.ts`** — Custom hook that fetches all rows from `subscriber_data` table, joined with `platforms` (to get platform name and color). Returns `{ subscriberData, loading, error }`.

3. **`src/hooks/useContentLibrary.ts`** — Custom hook that fetches all rows from `content_library` table, joined with `platforms`. Returns `{ contentLibrary, loading, error }`.

4. **`src/hooks/useChurnData.ts`** — Custom hook that fetches all rows from `churn_data` table, joined with `platforms`. Returns `{ churnData, loading, error }`.

5. **`src/hooks/useEngagementMetrics.ts`** — Custom hook that fetches all rows from `engagement_metrics` table, joined with `platforms`. Returns `{ engagementMetrics, loading, error }`.

**Important for all hooks:**
- Use `useEffect` and `useState` for data fetching
- Handle loading and error states
- Sort data appropriately (by month for time series, by platform_id for comparisons)
- Use the Supabase client from `src/lib/supabase.ts`
- Use the TypeScript types from `src/types/database.ts`

### Step 3: UI Components — Reusable Building Blocks

**Files to create:**

1. **`src/components/providers/MotionProvider.tsx`** — A provider component that:
   - Detects user's `prefers-reduced-motion` setting
   - Provides a context that all animation components can check
   - If reduced motion is preferred, disable all animations

2. **`src/components/ui/ScrollReveal.tsx`** — A wrapper component that:
   - Uses Framer Motion's `useInView` hook
   - Fades in and slides up children when they enter the viewport
   - Respects reduced motion preferences
   - Accepts customizable animation delay and direction props

3. **`src/components/ui/ChartWrapper.tsx`** — An accessible wrapper for all charts that:
   - Wraps charts in a `figure` element with `role="img"`
   - Accepts an `altText` prop for screen readers (rendered as `aria-label`)
   - Includes a visually hidden description for screen readers
   - Provides a `figcaption` for visible chart titles
   - Handles loading state with a skeleton/placeholder
   - Handles error state with an error message

4. **`src/components/ui/PlatformToggle.tsx`** — A toggle control that:
   - Displays a button for each platform (using platform colors)
   - Allows toggling platforms on/off
   - Uses `aria-pressed` for accessibility
   - Accepts `platforms` array and `activePlatforms` state
   - Keyboard accessible (Enter/Space to toggle)

5. **`src/components/ui/YearFilter.tsx`** — A year filter that:
   - Displays buttons for 2022, 2023, 2024
   - Allows selecting one year at a time
   - Uses `aria-pressed` for accessibility
   - Keyboard accessible

6. **`src/components/ui/InsightCard.tsx`** — A callout card that:
   - Displays a large stat number, a label, and optional description
   - Has a colored accent border
   - Animates in on scroll (using ScrollReveal)

7. **`src/components/ui/AnimatedCounter.tsx`** — A number counter that:
   - Counts up from 0 to a target number when scrolled into view
   - Uses Framer Motion's `useInView` and `animate`
   - Respects reduced motion (shows final number immediately)
   - Accepts `value`, `suffix` (e.g., "%", "M"), and `duration` props

### Step 4: Layout Components

**Files to create:**

1. **`src/components/layout/SkipNav.tsx`** — A skip navigation link that:
   - Is the first focusable element on the page
   - Is visually hidden until focused (then appears at top of page)
   - Links to `#main-content`
   - Styled clearly when visible

2. **`src/components/layout/Header.tsx`** — A sticky header that:
   - Contains the site title/logo ("The Streaming Shakeout")
   - Contains navigation links to each section (using SECTION_IDS)
   - Uses smooth scrolling for navigation
   - Is sticky at the top of the page
   - Has a semi-transparent background with backdrop blur
   - Highlights the current section in the nav (using Intersection Observer)
   - Is fully keyboard navigable
   - Collapses to a hamburger menu on mobile
   - Has proper ARIA labels (`nav`, `aria-label="Main navigation"`)

3. **`src/components/layout/Footer.tsx`** — A footer that:
   - States that all data is fictional/simulated for educational purposes
   - Credits the project as a Protogen P302 assignment
   - Includes the current year
   - Has proper semantic HTML (`footer` element)

### Step 5: Chart Components

**Files to create:**

All charts must:
- Use Recharts library
- Be wrapped in `ChartWrapper` for accessibility
- Be responsive (use `ResponsiveContainer` from Recharts)
- Use platform colors from the database
- Have tooltips on hover/focus
- Have proper axis labels
- Use readable font sizes
- Support keyboard navigation where possible

1. **`src/components/charts/SubscriberLineChart.tsx`** — A multi-line chart that:
   - Shows subscriber count (Y axis) over time (X axis, monthly)
   - One line per platform, colored by platform color
   - Accepts `activePlatforms` prop to show/hide lines
   - Has a legend
   - Has tooltips showing exact values on hover
   - X axis shows abbreviated months (Jan '22, Apr '22, etc.) — not every month, spaced reasonably
   - Y axis shows subscribers in millions with "M" suffix
   - Has grid lines for readability
   - Animated line drawing on first render

2. **`src/components/charts/ContentStackedBarChart.tsx`** — A stacked bar chart that:
   - Shows content title count (Y axis) by platform (X axis)
   - Stacked by content type (Original Series, Licensed Series, Original Film, Licensed Film, Documentary, Live/Sports)
   - Accepts `selectedYear` prop to filter by year
   - Uses a consistent color scheme for content types (define in constants)
   - Has a legend explaining the content type colors
   - Has tooltips showing exact values

3. **`src/components/charts/EngagementBarChart.tsx`** — A grouped bar chart that:
   - Shows average completion rate OR average hours per viewer (toggle between them)
   - Grouped by content type (X axis)
   - Bars colored by platform
   - Accepts `selectedYear` and `activePlatforms` props
   - Has a toggle to switch between completion rate and hours per viewer
   - Has tooltips showing exact values

4. **`src/components/charts/ChurnLineChart.tsx`** — A line chart that:
   - Shows churn rate (Y axis) over time (X axis, quarterly)
   - One line per platform
   - Accepts `activePlatforms` prop
   - Has tooltips
   - Y axis shows percentage with "%" suffix

5. **`src/components/charts/ChurnReasonBarChart.tsx`** — A bar chart that:
   - Shows the distribution of churn reasons across all platforms
   - Can be filtered by platform
   - Uses distinct colors for each reason
   - Has tooltips showing exact values

### Step 6: Story Sections

**Files to create:**

Each section must:
- Have a unique `id` attribute (from SECTION_IDS) for navigation
- Use `ScrollReveal` for entrance animations
- Include narrative text that tells the story
- Include relevant chart(s) with interactive controls
- Be semantically structured with proper heading hierarchy (h2 for section titles, h3 for subsections)
- Have adequate spacing and visual separation from other sections

1. **`src/components/sections/HeroSection.tsx`**
   - Full viewport height
   - Large title: "The Streaming Shakeout"
   - Subtitle: "How content strategy is reshaping who wins — and who loses — in the streaming wars"
   - Animated scroll-down indicator (a bouncing chevron or arrow)
   - Subtle background gradient or pattern
   - Text animates in on page load

2. **`src/components/sections/BigPictureSection.tsx`**
   - Headline: "The Industry Is Growing. The Players Are Not."
   - Narrative paragraph explaining that total streaming subscribers are up, but the growth is unevenly distributed. Some platforms are surging while others are shrinking.
   - **Chart:** SubscriberLineChart showing ALL platforms (no toggles yet — just the full picture)
   - **Insight cards:** Total industry subscribers in Dec 2024 vs Jan 2022, showing overall growth
   - Narrative text pointing out the divergence visible in the chart

3. **`src/components/sections/DivergenceSection.tsx`**
   - Headline: "Five Platforms, Five Very Different Stories"
   - Narrative introducing each platform briefly (1-2 sentences each based on the Platform Data Summary)
   - **Chart:** SubscriberLineChart WITH PlatformToggle controls so users can isolate individual platforms
   - **Insight cards:**
     - VuePlus: grew from 45M to 181.5M (+303%)
     - StreamMax: peaked at 236.5M, now down to 220.8M
     - FlickHub: peaked at 40.2M, now down to 22M (-45%)
   - Narrative asking: "What's driving this? Let's look at what they're putting on screen."

4. **`src/components/sections/ContentSection.tsx`**
   - Headline: "Content Is King — But Not All Content Is Equal"
   - Narrative explaining the difference between original and licensed content, and why it matters for retention
   - **Chart:** ContentStackedBarChart with YearFilter
   - **Insight cards:**
     - VuePlus original titles: 100 (2022) → 275 (2024) (+175%)
     - StreamMax original titles: 200 (2022) → 115 (2024) (-42.5%)
   - Narrative connecting content investment to the subscriber trends seen in the previous section

5. **`src/components/sections/EngagementSection.tsx`**
   - Headline: "Originals Don't Just Attract — They Retain"
   - Narrative explaining that original content has dramatically higher completion rates and viewing hours
   - **Chart:** EngagementBarChart with YearFilter and PlatformToggle
   - **Insight cards:**
     - VuePlus Original Series completion rate: 82% (2024) vs Licensed Series: 44%
     - FlickHub Original Series completion rate dropped from 55% (2022) to 40% (2024)
   - Narrative: "People finish originals. They browse licensed content. That's the difference between a subscriber and a churned user."

6. **`src/components/sections/ChurnSection.tsx`**
   - Headline: "The Churn Problem: Why People Leave"
   - Narrative explaining churn and why it matters more than acquisition
   - **Charts:** ChurnLineChart with PlatformToggle AND ChurnReasonBarChart
   - **Insight cards:**
     - FlickHub churn: 4.0% (Q1 2022) → 10.2% (Q4 2024)
     - VuePlus churn: 5.5% (Q1 2022) → 1.9% (Q4 2024)
     - #1 churn reason across struggling platforms: "Content"
   - Narrative connecting churn to content strategy

7. **`src/components/sections/TakeawaySection.tsx`**
   - Headline: "The Takeaway: Invest in Originals, or Rent Your Audience"
   - Summary narrative (3-4 paragraphs) pulling together all the threads:
     - The streaming market is maturing — growth is no longer guaranteed
     - Content strategy is the primary differentiator
     - Original content drives engagement, engagement drives retention, retention drives growth
     - Platforms that cut originals to save money are accelerating their decline
   - **Key stat cards** summarizing the most important numbers
   - A final statement: "The data is clear: in the streaming wars, content isn't just king — it's the entire kingdom."
   - Data attribution note: "All data in this story is fictional and was created for educational purposes as part of the Protogen P302 program."

### Step 7: Global Styles and Tailwind Configuration

**Files to modify:**

1. **`tailwind.config.ts`** — Extend the Tailwind config:
   - Add custom colors for each platform (using their hex colors from the database)
   - Add custom colors for content types
   - Add custom animation keyframes for the scroll indicator bounce
   - Ensure the `content` paths include all component directories

2. **`src/app/globals.css`** — Set up global styles:
   - Import Tailwind base, components, utilities
   - Define CSS custom properties for platform colors (as fallbacks)
   - Set up smooth scrolling on `html` element (`scroll-behavior: smooth`)
   - Add a `prefers-reduced-motion` media query that disables smooth scrolling
   - Style the skip-nav link
   - Set base typography (body font size, line height, color)
   - Add focus-visible styles for keyboard navigation (visible focus rings)
   - Set up a dark background with light text as the default theme (this is a data story — dark themes work well for data visualization)

### Step 8: Root Layout and Main Page

**Files to modify:**

1. **`src/app/layout.tsx`** — Modify the root layout:
   - Add metadata: title "The Streaming Shakeout — An Interactive Data Story", description about the project
   - Import and use a clean sans-serif font (Inter from Google Fonts via `next/font`)
   - Wrap children in `MotionProvider`
   - Include `SkipNav` component as the first element in body
   - Set `lang="en"` on the html element

2. **`src/app/page.tsx`** — Build the main page:
   - This is the single-page scrollable experience
   - Add `id="main-content"` to the main element (for skip nav)
   - Import and render all 7 sections in order
   - Import and render `Header` and `Footer`
   - Each section should be wrapped in a `section` element with appropriate `id` and `aria-label`

### Step 9: Accessibility Audit

After all components are built, do a final accessibility pass:

1. **Verify all images and charts have alt text** — Every `ChartWrapper` must have a descriptive `altText` prop
2. **Verify heading hierarchy** — h1 only in Hero, h2 for each section, h3 for subsections. No skipped levels.
3. **Verify all interactive elements are keyboard accessible** — Tab through the entire page. Every button, toggle, and link must be reachable and operable with keyboard.
4. **Verify focus indicators** — Every focusable element must have a visible focus ring when focused via keyboard.
5. **Verify color contrast** — All text must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text). Charts should not rely solely on color — use patterns, labels, or tooltips as supplements.
6. **Verify skip navigation works** — Tab on page load should focus the skip nav link. Activating it should jump to main content.
7. **Verify reduced motion** — If `prefers-reduced-motion: reduce` is set in OS settings, all animations should be disabled or minimized.
8. **Verify screen reader experience** — Charts should announce their alt text. Sections should be navigable by heading. Interactive controls should announce their state.
9. **Add `aria-live="polite"` regions** where data changes dynamically (e.g., when filters change, announce the update to screen readers).

### Step 10: Final Polish

1. **Test responsive design** at these breakpoints:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1280px
   - Large desktop: 1536px

2. **Ensure all charts resize properly** using Recharts `ResponsiveContainer`

3. **Add loading states** — While data is being fetched from Supabase, show skeleton placeholders (not spinners)

4. **Add error states** — If Supabase fetch fails, show a friendly error message with a retry option

5. **Test the narrative flow** — Read through the entire page top to bottom. Does the story make sense? Does each section flow into the next?

6. **Performance check:**
   - Charts should use `React.memo` or `useMemo` where appropriate to prevent unnecessary re-renders
   - Images (if any) should use `next/image` for optimization
   - Fonts should be loaded via `next/font` (not external CDN)

---

## Best Practices for VS Code Implementation

1. **One file at a time** — Create and complete each file before moving to the next
2. **Follow the project structure exactly** — Create folders and files as specified
3. **Use TypeScript strictly** — No `any` types. Define proper interfaces for all data.
4. **Use Tailwind for all styling** — No inline styles, no separate CSS files (except globals.css)
5. **Use semantic HTML** — `header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `footer`
6. **Component composition** — Keep components focused. If a component is doing too much, split it.
7. **Error boundaries** — Wrap chart components in error boundaries so one broken chart doesn't crash the page
8. **Console cleanup** — No `console.log` statements in final code (use them for debugging, then remove)

---

## Summary Table

| Item | Details |
|---|---|
| **Project Name** | The Streaming Shakeout |
| **Type** | Interactive Data Story (Single Page, Scrollable) |
| **Industry** | Media & Communications |
| **Audience** | Content Strategist / Audience Insights Manager |
| **Narrative** | Why content strategy determines streaming platform success |
| **Framework** | Next.js 15 (App Router, TypeScript) |
| **Styling** | Tailwind CSS (dark theme) |
| **Charts** | Recharts (5 chart components) |
| **Animation** | Framer Motion (scroll-triggered) |
| **Database** | Supabase (5 tables, pre-seeded, read-only) |
| **Accessibility** | WCAG 2.1 AA (keyboard, screen reader, color contrast, reduced motion) |
| **Sections** | 7 (Hero, Big Picture, Divergence, Content, Engagement, Churn, Takeaway) |
| **Interactive Controls** | Platform toggles, year filters, metric toggles, chart tooltips |
| **Responsive** | Mobile, Tablet, Desktop, Large Desktop |

---

## End of BRIEF.md