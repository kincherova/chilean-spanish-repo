import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, BookOpen, CheckCircle2, Award, ChevronRight, Star, Sparkles, KeyRound, X, MessageCircle } from 'lucide-react';
import NavBar from '../components/NavBar';
import InstallBanner from '../components/InstallBanner';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { UserProfile } from '../types/database';

export default function ProfilePage() {
  const { user, signOut, isPremium, refreshPremium } = useAuth();
  const { completedLessons } = useProgress();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [practiceCount, setPracticeCount] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);

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
    setUpgradeError(null);
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
      const checkoutUrl = data.init_point;
      if (!checkoutUrl) throw new Error('No checkout URL returned');
      window.location.href = checkoutUrl;
    } catch (err) {
      setUpgradeError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setUpgradeLoading(false);
    }
  };

  const handleAccessCode = async () => {
    if (!user) return;
    setCodeError(null);
    setCodeLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercadopago/redeem-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ code: accessCode.trim() }),
        }
      );
      const data = await res.json();
      if (!res.ok) { setCodeError(data.error || 'Invalid access code. Please try again.'); setCodeLoading(false); return; }
      await refreshPremium();
      setCodeLoading(false);
      setShowCodeInput(false);
      navigate('/modules');
    } catch {
      setCodeError('Something went wrong. Please try again.');
      setCodeLoading(false);
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
              <p className="mt-2 text-center text-xs text-amber-700">One-time payment — not a subscription.</p>
              {upgradeError && (
                <p className="mt-3 text-xs text-red-600 text-center">{upgradeError}</p>
              )}

              {!showCodeInput ? (
                <button
                  onClick={() => { setShowCodeInput(true); setCodeError(null); setAccessCode(''); }}
                  className="mt-3 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <KeyRound size={15} />
                  Have an access code?
                </button>
              ) : (
                <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-green-800">Enter your access code</p>
                    <button onClick={() => { setShowCodeInput(false); setCodeError(null); }} className="text-green-600 hover:text-green-800">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => { setAccessCode(e.target.value); setCodeError(null); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleAccessCode()}
                      placeholder="Access code"
                      className="flex-1 text-sm px-3 py-2 rounded-lg border border-green-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-navy placeholder-gray-400"
                    />
                    <button
                      onClick={handleAccessCode}
                      disabled={codeLoading || !accessCode.trim()}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {codeLoading ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : 'Apply'}
                    </button>
                  </div>
                  {codeError && (
                    <p className="mt-2 text-xs text-red-600">{codeError}</p>
                  )}
                </div>
              )}
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
            to="/modules"
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-warm-bg transition-colors group border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <BookOpen size={16} className="text-teal" />
              <span className="font-medium text-sm text-navy">Go to modules</span>
            </div>
            <ChevronRight size={16} className="text-muted group-hover:text-coral transition-colors" />
          </Link>
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

        <div className="bg-white rounded-card-lg overflow-hidden">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-5 py-4 text-coral hover:bg-coral/5 transition-colors"
          >
            <LogOut size={16} />
            <span className="font-medium text-sm">Sign out</span>
          </button>
        </div>

        <InstallBanner />

        <div className="flex justify-center mt-6 mb-2">
          <Link
            to="/about-irina"
            className="inline-flex items-center gap-3 bg-green-50/80 border border-green-200 rounded-card-lg px-4 py-3 hover:bg-green-100/80 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-green-200">
              <img
                src="/20000101000140_IMG_0882_copy.JPG"
                alt="Irina"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-green-900 text-sm">Meet Irina, creator of the app</p>
              <p className="text-green-700 text-xs mt-0.5">Language teacher in Chile</p>
            </div>
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-200/60 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <MessageCircle size={12} className="text-green-700" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
