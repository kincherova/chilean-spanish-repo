import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, RefreshCw, Search, ChevronUp, ChevronDown, CreditCard, Key, UserCheck, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  is_premium: boolean;
  access_type: 'paid' | 'access_code' | null;
  created_at: string;
}

type SortKey = 'name' | 'email' | 'access_type' | 'created_at';
type SortDir = 'asc' | 'desc';

const ACCESS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  paid: { label: 'Paid', color: 'bg-emerald-100 text-emerald-700', icon: <CreditCard size={11} /> },
  access_code: { label: 'Access code', color: 'bg-blue-100 text-blue-700', icon: <Key size={11} /> },
  free: { label: 'Free', color: 'bg-gray-100 text-gray-500', icon: <User size={11} /> },
};

function accessKey(u: UserRow) {
  if (u.access_type === 'paid') return 'paid';
  if (u.access_type === 'access_code') return 'access_code';
  return 'free';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterAccess, setFilterAccess] = useState<'all' | 'paid' | 'access_code' | 'free'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users`,
        { headers: { Authorization: `Bearer ${session.access_token}` } }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed to load users');
      setUsers(json.users ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { load(); }, [load]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = users
    .filter(u => {
      if (filterAccess !== 'all' && accessKey(u) !== filterAccess) return false;
      if (search) {
        const q = search.toLowerCase();
        return (u.name ?? '').toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      let va: string, vb: string;
      if (sortKey === 'access_type') {
        va = accessKey(a); vb = accessKey(b);
      } else {
        va = (a[sortKey] ?? '').toString();
        vb = (b[sortKey] ?? '').toString();
      }
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const counts = {
    total: users.length,
    paid: users.filter(u => u.access_type === 'paid').length,
    access_code: users.filter(u => u.access_type === 'access_code').length,
    free: users.filter(u => !u.is_premium).length,
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? (sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />)
      : <ChevronDown size={13} className="opacity-30" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center">
              <Users size={17} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Users</h1>
              <p className="text-xs text-gray-400">{counts.total} registered</p>
            </div>
          </div>
          <button onClick={load} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total', value: counts.total, icon: <UserCheck size={14} />, color: 'text-gray-700', bg: 'bg-white' },
            { label: 'Paid', value: counts.paid, icon: <CreditCard size={14} />, color: 'text-emerald-700', bg: 'bg-emerald-50' },
            { label: 'Access code', value: counts.access_code, icon: <Key size={14} />, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Free', value: counts.free, icon: <User size={14} />, color: 'text-gray-500', bg: 'bg-gray-100' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-200/80 px-4 py-3 flex items-center gap-3`}>
              <span className={s.color}>{s.icon}</span>
              <div>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div className="flex gap-1.5">
            {(['all', 'paid', 'access_code', 'free'] as const).map(f => (
              <button key={f}
                onClick={() => setFilterAccess(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  filterAccess === f
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}>
                {f === 'all' ? 'All' : f === 'access_code' ? 'Code' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {error && (
            <div className="px-5 py-3 bg-red-50 border-b border-red-100 text-sm text-red-600">{error}</div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {([
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'access_type', label: 'Access' },
                    { key: 'created_at', label: 'Joined' },
                  ] as { key: SortKey; label: string }[]).map(col => (
                    <th key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-700 select-none whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        {col.label}
                        <SortIcon k={col.key} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-sm text-gray-400">
                      <RefreshCw size={18} className="animate-spin mx-auto mb-2 text-gray-300" />
                      Loading users...
                    </td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-sm text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}
                {!loading && filtered.map((u, i) => {
                  const ak = accessKey(u);
                  const badge = ACCESS_LABELS[ak];
                  return (
                    <tr key={u.id}
                      className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                        {u.name || <span className="text-gray-300 italic">—</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                          {badge.icon}
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{formatDate(u.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {users.length} users
            </div>
          )}
        </div>

        {/* Nav links */}
        <div className="mt-6 flex gap-3 text-xs">
          <button onClick={() => navigate('/analytics')} className="text-gray-400 hover:text-gray-600 transition-colors">
            Analytics
          </button>
          <span className="text-gray-200">|</span>
          <button onClick={() => navigate('/admin-audio')} className="text-gray-400 hover:text-gray-600 transition-colors">
            Audio admin
          </button>
        </div>
      </div>
    </div>
  );
}


export default AdminUsersPage