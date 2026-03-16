import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Brain } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

const TOTAL_UNITS = 28;

interface DashboardStats {
  masteredCount: number;
  loading: boolean;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const { completedLessons } = useProgress();
  const [stats, setStats] = useState<DashboardStats>({ masteredCount: 0, loading: true });

  const completedUnits = completedLessons.size;

  useEffect(() => {
    if (!user) return;

    async function fetchMastered() {
      const { count } = await supabase
        .from('user_flashcard_tags')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .eq('tag', 'mastered');

      setStats({ masteredCount: count ?? 0, loading: false });
    }

    fetchMastered();
  }, [user]);

  const firstName = user?.user_metadata?.name?.split(' ')[0] ?? 'back';
  const progressPercent = Math.round((completedUnits / TOTAL_UNITS) * 100);

  return (
    <div className="w-full max-w-lg mx-auto px-4 pt-8 pb-6">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white leading-snug">
            Welcome back{firstName !== 'back' ? `, ${firstName}` : ''}!
          </h2>
          <p className="text-white/50 text-sm mt-1">Keep up the great work</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-teal flex-shrink-0" />
              <span className="text-white/60 text-xs font-medium uppercase tracking-wide">Units done</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">{completedUnits}</span>
              <span className="text-white/40 text-sm">/ {TOTAL_UNITS}</span>
            </div>
            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-white/30 text-xs mt-1">{progressPercent}% complete</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-gold flex-shrink-0" />
              <span className="text-white/60 text-xs font-medium uppercase tracking-wide">Mastered</span>
            </div>
            {stats.loading ? (
              <div className="h-9 w-12 bg-white/10 animate-pulse rounded-lg mt-1" />
            ) : (
              <>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{stats.masteredCount}</span>
                  <span className="text-white/40 text-sm">phrase{stats.masteredCount !== 1 ? 's' : ''}</span>
                </div>
                <p className="text-white/30 text-xs mt-2 leading-snug">marked as mastered</p>
              </>
            )}
          </div>
        </div>

        <Link
          to="/modules"
          className="flex items-center justify-center gap-2 w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-xl transition-all hover:gap-3 text-base mb-3"
        >
          Continue learning <ArrowRight size={18} />
        </Link>

        {!stats.loading && stats.masteredCount > 0 && (
          <Link
            to="/vocabulary/practice"
            className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white font-medium py-3 rounded-xl transition-all text-sm"
          >
            <Brain size={16} />
            Test your mastered phrases
          </Link>
        )}
        {!stats.loading && stats.masteredCount === 0 && (
          <Link
            to="/vocabulary"
            className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/50 hover:text-white/80 font-medium py-3 rounded-xl transition-all text-sm"
          >
            <Brain size={16} />
            Mark phrases as mastered to review them
          </Link>
        )}
      </div>
    </div>
  );
}
