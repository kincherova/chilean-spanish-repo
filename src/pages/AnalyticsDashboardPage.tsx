import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Eye, ShoppingCart, CheckCircle2, RefreshCw, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Totals = {
  landing_page_view: number;
  checkout_initiated: number;
  purchase_completed: number;
};

type DailyRow = Record<string, number>;
type Daily = Record<string, DailyRow>;

const PERIOD_OPTIONS = [
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 90 days', value: 90 },
];

function pct(num: number, denom: number) {
  if (!denom) return '—';
  return `${Math.round((num / denom) * 100)}%`;
}

export default function AnalyticsDashboardPage() {
  const navigate = useNavigate();
  const [days, setDays] = useState(30);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [daily, setDaily] = useState<Daily>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics-stats?days=${days}`,
        { headers: { Authorization: `Bearer ${session.access_token}` } }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed to load stats');
      setTotals(json.totals);
      setDaily(json.daily);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [days, navigate]);

  useEffect(() => { load(); }, [load]);

  const sortedDays = Object.keys(daily).sort();

  const maxVal = sortedDays.reduce((max, d) => {
    const row = daily[d];
    return Math.max(max, row['landing_page_view'] ?? 0, row['checkout_initiated'] ?? 0, row['purchase_completed'] ?? 0);
  }, 1);

  return (
    <div className="min-h-screen bg-navy text-white font-body px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Analytics</h1>
            <p className="text-white/40 text-sm mt-1">Funnel for readyforlatam.com/chileanspanish</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 pr-9 focus:outline-none focus:border-white/40 cursor-pointer"
              >
                {PERIOD_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-[#1a2744] text-white">{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            </div>
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm rounded-xl px-4 py-2.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-4 mb-8 text-sm">
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: <Eye size={20} className="text-teal" />,
              label: 'Page views',
              key: 'landing_page_view' as const,
              sub: 'Opened the link',
            },
            {
              icon: <ShoppingCart size={20} className="text-gold" />,
              label: 'Checkout started',
              key: 'checkout_initiated' as const,
              sub: totals ? `${pct(totals.checkout_initiated, totals.landing_page_view)} of viewers` : '—',
            },
            {
              icon: <CheckCircle2 size={20} className="text-coral" />,
              label: 'Purchases',
              key: 'purchase_completed' as const,
              sub: totals ? `${pct(totals.purchase_completed, totals.checkout_initiated)} of checkouts` : '—',
            },
          ].map(card => (
            <div key={card.key} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  {card.icon}
                </div>
                <p className="text-white/60 text-sm font-medium">{card.label}</p>
              </div>
              <p className="font-display text-4xl font-bold text-white mb-1">
                {loading ? <span className="text-white/20">—</span> : (totals?.[card.key] ?? 0).toLocaleString()}
              </p>
              <p className="text-white/30 text-xs">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Conversion funnel */}
        {totals && !loading && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={16} className="text-white/40" />
              <p className="text-white/60 text-sm font-medium">Conversion funnel</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Viewed landing page', value: totals.landing_page_view, color: 'bg-teal' },
                { label: 'Started checkout', value: totals.checkout_initiated, color: 'bg-gold' },
                { label: 'Completed purchase', value: totals.purchase_completed, color: 'bg-coral' },
              ].map(bar => {
                const width = totals.landing_page_view > 0
                  ? Math.max(2, Math.round((bar.value / totals.landing_page_view) * 100))
                  : 0;
                return (
                  <div key={bar.label} className="flex items-center gap-4">
                    <p className="text-white/50 text-sm w-44 flex-shrink-0">{bar.label}</p>
                    <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${bar.color} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <p className="text-white font-semibold text-sm w-12 text-right">{bar.value.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily chart */}
        {sortedDays.length > 0 && !loading && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <p className="text-white/60 text-sm font-medium">Daily breakdown</p>
              <div className="flex items-center gap-4 ml-auto">
                {[
                  { label: 'Views', color: 'bg-teal' },
                  { label: 'Checkouts', color: 'bg-gold' },
                  { label: 'Purchases', color: 'bg-coral' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                    <span className="text-white/40 text-xs">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="flex items-end gap-2 min-w-0" style={{ minHeight: '120px' }}>
                {sortedDays.map(day => {
                  const row = daily[day];
                  const views = row['landing_page_view'] ?? 0;
                  const checkouts = row['checkout_initiated'] ?? 0;
                  const purchases = row['purchase_completed'] ?? 0;
                  const label = day.slice(5);
                  return (
                    <div key={day} className="flex flex-col items-center gap-1 flex-1 min-w-[28px] group">
                      <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: '100px' }}>
                        {[
                          { val: views, color: 'bg-teal/70' },
                          { val: checkouts, color: 'bg-gold/70' },
                          { val: purchases, color: 'bg-coral/70' },
                        ].map((b, i) => (
                          <div
                            key={i}
                            title={`${b.val}`}
                            className={`${b.color} rounded-sm w-2 transition-all`}
                            style={{ height: `${Math.round((b.val / maxVal) * 100)}px` }}
                          />
                        ))}
                      </div>
                      <p className="text-white/20 text-[9px] group-hover:text-white/50 transition-colors">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!loading && sortedDays.length === 0 && !error && (
          <div className="text-center py-20 text-white/30 text-sm">
            No events recorded yet in this period.
          </div>
        )}
      </div>
    </div>
  );
}
