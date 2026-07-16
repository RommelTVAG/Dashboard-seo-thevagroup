export default function KpiCard({ label, value, icon, color, sub }) {
  const accent = color === 'orange'
    ? 'border-l-[#F5A623] bg-amber-50'
    : 'border-l-[#6B21A8] bg-violet-50';
  const iconBg = color === 'orange' ? 'bg-[#FEF0D0]' : 'bg-violet-100';
  const valueColor = color === 'orange' ? 'text-[#D98007]' : 'text-[#6B21A8]';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${accent} p-4 flex flex-col gap-1`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</span>
        <span className={`text-lg ${iconBg} p-1 rounded-lg`}>{icon}</span>
      </div>
      <span className={`text-2xl font-bold ${valueColor}`}>{value}</span>
      {sub && <span className="text-[10px] text-gray-400">{sub}</span>}
    </div>
  );
}
