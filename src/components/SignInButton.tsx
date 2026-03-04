import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignInButton() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) return null;

  return (
    <button
      onClick={() => navigate('/auth')}
      className="text-sm font-medium text-coral hover:text-coral-dark transition-colors border border-coral/30 px-4 py-1.5 rounded-full hover:bg-coral/5"
    >
      Sign in
    </button>
  );
}
