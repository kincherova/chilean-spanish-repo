import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, Sparkles, KeyRound, X, ArrowLeft } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function UpgradePage() {
  const { user, isPremium, refreshPremium, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);

  const [showAuthCodeInput, setShowAuthCodeInput] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCodeError, setAuthCodeError] = useState<string | null>(null);
  const [authCodeLoading, setAuthCodeLoading] = useState(false);

  const [authStep, setAuthStep] = useState<'idle' | 'auth'>('idle');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authIntent, setAuthIntent] = useState<'payment' | 'code'>('payment');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const startCheckout = async (token?: string) => {
    setUpgradeLoading(true);
    setUpgradeError(null);
    try {
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

  const handleUpgradeClick = async () => {
    if (user) {
      const session = await supabase.auth.getSession();
      await startCheckout(session.data.session?.access_token);
    } else {
      setAuthStep('auth');
      setAuthMode('signup');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    if (authMode === 'signup') {
      if (!authName.trim()) { setAuthError('Please enter your name'); setAuthLoading(false); return; }
      const { error } = await signUp(authEmail, authPassword, authName);
      if (error) { setAuthError(error.message); setAuthLoading(false); return; }
    } else {
      const { error } = await signIn(authEmail, authPassword);
      if (error) { setAuthError('Invalid email or password'); setAuthLoading(false); return; }
    }
    const session = await supabase.auth.getSession();
    const uid = session.data.session?.user.id;
    const token = session.data.session?.access_token;
    setAuthLoading(false);
    if (authIntent === 'code' && uid) {
      const { error } = await supabase.from('user_profiles').update({ is_premium: true }).eq('id', uid);
      if (!error) { await refreshPremium(); navigate('/modules'); return; }
    }
    await startCheckout(token);
  };

  const handleAuthCode = async () => {
    setAuthCodeError(null);
    if (authCode.trim() !== '56990') {
      setAuthCodeError('Invalid access code. Please try again.');
      return;
    }
    if (!user) {
      setAuthIntent('code');
      setAuthStep('auth');
      setAuthMode('signup');
      return;
    }
    setAuthCodeLoading(true);
    const { error } = await supabase.from('user_profiles').update({ is_premium: true }).eq('id', user.id);
    if (error) { setAuthCodeError('Something went wrong. Please try again.'); setAuthCodeLoading(false); return; }
    await refreshPremium();
    setAuthCodeLoading(false);
    navigate('/modules');
  };

  const handleAccessCode = async () => {
    if (!user) {
      setAuthStep('auth');
      setAuthMode('signup');
      return;
    }
    setCodeError(null);
    if (accessCode.trim() !== '56990') {
      setCodeError('Invalid access code. Please try again.');
      return;
    }
    setCodeLoading(true);
    const { error } = await supabase.from('user_profiles').update({ is_premium: true }).eq('id', user.id);
    if (error) { setCodeError('Something went wrong. Please try again.'); setCodeLoading(false); return; }
    await refreshPremium();
    setCodeLoading(false);
    navigate('/modules');
  };

  if (isPremium) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back="/modules" title="Full Access" />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <Star size={28} className="text-amber-500 fill-amber-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy mb-2">You already have full access!</h1>
          <p className="text-muted mb-6">All modules and lessons are unlocked for you.</p>
          <button onClick={() => navigate('/modules')} className="px-6 py-3 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy/90 transition-colors">
            Go to modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back="/modules" title="Get full access" />
      <div className="max-w-md mx-auto px-4 py-8">

        {authStep === 'auth' ? (
          <div className="bg-white rounded-card-lg p-6 shadow-sm">
            <button
              onClick={() => { setAuthStep('idle'); setAuthError(''); }}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-navy mb-5 transition-colors"
            >
              <ArrowLeft size={15} /> Back
            </button>
            <h2 className="font-display text-xl font-bold text-navy mb-1">
              {authMode === 'signup' ? 'Create an account to continue' : 'Sign in to continue'}
            </h2>
            <p className="text-sm text-muted mb-5">
              {authIntent === 'code'
                ? authMode === 'signup'
                  ? 'Create a free account so your access can be activated.'
                  : 'Sign in to activate your access code.'
                : authMode === 'signup'
                  ? 'You need an account so your access is linked to you.'
                  : 'Sign in to your existing account to continue to checkout.'}
            </p>
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
                  <input
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Michael"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/40 transition-colors"
                  required
                  minLength={6}
                />
              </div>
              {authError && (
                <p className="text-red-600 text-sm bg-red-50 rounded-xl px-3 py-2">{authError}</p>
              )}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Star size={15} className="fill-white" />
                )}
                {authLoading
                  ? (authIntent === 'code' ? 'Activating...' : 'Redirecting to checkout...')
                  : (authIntent === 'code' ? 'Activate access' : 'Continue to payment')}
              </button>
            </form>

            <div className="mt-4 border-t border-gray-100 pt-4">
              {!showAuthCodeInput ? (
                <button
                  onClick={() => { setShowAuthCodeInput(true); setAuthCodeError(null); setAuthCode(''); }}
                  className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <KeyRound size={15} />
                  Have an access code?
                </button>
              ) : (
                <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-green-800">Enter your access code</p>
                    <button onClick={() => { setShowAuthCodeInput(false); setAuthCodeError(null); }} className="text-green-600 hover:text-green-800">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={authCode}
                      onChange={(e) => { setAuthCode(e.target.value); setAuthCodeError(null); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuthCode()}
                      placeholder="Access code"
                      className="flex-1 text-sm px-3 py-2 rounded-lg border border-green-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-navy placeholder-gray-400"
                    />
                    <button
                      onClick={handleAuthCode}
                      disabled={authCodeLoading || !authCode.trim()}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {authCodeLoading ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : 'Apply'}
                    </button>
                  </div>
                  {authCodeError && <p className="mt-2 text-xs text-red-600">{authCodeError}</p>}
                </div>
              )}
            </div>

            <p className="text-center text-sm text-muted mt-4">
              {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => { setAuthMode(authMode === 'signup' ? 'login' : 'signup'); setAuthError(''); }}
                className="text-coral hover:text-coral-dark font-medium transition-colors"
              >
                {authMode === 'signup' ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-card-lg overflow-hidden border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 mb-4">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <p className="font-bold text-amber-900">Unlock the full course</p>
                </div>
                <p className="text-amber-800 text-sm leading-relaxed mb-5">
                  Get access to all 5 modules and every lesson — covering airports, taxis, restaurants, shops, and more.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'All modules unlocked, including future ones',
                    'Full lesson library',
                    'All flashcard sets',
                    'Lifetime access — pay once',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-amber-800">
                      <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleUpgradeClick}
                  disabled={upgradeLoading}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {upgradeLoading ? (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Star size={15} className="fill-white" />
                  )}
                  {upgradeLoading ? 'Redirecting to checkout...' : 'Get full access'}
                </button>
                {upgradeError && (
                  <p className="mt-3 text-xs text-red-600 text-center">{upgradeError}</p>
                )}

                <div className="mt-4 border-t border-amber-200 pt-4">
                  {!showCodeInput ? (
                    <button
                      onClick={() => { setShowCodeInput(true); setCodeError(null); setAccessCode(''); }}
                      className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <KeyRound size={15} />
                      Have an access code?
                    </button>
                  ) : (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3">
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
                      {codeError && <p className="mt-2 text-xs text-red-600">{codeError}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-muted">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-coral hover:text-coral-dark font-medium transition-colors">
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
