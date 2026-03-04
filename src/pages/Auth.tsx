import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.name);
        navigate('/onboarding');
      } else {
        await signIn(formData.email, formData.password);
        navigate('/modules');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted hover:text-navy mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-light">Back to home</span>
        </button>

        <div className="bg-white rounded-card-lg shadow-lg border border-[#f0e8e0] p-8 md:p-10">
          <div className="flex items-center justify-center mb-8">
            <Globe className="w-10 h-10 text-coral" strokeWidth={1.5} />
          </div>

          <h2 className="text-3xl font-display font-bold text-center text-navy mb-2">
            {isSignUp ? 'Begin your journey' : 'Welcome back'}
          </h2>
          <p className="text-center text-muted font-light mb-8">
            {isSignUp ? 'Create your account to save your progress' : 'Log in to save your progress'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-[#f0e8e0] rounded-card focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all min-h-[48px]"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-cream border border-[#f0e8e0] rounded-card focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all min-h-[48px]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-cream border border-[#f0e8e0] rounded-card focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all min-h-[48px]"
                placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
              />
            </div>

            {error && (
              <div className="bg-coral/10 border border-coral/20 rounded-card px-4 py-3 text-sm text-coral-dark">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-coral to-coral-dark text-white py-3 rounded-card font-medium hover:shadow-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-sm text-muted hover:text-navy font-light transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Create a new account'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/modules')}
            className="text-sm font-light text-muted hover:text-navy transition-colors"
          >
            Continue without account
            <span className="block text-xs mt-1 text-muted/70">
              Your progress won't be saved without logging in
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
