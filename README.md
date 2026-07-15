# SEO Dashboard — thevagroup.com

A Next.js dashboard that displays SEO performance data for thevagroup.com from Google Search Console, SEMrush, and Google Analytics 4. Data is stored in `data/seo_data.json` and read at build time — making GitHub the live database and Vercel the host.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Data File

All SEO data lives in `data/seo_data.json`. To refresh:
1. Update or replace `data/seo_data.json` with new data
2. Commit and push to GitHub
3. Vercel auto-deploys → dashboard updates

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `RommelTVAG/Dashboard-seo-thevagroup`
4. Click **Deploy** — no environment variables needed

Vercel detects the Next.js framework automatically via `vercel.json`.

## Data Sources

| Source | Metrics |
|--------|---------|
| Google Search Console | Clicks, Impressions, CTR, Avg Position, Top Queries |
| SEMrush | Organic Keywords, Traffic Estimate, Traffic Value, SERP Features, Keyword Rankings |
| Google Analytics 4 | Sessions, Active Users, Bounce Rate, Top Pages by Channel |

## Design

- Layout inspired by reference image 1 (KPI cards + charts + tables)
- Colors and sidebar inspired by reference image 2 (orange #f97316 + purple #7c3aed)
- Built with Tailwind CSS + Recharts

## File Structure

```
/
├── data/
│   └── seo_data.json       ← SEO database (update to refresh)
├── pages/
│   ├── _app.jsx
│   └── index.jsx           ← Main dashboard
├── components/
│   ├── KpiCard.jsx
│   ├── TrendChart.jsx
│   └── TopQueriesTable.jsx
├── styles/
│   └── globals.css
├── package.json
├── vercel.json
├── tailwind.config.js
└── postcss.config.js
```
