import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, Sparkles, KeyRound, ArrowLeft } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { trackEvent } from '../lib/analytics';
import MercadoPagoCardForm from '../components/MercadoPagoCardForm';

type Step = 'offer' | 'auth' | 'checkout' | 'code-signup';
type AuthMode = 'login' | 'signup';

export default function UpgradePage() {
  const { user, isPremium, grantPremium, signIn, signUp, signOut } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('offer');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (step !== 'checkout') {
      setIsProcessing(false);
    }
  }, [step]);

  const handleCardSubmit = async (token: string, paymentMethodId: string, issuerId: string, installments: number) => {
    setIsProcessing(true);
    setCheckoutError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setCheckoutError('Session expired. Please sign in again.');
        setIsProcessing(false);
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercadopago/process-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            token,
            installments,
            payment_method_id: paymentMethodId,
            issuer_id: issuerId,
            transaction_amount: 19,
            payer: {
              email: user?.email || '',
              identification: { type: 'Otro', number: '0' },
            },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setCheckoutError(data.error || 'Payment failed. Please try again.');
        setIsProcessing(false);
        return;
      }

      if (data.status === 'approved') {
        grantPremium();
        navigate('/payment/success');
      } else if (data.status === 'pending' || data.status === 'in_process') {
        navigate('/payment/pending');
      } else {
        const parts = [data.status_detail, data.mp_error, data.mp_cause ? JSON.stringify(data.mp_cause) : null].filter(Boolean);
        const detail = parts.length > 0 ? ` (${parts.join(' | ')})` : '';
        setCheckoutError(`Payment was not approved${detail}. Please check your card details and try again.`);
        setIsProcessing(false);
      }
    } catch {
      setCheckoutError('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleContinueToPayment = () => {
    trackEvent('checkout_initiated');
    if (user) {
      setStep('checkout');
    } else {
      setStep('auth');
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
    setAuthLoading(false);
    setStep('checkout');
  };

  const handleAccessCode = async () => {
    if (!user) {
      setStep('code-signup');
      setCodeError(null);
      setAccessCode('');
      return;
    }
    setCodeError(null);
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
      if (!res.ok) { setCodeError(data.error || 'Invalid access code. Please try again.'); return; }
      grantPremium();
      navigate('/modules');
    } catch {
      setCodeError('Something went wrong. Please try again.');
    }
  };

  const handleCodeSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setCodeError(null);
    if (!authName.trim()) { setAuthError('Please enter your name'); return; }
    if (!accessCode.trim()) { setCodeError('Please enter your access code'); return; }
    setAuthLoading(true);
    try {
      const { error: signUpError, accessToken } = await signUp(authEmail, authPassword, authName);
      if (signUpError) { setAuthError(signUpError.message); setAuthLoading(false); return; }
      let token = accessToken;
      if (!token) {
        const { data: { session } } = await supabase.auth.getSession();
        token = session?.access_token;
      }
      if (!token) {
        setAuthError('Account created but could not establish session. Please sign in and try the code again.');
        setAuthLoading(false);
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercadopago/redeem-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code: accessCode.trim() }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setCodeError(data.error || 'Invalid access code. Please check the code and try again.');
        setAuthLoading(false);
        return;
      }
      grantPremium();
      setAuthLoading(false);
      navigate('/modules');
    } catch {
      setAuthError('Something went wrong. Please try again.');
      setAuthLoading(false);
    }
  };

  if (isPremium && step === 'offer') {
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
          <div className="mt-6">
            <button
              onClick={async () => { await signOut(); setStep('offer'); }}
              className="text-sm text-muted hover:text-navy transition-colors underline underline-offset-2"
            >
              Sign out and use a different account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={() => { setStep('offer'); }} title="Complete payment" />
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="bg-white rounded-card-lg p-5 shadow-sm mb-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-navy text-sm">Survival Chilean Spanish</p>
              <p className="text-xs text-muted">Full access — lifetime</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-amber-600">$19</span>
              <span className="text-xs text-muted">USD</span>
            </div>
          </div>

          {checkoutError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {checkoutError}
            </div>
          )}

          <div className="bg-white rounded-card-lg shadow-sm overflow-hidden">
            <MercadoPagoCardForm
              onSubmit={handleCardSubmit}
              onError={(msg) => setCheckoutError(msg)}
              isProcessing={isProcessing}
            />
          </div>

          <p className="text-center text-xs text-muted mt-4">
            Your card details are encrypted and handled securely by MercadoPago.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'code-signup') {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={() => { setStep('offer'); setAuthError(''); setCodeError(null); }} title="Redeem access code" />
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="bg-white rounded-card-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <KeyRound size={18} className="text-green-700" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-navy leading-tight">Redeem your access code</h2>
                <p className="text-sm text-muted">Create an account to activate your access</p>
              </div>
            </div>

            <form onSubmit={handleCodeSignup} className="space-y-4">
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
                  minLength={4}
                />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Access code</label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => { setAccessCode(e.target.value); setCodeError(null); }}
                  placeholder="Enter your code"
                  className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:border-green-400 transition-colors bg-green-50"
                  required
                />
                {codeError && <p className="mt-1.5 text-xs text-red-600">{codeError}</p>}
              </div>

              {authError && (
                <p className="text-red-600 text-sm bg-red-50 rounded-xl px-3 py-2">{authError}</p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <KeyRound size={15} />
                )}
                {authLoading ? 'Activating your access...' : 'Create account & activate'}
              </button>
            </form>

            <p className="text-center text-sm text-muted mt-4">
              Already have an account?{' '}
              <button
                onClick={() => { setStep('auth'); setAuthMode('login'); setAuthError(''); }}
                className="text-coral hover:text-coral-dark font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'auth') {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={() => setStep('offer')} title="Create account" />
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="bg-white rounded-card-lg p-6 shadow-sm">
            <button
              onClick={() => { setStep('offer'); setAuthError(''); }}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-navy mb-5 transition-colors"
            >
              <ArrowLeft size={15} /> Back
            </button>
            <h2 className="font-display text-xl font-bold text-navy mb-1">
              {authMode === 'signup' ? 'Create an account to continue' : 'Sign in to continue'}
            </h2>
            <p className="text-sm text-muted mb-5">
              {authMode === 'signup'
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
                  minLength={4}
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
                {authLoading ? 'Setting up checkout...' : 'Continue to payment'}
              </button>
            </form>

            <p className="text-center text-sm text-muted mt-4">
              {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => { setAuthMode(authMode === 'signup' ? 'login' : 'signup'); setAuthError(''); }}
                className="text-coral hover:text-coral-dark font-medium transition-colors"
              >
                {authMode === 'signup' ? 'Sign in' : 'Sign up'}
              </button>
            </p>

            <div className="mt-3 pt-3 border-t border-gray-100 text-center">
              <button
                onClick={() => { setStep('code-signup'); setAuthError(''); setCodeError(null); setAccessCode(''); }}
                className="text-sm text-green-700 hover:text-green-900 font-medium transition-colors flex items-center gap-1.5 mx-auto"
              >
                <KeyRound size={13} />
                Have an access code?
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back="/modules" title="Get full access" />
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="rounded-card-lg overflow-hidden border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 mb-4">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-amber-500" />
              <p className="font-bold text-amber-900">Unlock the full course</p>
            </div>
            <p className="text-amber-800 text-sm leading-relaxed mb-5">
              Get access to all modules and every lesson — covering airports, taxis, restaurants, shops, and more.
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

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-amber-900">$19</span>
                <span className="text-amber-700 text-sm">USD</span>
              </div>
              <span className="text-sm text-amber-600 line-through">$49</span>
              <span className="text-xs font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full">60% off</span>
            </div>

            <button
              onClick={handleContinueToPayment}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Star size={15} className="fill-white" />
              Get full access
            </button>

            <div className="mt-4 border-t border-amber-200 pt-4">
              <button
                onClick={handleAccessCode}
                className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <KeyRound size={15} />
                Have an access code?
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-coral hover:text-coral-dark font-medium transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
