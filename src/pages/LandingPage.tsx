import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Plane,
  Volume2,
  MessageCircle,
  BookOpen,
  CheckCircle2,
  Star,
  Utensils,
  ShoppingBag,
  Car,
  Mail,
} from 'lucide-react';


const MODULES = [
  { icon: <MessageCircle size={18} />, title: 'Polite survival talk', desc: 'Essential phrases for respectful communication' },
  { icon: <Plane size={18} />, title: 'At the Airport', desc: 'Navigate immigration, customs, and finding your way out of the airport.' },
  { icon: <Car size={18} />, title: 'Moving around the city', desc: 'Navigate any Chilean city confidently — ask for directions, chat with drivers, and handle any bumps along the way.' },
  { icon: <Utensils size={18} />, title: 'Cafes & restaurants', desc: 'Order food and drinks like a local' },
  { icon: <ShoppingBag size={18} />, title: 'Shops & paying', desc: 'Shop confidently and handle transactions' },
];


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy text-white font-body">

      {/* NAV */}
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-20 text-center">
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-12">
          Your trip to Chile<br />
          <span className="text-coral">starts here</span>
        </h1>

        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-20 leading-relaxed">
          Chilean Spanish is unlike any other. Locals speak fast, drop letters, and use slang you won't find in a textbook. This app prepares you for the real thing — so you arrive ready, not lost.
        </p>

        <Link
          to="/modules"
          className="inline-flex items-center gap-2.5 bg-coral hover:bg-coral-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:gap-4 shadow-lg shadow-coral/30"
        >
          Start studying now <ArrowRight size={20} />
        </Link>

        <p className="text-white/30 text-sm mt-4">No credit card needed — first module is completely free</p>
      </section>

      {/* APP SCREENSHOTS */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
          {[
            { src: '/IMG_20260322_212116.jpg', label: 'Your lessons' },
            { src: '/IMG_20260322_212050.jpg', label: 'Flashcard practice' },
            { src: '/IMG_20260322_212033.jpg', label: 'This or That quiz' },
          ].map((screen) => (
            <div key={screen.label} className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.04]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="flex-1 mx-3 bg-white/[0.07] rounded-md px-3 py-1 text-[10px] text-white/30 font-mono tracking-wide truncate">
                    chileanspanish.app
                  </div>
                </div>
                <img
                  src={screen.src}
                  alt={screen.label}
                  className="w-full h-auto block"
                />
              </div>
              <p className="text-white/40 text-sm font-medium tracking-wide text-center">{screen.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="bg-white/5 border-y border-white/10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">Why this exists</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Chilean Spanish is a world of its own
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { stat: 'Lightning fast', detail: 'Chileans speak faster than almost any other Spanish dialect' },
              { stat: 'Syllables swallowed', detail: '"¿Cómo estái?" instead of "¿Cómo estás?" — and that\'s just the start' },
              { stat: 'Local slang', detail: 'Po, cachai, al tiro — words you won\'t find in any textbook' },
            ].map((item) => (
              <div key={item.stat} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="font-display text-xl font-bold text-teal mb-2">{item.stat}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-coral/10 to-teal/10 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              A phrase book won't save you — <span className="text-white font-semibold">you need to hear it to understand it.</span> This app gives you the exact phrases travelers need, spoken by a real Chilean, so you land with confidence and leave with stories.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">Who it's for</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Made for travelers, not linguists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: <Plane size={20} className="text-teal" />,
              title: 'First-time visitors',
              desc: 'No Spanish background? Perfect. We start from zero and get you to confident fast.',
            },
            {
              icon: <BookOpen size={20} className="text-gold" />,
              title: 'Spanish learners',
              desc: 'You know Spanish but Chileans leave you baffled. These lessons bridge that exact gap.',
            },
            {
              icon: <MessageCircle size={20} className="text-coral" />,
              title: 'Frequent travelers',
              desc: 'You visit Chile for work or love. Time to stop relying on Google Translate.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="bg-white/5 border-y border-white/10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">What you'll learn</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              5 modules, real-life situations
            </h2>
          </div>

          <div className="space-y-3">
            {MODULES.map((mod, i) => (
              <div key={mod.title} className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 flex-shrink-0">
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/30 font-medium mb-0.5">Module {i + 1}</p>
                  <h3 className="font-semibold text-white text-base">{mod.title}</h3>
                  <p className="text-white/40 text-sm">{mod.desc}</p>
                </div>
                {i === 0 && (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full flex-shrink-0">
                    Free
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/modules"
              className="inline-flex items-center gap-2.5 bg-coral hover:bg-coral-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:gap-4 shadow-lg shadow-coral/30"
            >
              Start studying now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT RESULTS THEY'LL GET */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">What you'll walk away with</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Real results, not a vocabulary list
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Navigate Santiago's airport without panic",
            "Tell a taxi driver exactly where you're going",
            'Order confidently at any restaurant or café',
            'Handle payments and shopping like a local',
            'Understand Chileans when they speak — not just read',
            'Have small talk with locals and actually enjoy it',
          ].map((result) => (
            <div key={result} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
              <CheckCircle2 size={18} className="text-teal flex-shrink-0 mt-0.5" />
              <p className="text-white/80 text-sm leading-relaxed">{result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white/5 border-y border-white/10 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">How it works</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Designed for busy travelers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: <Volume2 size={22} className="text-teal" />,
                title: 'Native Chilean audio',
                desc: 'Every phrase recorded by a real Chilean speaker — not a robot, not a generic Latin American accent.',
              },
              {
                icon: <BookOpen size={22} className="text-gold" />,
                title: 'Short, focused lessons',
                desc: 'Each lesson takes 5–10 minutes. Learn at the gate, on the plane, or in the hotel.',
              },
              {
                icon: <Star size={22} className="text-coral" />,
                title: 'Flashcard mastery',
                desc: "Review phrases until they stick. Mark what you know, practice what you don't.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white/5 border-y border-white/10 py-20">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            One price, forever yours
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="font-display text-6xl font-bold text-white">$19</span>
              <div className="text-left">
                <p className="text-white/40 text-sm line-through">$49</p>
                <span className="text-xs font-bold bg-coral text-white px-2 py-0.5 rounded-full">60% off</span>
              </div>
            </div>
            <p className="text-white/40 text-sm mb-8">One-time payment — no subscription, ever</p>

            <ul className="space-y-3 mb-8 text-left">
              {[
                'All 5 modules unlocked',
                'Full lesson library (28 lessons)',
                'All flashcard sets (298 phrases)',
                'Native Chilean audio throughout',
                'Lifetime access — including future modules',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/upgrade"
              className="block w-full py-4 rounded-xl bg-coral hover:bg-coral-dark text-white font-bold text-base transition-colors"
            >
              Get full access — $19
            </Link>

            <p className="text-white/30 text-xs mt-4">Try the first module free, no credit card needed</p>
          </div>
        </div>
      </section>

      {/* ABOUT IRINA */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/10 flex-shrink-0 shadow-xl">
            <img
              src="/20000101000140_IMG_0882_copy.JPG"
              alt="Irina Kincherova"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-3">About the creator</p>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Irina Kincherova</h2>
            <p className="text-muted text-sm font-medium mb-4">Language Teacher · Living in Chile for 10+ years</p>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              Irina is an experienced language teacher who has been living in Chile for over a decade. She knows how difficult it can be to understand locals — the Chilean accent is very different from other Spanish accents, and even fluent Spanish speakers can feel completely lost talking to Chileans.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              That's why she created this app — so that foreigners visiting this beautiful country have the real opportunity to communicate with locals and truly understand them.
            </p>
            <a
              href="mailto:kincherova@gmail.com"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
            >
              <Mail size={15} />
              Contact Irina
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1a3a5c] py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#d52b1e] text-sm font-semibold uppercase tracking-widest mb-4">Free to start</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
            Your trip to Chile starts here
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            It's time to get ready for your Chilean adventure.
          </p>
          <Link
            to="/modules"
            className="inline-flex items-center gap-2.5 bg-[#d52b1e] hover:bg-[#b82419] text-white font-bold px-10 py-4 rounded-full text-lg transition-all hover:gap-4 shadow-xl"
          >
            Start studying now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center">
        <Link to="/" className="font-display font-bold text-white/70 hover:text-white transition-colors text-sm">
          Survival Chilean Spanish
        </Link>
        <p className="text-white/20 text-xs mt-2">
          © {new Date().getFullYear()} · Built by humans for humans
        </p>
      </footer>
    </div>
  );
}
