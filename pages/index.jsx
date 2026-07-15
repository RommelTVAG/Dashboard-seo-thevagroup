import path from 'path';
import fs from 'fs';
import KpiCard from '../components/KpiCard';
import TrendChart from '../components/TrendChart';
import TopQueriesTable from '../components/TopQueriesTable';

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'data', 'seo_data.json');
  const seoData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return { props: { seoData } };
}

export default function Dashboard({ seoData }) {
  const gsc = seoData.search_console;
  const semrush = seoData.semrush;
  const ga4 = seoData.google_analytics;
  const meta = seoData.meta;

  const totalSessions = ga4.summary.total_sessions;
  const avgBounce = ga4.top_pages_by_sessions.reduce((sum, r) => sum + r.bounce_rate, 0) / ga4.top_pages_by_sessions.length;

  const navItems = [
    { icon: '📊', label: 'Overview', active: true },
    { icon: '🔍', label: 'Queries' },
    { icon: '📄', label: 'Pages' },
    { icon: '📈', label: 'Trends' },
    { icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-orange-500 flex flex-col items-center py-6 gap-6 shadow-lg">
        <div className="text-white font-bold text-xs text-center mb-4">
          <span className="block text-lg">📡</span>
          <span className="block text-[10px] mt-1">SEO</span>
        </div>
        {navItems.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className={`flex flex-col items-center gap-1 w-14 py-2 rounded-lg transition-colors ${
              item.active ? 'bg-orange-700 text-white' : 'text-orange-100 hover:bg-orange-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
        <div className="mt-auto">
          <button title="Refresh" className="flex flex-col items-center gap-1 text-orange-100 hover:text-white">
            <span className="text-xl">🔄</span>
            <span className="text-[9px]">Refresh</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">SEO Dashboard</h1>
            <p className="text-sm text-gray-500">
              {meta.domain} · Last 28 days ·{' '}
              <span className="text-orange-500">Updated {new Date(meta.generated_at).toLocaleDateString()}</span>
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 shadow-sm">
            {meta.date_range.start} → {meta.date_range.end}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <KpiCard
            label="Impressions"
            value={gsc.summary.total_impressions.toLocaleString()}
            icon="👁️"
            color="orange"
            sub="Search Console"
          />
          <KpiCard
            label="Clicks"
            value={gsc.summary.total_clicks.toLocaleString()}
            icon="🖱️"
            color="purple"
            sub="Search Console"
          />
          <KpiCard
            label="Avg CTR"
            value={`${(gsc.summary.avg_ctr * 100).toFixed(1)}%`}
            icon="🎯"
            color="orange"
            sub="Click-through rate"
          />
          <KpiCard
            label="Avg Position"
            value={gsc.summary.avg_position.toFixed(1)}
            icon="🏆"
            color="purple"
            sub="SERP position"
          />
          <KpiCard
            label="Sessions"
            value={totalSessions.toLocaleString()}
            icon="📊"
            color="orange"
            sub="Google Analytics"
          />
          <KpiCard
            label="Bounce Rate"
            value={`${(avgBounce * 100).toFixed(1)}%`}
            icon="📉"
            color="purple"
            sub="Avg all pages"
          />
        </div>

        {/* SEMrush Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KpiCard label="Organic Keywords" value={semrush.domain_overview.organic_keywords.toLocaleString()} icon="🔑" color="orange" sub="SEMrush" />
          <KpiCard label="Estimated Traffic" value={semrush.domain_overview.organic_traffic_estimate.toLocaleString()} icon="🚗" color="purple" sub="SEMrush / month" />
          <KpiCard label="Traffic Value" value={`$${semrush.domain_overview.organic_traffic_cost_usd.toLocaleString()}`} icon="💰" color="orange" sub="SEMrush CPC value" />
          <KpiCard label="SERP Features" value={semrush.domain_overview.serp_feature_positions} icon="⭐" color="purple" sub="Feature positions" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Clicks & Impressions Trend</h2>
            <TrendChart data={gsc.daily_trend} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Top Organic Keywords (SEMrush)</h2>
            <div className="overflow-auto max-h-72">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b">
                    <th className="pb-2">Keyword</th>
                    <th className="pb-2 text-right">Pos.</th>
                    <th className="pb-2 text-right">Vol.</th>
                    <th className="pb-2 text-right">CPC</th>
                  </tr>
                </thead>
                <tbody>
                  {semrush.top_organic_keywords.slice(0, 12).map((kw, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-orange-50 transition-colors">
                      <td className="py-1.5 text-gray-700 truncate max-w-[160px]">{kw.keyword}</td>
                      <td className="py-1.5 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${kw.position <= 3 ? 'bg-green-100 text-green-700' : kw.position <= 10 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                          #{kw.position}
                        </span>
                      </td>
                      <td className="py-1.5 text-right text-gray-500">{kw.search_volume.toLocaleString()}</td>
                      <td className="py-1.5 text-right text-gray-500">${kw.cpc.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Top Queries (Search Console)</h2>
            <TopQueriesTable rows={gsc.top_queries_by_page.slice(0, 12)} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Top Pages by Sessions (GA4)</h2>
            <div className="overflow-auto max-h-72">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b">
                    <th className="pb-2">Page</th>
                    <th className="pb-2">Channel</th>
                    <th className="pb-2 text-right">Sessions</th>
                    <th className="pb-2 text-right">Bounce</th>
                  </tr>
                </thead>
                <tbody>
                  {ga4.top_pages_by_sessions.slice(0, 12).map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-purple-50 transition-colors">
                      <td className="py-1.5 text-gray-700 truncate max-w-[140px]" title={row.page}>{row.page}</td>
                      <td className="py-1.5">
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">{row.channel}</span>
                      </td>
                      <td className="py-1.5 text-right font-medium text-gray-800">{row.sessions}</td>
                      <td className="py-1.5 text-right text-gray-500">{(row.bounce_rate * 100).toFixed(0)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          Data sources: Google Search Console · SEMrush · Google Analytics 4 ·{' '}
          <a href="https://github.com/RommelTVAG/Dashboard-seo-thevagroup" target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">
            GitHub Database
          </a>
        </p>
      </main>
    </div>
  );
}
