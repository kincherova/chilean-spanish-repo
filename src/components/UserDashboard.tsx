import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Dumbbell } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

const TOTAL_UNITS = 28;

interface DashboardStats {
  masteredCount: number;
  needsPracticeCount: number;
  totalPhrases: number;
  loading: boolean;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const { completedLessons } = useProgress();
  const [stats, setStats] = useState<DashboardStats>({ masteredCount: 0, needsPracticeCount: 0, totalPhrases: 0, loading: true });
  const [profileName, setProfileName] = useState<string | null>(null);

  const completedUnits = completedLessons.size;

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      const [{ count: masteredCount }, { count: needsPracticeCount }, { count: totalPhrases }, { data: profile }] = await Promise.all([
        supabase
          .from('user_flashcard_tags')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user!.id)
          .eq('tag', 'mastered'),
        supabase
          .from('user_flashcard_tags')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user!.id)
          .eq('tag', 'needs_practice'),
        supabase
          .from('flashcards')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('user_profiles')
          .select('name')
          .eq('id', user!.id)
          .maybeSingle(),
      ]);

      setStats({ masteredCount: masteredCount ?? 0, needsPracticeCount: needsPracticeCount ?? 0, totalPhrases: totalPhrases ?? 0, loading: false });
      if (profile?.name) setProfileName(profile.name);
    }

    fetchData();
  }, [user]);

  const metaName = user?.user_metadata?.name as string | undefined;
  const firstName = (metaName || profileName)?.split(' ')[0] ?? null;
  const progressPercent = Math.round((completedUnits / TOTAL_UNITS) * 100);
  const phrasesPercent = stats.totalPhrases > 0 ? Math.round((stats.masteredCount / stats.totalPhrases) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-1">
        Welcome back{firstName ? `, ${firstName}` : ''}!
      </h2>
      <p className="text-white/40 text-base mb-10">Here's where you left off</p>

      <div className="flex justify-center gap-12 mb-10">
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-1">{completedUnits}</div>
          <div className="text-white/40 text-xs uppercase tracking-widest">of {TOTAL_UNITS} units</div>
          <div className="mt-3 w-24 mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-white/30 text-xs mt-1.5">completed</div>
        </div>

        <div className="w-px bg-white/10 self-stretch" />

        <div className="text-center">
          {stats.loading ? (
            <div className="h-12 w-12 mx-auto bg-white/10 animate-pulse rounded-lg mb-1" />
          ) : (
            <div className="text-5xl font-bold text-white mb-1">{stats.masteredCount}</div>
          )}
          <div className="text-white/40 text-xs uppercase tracking-widest">
            of {stats.loading ? '—' : stats.totalPhrases} phrases
          </div>
          <div className="mt-3 w-24 mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal rounded-full transition-all duration-700"
              style={{ width: `${phrasesPercent}%` }}
            />
          </div>
          <div className="text-white/30 text-xs mt-1.5">mastered</div>
        </div>
      </div>

      <Link
        to="/modules"
        className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:gap-3 mb-4"
      >
        Continue learning <ArrowRight size={18} />
      </Link>

      <div className="h-4" />

      {!stats.loading && stats.needsPracticeCount > 0 && (
        <Link
          to="/vocabulary/practice?tag=needs_practice"
          className="inline-flex items-center gap-2 border border-amber-400/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-semibold px-8 py-4 rounded-full text-base transition-all hover:gap-3 hover:bg-amber-400/10 mb-3"
        >
          <Dumbbell size={18} />
          Phrases that need more practice
        </Link>
      )}

      {!stats.loading && stats.masteredCount > 0 && (
        <Link
          to="/vocabulary/practice"
          className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:gap-3 hover:bg-white/10"
        >
          <Brain size={18} />
          Test your mastered phrases
        </Link>
      )}
      {!stats.loading && stats.masteredCount === 0 && (
        <Link
          to="/vocabulary"
          className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:gap-3 hover:bg-white/10"
        >
          <Brain size={18} />
          Mark phrases as mastered to review them
        </Link>
      )}
    </div>
  );
}
