import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Plane,
  Volume2,
  MessageCircle,
  BookOpen,
  CheckCircle2,
  Star,
  MapPin,
  Utensils,
  ShoppingBag,
  Car,
  Mail,
} from 'lucide-react';


const MODULES = [
  { icon: <Plane size={18} />, title: 'At the Airport', desc: 'Customs, immigration, asking for help' },
  { icon: <Car size={18} />, title: 'Taxis & Uber', desc: 'Give directions, ask prices, small talk' },
  { icon: <Utensils size={18} />, title: 'Cafes & Restaurants', desc: 'Order food, ask the bill, compliment the chef' },
  { icon: <ShoppingBag size={18} />, title: 'Shops & Markets', desc: 'Bargain, ask for sizes, pay correctly' },
  { icon: <MessageCircle size={18} />, title: 'Polite Conversation', desc: 'Greet locals, make friends, sound natural' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    flag: '🇺🇸',
    text: 'I was terrified of landing in Santiago not understanding a word. This app changed everything — even the taxi driver was impressed!',
  },
  {
    name: 'James T.',
    flag: '🇬🇧',
    text: 'Chilean Spanish is nothing like what I learned in school. The audio lessons with a real Chilean speaker are exactly what I needed.',
  },
  {
    name: 'Anna K.',
    flag: '🇩🇪',
    text: 'Finished the course on the flight over. Ordered my first meal in Spanish on day one. Worth every cent.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy text-white font-body">

      {/* NAV */}
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg text-white tracking-tight">
          Survival Chilean Spanish
        </Link>
        <Link
          to="/modules"
          className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
        >
          Open app
        </Link>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <MapPin size={13} className="text-coral" />
          <span className="text-white/80 text-sm font-medium">Built for travelers to Chile</span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Don't get lost in<br />
          <span className="text-coral">Chilean Spanish</span>
        </h1>

        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Chilean Spanish is unlike any other. Locals speak fast, drop letters, and use slang you won't find in a textbook. This app teaches you exactly what you need — in short lessons you can finish before your flight lands.
        </p>

        <Link
          to="/modules"
          className="inline-flex items-center gap-2.5 bg-coral hover:bg-coral-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:gap-4 shadow-lg shadow-coral/30"
        >
          Try it right now for free <ArrowRight size={20} />
        </Link>

        <p className="text-white/30 text-sm mt-4">No credit card needed — first module is completely free</p>
      </section>

      {/* APP SCREENSHOTS — mockup cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: 'Your lessons',
              bg: 'bg-warm-bg',
              content: (
                <div className="p-4 space-y-3">
                  <div className="h-5 w-1/2 bg-navy/10 rounded-full" />
                  {['Airport Arrival', 'Taking a Taxi', 'At a Restaurant', 'Shopping'].map((t, i) => (
                    <div key={t} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-warm-bg flex items-center justify-center text-sm">
                        {['✈️','🚕','🍽️','🛍️'][i]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="h-3 w-20 bg-navy/20 rounded-full mb-1.5" />
                        <div className="h-2 w-14 bg-navy/10 rounded-full" />
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                    </div>
                  ))}
                </div>
              ),
            },
            {
              label: 'Phrase lessons with audio',
              bg: 'bg-navy',
              content: (
                <div className="p-4 space-y-3">
                  <div className="text-xs text-white/40 font-medium uppercase tracking-widest mb-2">Phrase 2 of 6</div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-white font-bold text-xl mb-1">¿Me puede llevar a...?</p>
                    <p className="text-white/50 text-sm">Can you take me to...?</p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-teal/20 border border-teal/30 text-teal rounded-xl py-3 text-sm font-semibold">
                    <Volume2 size={16} /> Play audio
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    {['¿Correcto?','Necesito ayuda'].map((p) => (
                      <div key={p} className="bg-white/5 rounded-lg p-2.5 text-center text-white/60 text-xs">{p}</div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              label: 'Flashcard practice',
              bg: 'bg-warm-bg',
              content: (
                <div className="p-4">
                  <div className="text-xs text-muted font-medium mb-3 text-center">Tap to reveal translation</div>
                  <div className="bg-white rounded-2xl shadow-md p-6 text-center mb-3">
                    <p className="text-navy font-bold text-2xl mb-1">La cuenta, por favor</p>
                    <div className="h-px bg-gray-100 my-3" />
                    <p className="text-muted text-sm">The bill, please</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-2.5 text-center text-xs font-semibold text-red-600">Practice more</div>
                    <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-2.5 text-center text-xs font-semibold text-green-700">Mastered!</div>
                  </div>
                </div>
              ),
            },
          ].map((screen) => (
            <div key={screen.label} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="px-4 pt-3 pb-1 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <span className="text-xs text-white/30 font-medium">{screen.label}</span>
              </div>
              <div className={screen.bg}>
                {screen.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="bg-white/5 border-y border-white/10 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">Why this exists</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Chilean Spanish is a world of its own
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            Even fluent Spanish speakers are humbled by Chile. Chileans speak at lightning speed, swallow syllables, and pepper every sentence with local slang. A phrase book won't save you — you need to hear it to understand it.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            This app was built for one purpose: to give travelers the exact phrases they need, spoken by a real Chilean, so they can land with confidence and leave with stories — not frustration.
          </p>
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

      {/* SOCIAL PROOF */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-coral font-semibold text-sm uppercase tracking-widest mb-4">Travelers love it</p>
          <h2 className="font-display text-4xl font-bold text-white">
            From the community
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{t.flag}</span>
                <span className="text-white/50 text-sm font-medium">{t.name}</span>
              </div>
            </div>
          ))}
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
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <Mail size={15} />
              kincherova@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-coral py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
            Your trip to Chile starts here
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Start for free today. The first module is on us — no account needed, no credit card, no pressure.
          </p>
          <Link
            to="/modules"
            className="inline-flex items-center gap-2.5 bg-white text-coral font-bold px-10 py-4 rounded-full text-lg transition-all hover:bg-cream hover:gap-4 shadow-xl"
          >
            Try it right now for free <ArrowRight size={20} />
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
