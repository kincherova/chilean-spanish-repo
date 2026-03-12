import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, Sparkles, KeyRound, X, ArrowLeft, ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

declare global {
  interface Window {
    MercadoPago: new (publicKey: string, options: object) => {
      bricks: () => {
        create: (type: string, containerId: string, settings: object) => Promise<{ unmount: () => void }>;
      };
    };
    paymentBrickController?: { unmount: () => void };
  }
}

type Step = 'offer' | 'auth' | 'brick' | 'result';
type AuthMode = 'login' | 'signup';
type PaymentStatus = 'approved' | 'pending' | 'rejected';

function loadMPScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.MercadoPago) { resolve(); return; }

    const existing = document.querySelector('script[src="https://sdk.mercadopago.com/js/v2"]');
    if (existing) {
      const poll = setInterval(() => {
        if (window.MercadoPago) { clearInterval(poll); resolve(); }
      }, 50);
      setTimeout(() => { clearInterval(poll); reject(new Error('MercadoPago SDK timed out')); }, 10000);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load MercadoPago SDK'));
    document.head.appendChild(script);
  });
}

export default function UpgradePage() {
  const { user, isPremium, refreshPremium, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('offer');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [brickError, setBrickError] = useState<string | null>(null);

  const MP_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY as string;

  useEffect(() => {
    if (step !== 'brick') return;

    let cancelled = false;

    const unmountBrick = () => {
      if (window.paymentBrickController) {
        try { window.paymentBrickController.unmount(); } catch (_) { /* ignore */ }
        window.paymentBrickController = undefined;
      }
    };

    const mount = async () => {
      unmountBrick();

      try {
        await loadMPScript();
        if (cancelled) return;

        if (!MP_PUBLIC_KEY) {
          setBrickError('Payment system is not configured. Please contact support.');
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (cancelled) return;
        if (!session?.access_token) {
          setBrickError('Session expired. Please sign in again.');
          return;
        }

        const container = document.getElementById('paymentBrick_container');
        if (!container) {
          setBrickError('Payment form container not found. Please try again.');
          return;
        }
        container.innerHTML = '';
        if (cancelled) return;

        const token = session.access_token;
        const mp = new window.MercadoPago(MP_PUBLIC_KEY, { locale: 'en-US' });
        const bricksBuilder = mp.bricks();

        const settings = {
          initialization: {
            amount: 19900,
            payer: {
              firstName: '',
              lastName: '',
              email: user?.email ?? '',
            },
          },
          customization: {
            visual: {
              style: { theme: 'flat' },
            },
            paymentMethods: {
              creditCard: 'all',
              debitCard: 'all',
              ticket: 'all',
              bankTransfer: 'all',
              maxInstallments: 1,
            },
          },
          callbacks: {
            onReady: () => {},
            onSubmit: ({ formData }: { selectedPaymentMethod: string; formData: object }) => {
              return new Promise<void>((resolve, reject) => {
                (async () => {
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercadopago/process-payment`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(formData),
                      }
                    );
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Payment failed');
                    const status: PaymentStatus = data.status === 'approved'
                      ? 'approved'
                      : data.status === 'pending'
                      ? 'pending'
                      : 'rejected';
                    if (status === 'approved') await refreshPremium();
                    setPaymentStatus(status);
                    setStep('result');
                    resolve();
                  } catch (err) {
                    setBrickError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
                    reject();
                  }
                })();
              });
            },
            onError: (error: unknown) => {
              console.error('Brick error:', error);
              const msg = error && typeof error === 'object' && 'message' in error
                ? String((error as { message: unknown }).message)
                : JSON.stringify(error);
              setBrickError(`Payment form error: ${msg}`);
            },
          },
        };

        if (cancelled) return;

        const controller = await bricksBuilder.create(
          'payment',
          'paymentBrick_container',
          settings
        );

        if (cancelled) {
          try { controller.unmount(); } catch (_) { /* ignore */ }
        } else {
          window.paymentBrickController = controller;
        }
      } catch (err) {
        if (!cancelled) {
          setBrickError(err instanceof Error ? err.message : 'Failed to load payment form.');
        }
      }
    };

    mount();

    return () => {
      cancelled = true;
      unmountBrick();
    };
  }, [step]);

  const handleContinueToPayment = async () => {
    if (user) {
      setStep('brick');
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
    setStep('brick');
  };

  const handleAccessCode = async () => {
    if (!user) {
      setStep('auth');
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

  if (step === 'result' && paymentStatus) {
    const isApproved = paymentStatus === 'approved';
    const isPending = paymentStatus === 'pending';
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back="/modules" title="Payment" />
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${isApproved ? 'bg-green-100' : isPending ? 'bg-amber-100' : 'bg-red-100'}`}>
            {isApproved
              ? <CheckCircle2 size={40} className="text-green-600" />
              : isPending
              ? <Star size={40} className="text-amber-500" />
              : <X size={40} className="text-red-500" />}
          </div>
          <h1 className="font-display text-2xl font-bold text-navy mb-2">
            {isApproved ? 'Payment approved!' : isPending ? 'Payment pending' : 'Payment failed'}
          </h1>
          <p className="text-muted text-sm mb-8">
            {isApproved
              ? 'You now have full access to all modules and lessons.'
              : isPending
              ? "Your payment is being processed. We'll unlock your access as soon as it's confirmed."
              : 'Something went wrong. You can try again from your profile.'}
          </p>
          <button
            onClick={() => navigate('/modules')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy/90 transition-colors"
          >
            {isApproved ? 'Start learning' : 'Go to modules'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'brick') {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={() => setStep('offer')} title="Complete payment" />
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="bg-white rounded-card-lg shadow-sm p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy">Survival Chilean Spanish</p>
              <p className="text-xs text-muted">Full access — all modules unlocked</p>
            </div>
            <p className="text-lg font-bold text-navy">$19.900 CLP</p>
          </div>

          {brickError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {brickError}
            </div>
          )}

          <div id="paymentBrick_container" className="bg-white rounded-card-lg shadow-sm min-h-[200px]" />
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
                {authLoading ? 'Redirecting to payment...' : 'Continue to payment'}
              </button>
            </form>

            <div className="mt-4 border-t border-gray-100 pt-4">
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

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-amber-900">$19.900</span>
                <span className="text-amber-700 text-sm">CLP</span>
              </div>
              <span className="text-sm text-amber-600 line-through">$49.900</span>
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
      </div>
    </div>
  );
}
