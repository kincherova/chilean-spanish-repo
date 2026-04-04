import { useState, FormEvent } from 'react';
import { X, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  onClose: () => void;
  onRegistered: () => void;
}

export default function RegistrationPromptModal({ onClose, onRegistered }: Props) {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      const { error: signUpError } = await signUp(email, password, name);
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      onRegistered();
    } else {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }
      onRegistered();
    }

    setLoading(false);
  };

  const switchMode = () => {
    setMode(mode === 'signup' ? 'signin' : 'signup');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-navy px-6 pt-6 pb-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-coral/20 flex items-center justify-center">
              <UserPlus size={18} className="text-coral" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">
                {mode === 'signup' ? 'Save your progress' : 'Welcome back'}
              </h2>
            </div>
          </div>
          {mode === 'signup' && (
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              Register to start saving your progress and pick up where you left off.
            </p>
          )}
        </div>

        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-navy/70 text-xs font-medium mb-1">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Michael"
                  className="w-full bg-warm-bg border border-gray-200 rounded-xl px-4 py-2.5 text-navy placeholder-gray-400 focus:outline-none focus:border-coral transition-colors text-sm"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-navy/70 text-xs font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-warm-bg border border-gray-200 rounded-xl px-4 py-2.5 text-navy placeholder-gray-400 focus:outline-none focus:border-coral transition-colors text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-navy/70 text-xs font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-warm-bg border border-gray-200 rounded-xl px-4 py-2.5 text-navy placeholder-gray-400 focus:outline-none focus:border-coral transition-colors text-sm"
                required
                minLength={4}
              />
            </div>

            {error && (
              <p className="text-coral text-xs bg-coral/10 rounded-xl px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1 text-sm"
            >
              {loading ? 'Please wait...' : mode === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full mt-3 py-2.5 rounded-xl border border-gray-200 text-navy/60 hover:text-navy hover:border-gray-300 transition-colors font-medium text-sm"
          >
            Later
          </button>

          <p className="text-center text-navy/50 text-xs mt-4">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={switchMode}
              className="text-coral hover:text-coral-dark transition-colors font-medium"
            >
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
