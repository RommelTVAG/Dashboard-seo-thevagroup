export default function TopQueriesTable({ rows }) {
  return (
    <div className="overflow-auto max-h-72">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b">
            <th className="pb-2">Query</th>
            <th className="pb-2 text-right">Clicks</th>
            <th className="pb-2 text-right">Impressions</th>
            <th className="pb-2 text-right">CTR</th>
            <th className="pb-2 text-right">Pos.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-orange-50 transition-colors">
              <td className="py-1.5 text-gray-700 truncate max-w-[160px]" title={row.query}>
                {row.query}
              </td>
              <td className="py-1.5 text-right font-medium text-orange-600">{row.clicks}</td>
              <td className="py-1.5 text-right text-gray-500">{row.impressions.toLocaleString()}</td>
              <td className="py-1.5 text-right text-gray-500">{(row.ctr * 100).toFixed(1)}%</td>
              <td className="py-1.5 text-right">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${row.position <= 3 ? 'bg-green-100 text-green-700' : row.position <= 10 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                  {row.position.toFixed(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
