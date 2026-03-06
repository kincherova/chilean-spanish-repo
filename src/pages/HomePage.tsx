import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Plane, MessageCircle, Volume2, BookOpen } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-navy text-white">
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-end">
        <div className="flex items-center gap-4">
          {user && (
            <Link
              to="/modules"
              className="bg-coral hover:bg-coral-dark text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors"
            >
              Continue learning
            </Link>
          )}
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 mb-8">
          <Plane size={14} className="text-white" />
          <span className="text-white text-sm font-medium">Learn before you land</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-6">
          Survival Chilean<br />
          <span className="text-coral">Spanish</span>
        </h1>

        <p className="text-white/60 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Master essential phrases for real situations — airports, taxis, restaurants,
          shops — in short focused lessons built for busy travelers.
        </p>

        <Link
          to={user ? '/modules' : '/login'}
          className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:gap-3"
        >
          Start learning <ArrowRight size={20} />
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <MessageCircle size={22} className="text-coral" />,
              title: 'Real conversations',
              desc: 'Practice authentic Chilean dialogues used every day',
            },
            {
              icon: <Volume2 size={22} className="text-teal" />,
              title: 'Native audio',
              desc: 'Hear every phrase pronounced by a native Chilean speaker',
            },
            {
              icon: <BookOpen size={22} className="text-gold" />,
              title: 'Essential Spanish',
              desc: 'Airport, taxi, restaurants, shops, and polite chat',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white/5 border border-white/10 rounded-card-lg p-6">
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-white/30 text-sm">Survival Chilean Spanish &copy; {new Date().getFullYear()}</p>
        <p className="text-white/20 text-xs mt-2">Built by humans for humans</p>
      </footer>
    </div>
  );
}
