import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError('Invalid email or password');
      } else {
        navigate('/modules');
      }
    } else {
      if (!name.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(error.message);
      } else {
        navigate('/modules');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-card-lg p-8">
        <h1 className="text-white font-display text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Michael"
                className="w-full bg-white/10 border border-white/20 rounded-card px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-white/70 text-sm mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/10 border border-white/20 rounded-card px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-card px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-coral text-sm bg-coral/10 rounded-card px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create an account'}
          </button>
        </form>

        <p className="text-center text-white/50 text-sm mt-6">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-coral hover:text-coral-dark transition-colors font-medium"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
