import { useNavigate } from 'react-router-dom';
import { Globe, BookOpen, Clock, Award, BookMarked, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [adminOpen, setAdminOpen] = useState(false);
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (adminRef.current && !adminRef.current.contains(e.target as Node)) {
        setAdminOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-16 md:mb-24">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-coral" strokeWidth={1.5} />
            <h1 className="text-2xl font-light tracking-wide text-navy">
              Survival Chilean Spanish
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <button
                  onClick={() => navigate('/phrase-book')}
                  className="flex items-center gap-2 text-sm font-medium text-teal hover:text-teal/80 transition-colors"
                >
                  <BookMarked className="w-5 h-5" />
                  <span className="hidden sm:inline">Phrase Book</span>
                </button>
                <div className="relative" ref={adminRef}>
                  <button
                    onClick={() => setAdminOpen(!adminOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-charcoal hover:text-coral transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="hidden sm:inline">Admin</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${adminOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {adminOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-lg border border-gray-100 py-1 z-50">
                      {[
                        { label: 'Flashcards', path: '/admin/flashcards' },
                        { label: 'Audio', path: '/admin/audio' },
                        { label: 'Hear and React', path: '/admin/hear-and-react' },
                        { label: 'This or That', path: '/admin/this-or-that' },
                        { label: 'Dialogues', path: '/admin/dialogue' },
                      ].map(item => (
                        <button
                          key={item.path}
                          onClick={() => { setAdminOpen(false); navigate(item.path); }}
                          className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream hover:text-coral transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            <button
              onClick={() => navigate(user ? '/modules' : '/auth')}
              className="text-sm font-medium text-coral hover:text-coral-dark transition-colors"
            >
              {user ? 'Modules' : 'Sign In'}
            </button>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.15] text-navy">
              Master the essentials
              <span className="block text-coral mt-2">before you land</span>
            </h2>
            <p className="text-xl text-muted leading-relaxed font-light">
              Short, focused lessons designed for busy travelers. Learn the Chilean
              Spanish you'll actually use in real situations.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-br from-coral to-coral-dark text-white px-8 py-4 rounded-card-lg text-lg font-medium hover:shadow-xl transition-all transform hover:-translate-y-0.5 shadow-lg min-h-[48px]"
            >
              Start Learning
            </button>
          </div>

          <div className="hidden md:block relative">
            <div className="aspect-square bg-gradient-to-br from-coral to-teal rounded-3xl opacity-10 absolute inset-0 blur-3xl"></div>
            <div className="relative bg-white rounded-card-lg shadow-lg border border-[#f0e8e0] p-8 space-y-6">
              {[
                { icon: Clock, text: '10-15 minute lessons', color: 'text-coral' },
                { icon: BookOpen, text: 'Real-world scenarios', color: 'text-teal' },
                { icon: Award, text: 'Track your progress', color: 'text-gold' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-cream p-3 rounded-card">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} strokeWidth={1.5} />
                  </div>
                  <span className="text-navy font-light text-lg">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: 'Survival Focused',
              description: 'Learn only what you need for your trip. No fluff, just practical language.',
            },
            {
              title: 'Chilean Context',
              description: 'Authentic phrases and cultural notes specific to Chile.',
            },
            {
              title: 'Quick & Effective',
              description: 'Make progress in just 10-15 minutes a day.',
            },
          ].map((benefit, index) => (
            <div key={index} className="bg-white rounded-card-lg p-8 shadow-sm border border-[#f0e8e0] hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-display font-semibold text-navy mb-3">{benefit.title}</h3>
              <p className="text-muted font-light leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </section>

        <footer className="text-center text-muted text-sm font-light">
          <p>Designed for adult travelers who want to connect authentically</p>
        </footer>
      </div>
    </div>
  );
}
