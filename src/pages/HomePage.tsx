import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Plane, MessageCircle, Volume2, BookOpen, Download, Share } from 'lucide-react';
import UserDashboard from '../components/UserDashboard';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandaloneMode =
      ('standalone' in navigator && (navigator as { standalone?: boolean }).standalone === true) ||
      window.matchMedia('(display-mode: standalone)').matches;

    setIsIOS(isIOSDevice);
    if (isInStandaloneMode) setIsInstalled(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setIsInstalled(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
  };

  return { deferredPrompt, install, isInstalled, isIOS };
}

export default function HomePage() {
  const { user } = useAuth();
  const { deferredPrompt, install, isInstalled, isIOS } = useInstallPrompt();
  const [showTip, setShowTip] = useState(false);

  const showInstallButton = !isInstalled;

  return (
    <div className="min-h-screen bg-navy text-white">
      {!user && (
        <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-end">
          <div className="flex items-center gap-4" />
        </nav>
      )}

      {user ? (
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-20">
          <UserDashboard />
        </section>
      ) : (
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
            to="/modules"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:gap-3"
          >
            Start learning <ArrowRight size={20} />
          </Link>

          {showInstallButton && (
            <div className="mt-4 flex justify-center">
              <div className="relative inline-block">
                <button
                  onClick={async () => {
                    if (deferredPrompt) {
                      await install();
                    } else {
                      setShowTip(!showTip);
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white font-medium px-6 py-2.5 rounded-full text-sm transition-all"
                >
                  <Download size={15} />
                  Download App
                </button>

                {showTip && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-white text-navy rounded-xl shadow-2xl p-4 text-sm z-10">
                    <button
                      onClick={() => setShowTip(false)}
                      className="absolute top-2 right-3 text-navy/40 hover:text-navy text-lg leading-none"
                    >
                      &times;
                    </button>
                    {isIOS ? (
                      <>
                        <p className="font-semibold mb-2 text-center">Install on iPhone / iPad</p>
                        <p className="text-navy/70 text-center leading-relaxed">
                          Tap <Share size={13} className="inline mx-0.5 text-blue-500" /> <strong>Share</strong> in Safari, then tap <strong>"Add to Home Screen"</strong>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold mb-2 text-center">Install on Android</p>
                        <p className="text-navy/70 text-center leading-relaxed">
                          Tap the <strong>3-dot menu</strong> in Chrome, then tap <strong>"Add to Home Screen"</strong>
                        </p>
                      </>
                    )}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-sm" />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {!user && (
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <BookOpen size={22} className="text-gold" />,
                title: 'Essential Spanish',
                desc: 'Airport, taxi, restaurants, shops, and polite chat',
              },
              {
                icon: <Volume2 size={22} className="text-teal" />,
                title: 'Native audio',
                desc: 'Hear every phrase pronounced by a native Chilean speaker',
              },
              {
                icon: <MessageCircle size={22} className="text-coral" />,
                title: 'Real conversations',
                desc: 'Practice authentic Chilean dialogues used every day',
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
      )}

      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-white/30 text-sm">Survival Chilean Spanish &copy; {new Date().getFullYear()}</p>
        <p className="text-white/20 text-xs mt-2">Built by humans for humans</p>
      </footer>
    </div>
  );
}
