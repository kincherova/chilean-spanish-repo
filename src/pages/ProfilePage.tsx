import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, CheckCircle2, Award } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { UserProfile } from '../types/database';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { completedLessons } = useProgress();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => { if (data) setProfile(data); });
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Learner';

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back="/modules" title="Profile" />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-card-lg p-6 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-coral flex items-center justify-center text-white font-display text-xl font-bold">
            {displayName[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-navy text-lg">{displayName}</p>
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
