import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, BookOpen, CheckCircle2, Award, ChevronRight, Star, Lock, Sparkles } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { UserProfile } from '../types/database';

export default function ProfilePage() {
  const { user, signOut, isPremium } = useAuth();
  const { completedLessons } = useProgress();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [practiceCount, setPracticeCount] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => { if (data) setProfile(data); });

    supabase
      .from('user_flashcard_tags')
      .select('tag')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (!data) return;
        setPracticeCount(data.filter((r) => r.tag === 'needs_practice').length);
        setMasteredCount(data.filter((r) => r.tag === 'mastered').length);
      });
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleUpgrade = async () => {
    if (!user) return;
    setUpgradeLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      const appUrl = window.location.origin;
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercadopago/create-preference`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ appUrl }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create preference');
      const checkoutUrl = data.sandbox_init_point || data.init_point;
      window.location.href = checkoutUrl;
    } catch {
      setUpgradeLoading(false);
    }
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Learner';

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back="/modules" title="Profile" />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-card-lg p-6 mb-6 flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-coral flex items-center justify-center text-white font-display text-xl font-bold">
              {displayName[0].toUpperCase()}
            </div>
            {isPremium && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
                <Star size={10} className="text-white fill-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-navy text-lg">{displayName}</p>
              {isPremium && (
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                  Full Access
                </span>
              )}
            </div>
            <p className="text-muted text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <CheckCircle2 size={18} className="text-green-500" />, value: completedLessons.size, label: 'Lessons done' },
            { icon: <BookOpen size={18} className="text-teal" />, value: 5, label: 'Modules' },
            { icon: <Award size={18} className="text-gold" />, value: Math.floor(completedLessons.size * 10), label: 'Points' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-card-lg p-4 text-center">
              <div className="flex justify-center mb-1">{s.icon}</div>
              <p className="font-bold text-navy text-xl">{s.value}</p>
              <p className="text-muted text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {!isPremium && (
          <div className="mb-6 rounded-card-lg overflow-hidden border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-amber-500" />
                <p className="font-bold text-amber-900 text-sm">Unlock the full course</p>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed mb-4">
                Get access to all 5 modules and every lesson — covering airports, taxis, restaurants, shops, and more.
              </p>
              <ul className="space-y-1.5 mb-5">
                {[
                  'All modules unlocked, including the future ones',
                  'Full lesson library',
                  'All flashcard sets',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-amber-800">
                    <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={upgradeLoading}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {upgradeLoading ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Star size={15} className="fill-white" />
                )}
                {upgradeLoading ? 'Redirecting to checkout...' : 'Get full access'}
              </button>
            </div>
          </div>
        )}

        {isPremium && (
          <div className="mb-6 rounded-card-lg border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0">
              <Star size={16} className="text-amber-500 fill-amber-400" />
            </div>
            <div>
              <p className="font-semibold text-amber-900 text-sm">You have full access to the content. Enjoy!</p>
              <p className="text-amber-700 text-xs mt-0.5">All modules and lessons are unlocked.</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-card-lg overflow-hidden mb-4">
          <Link
            to="/vocabulary"
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-warm-bg transition-colors group"
          >
            <div className="flex items-center gap-3">
              <BookOpen size={16} className="text-muted" />
              <div>
                <span className="font-medium text-sm text-navy">My Vocabulary</span>
                <p className="text-xs text-muted mt-0.5">
                  {practiceCount > 0 || masteredCount > 0
                    ? `${practiceCount} to practice · ${masteredCount} mastered`
                    : 'No tagged words yet'}
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:text-coral transition-colors" />
          </Link>
        </div>

        {!isPremium && (
          <div className="bg-white rounded-card-lg overflow-hidden mb-4">
            <Link
              to="/modules"
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-warm-bg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Lock size={16} className="text-muted" />
                <span className="font-medium text-sm text-navy">Back to modules</span>
              </div>
              <ChevronRight size={16} className="text-muted group-hover:text-coral transition-colors" />
            </Link>
          </div>
        )}

        <div className="bg-white rounded-card-lg overflow-hidden">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-5 py-4 text-coral hover:bg-coral/5 transition-colors"
          >
            <LogOut size={16} />
            <span className="font-medium text-sm">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
