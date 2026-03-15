import { Mail } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function AboutIrinaPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back="/profile" title="About the Creator" />
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg ring-4 ring-white mb-5">
            <img
              src="/20000101000140_IMG_0882_copy.JPG"
              alt="Irina"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy text-center">Irina Kincherova</h1>
          <p className="text-muted text-sm mt-1">Language Teacher &amp; Creator</p>
        </div>

        <div className="bg-white rounded-card-lg p-6 mb-5 shadow-sm">
          <div className="w-8 h-1 rounded-full bg-coral mb-5" />
          <p className="text-navy text-[15px] leading-relaxed mb-4">
            Irina is an experienced language teacher who has been living in Chile for the past 10 years.
          </p>
          <p className="text-navy text-[15px] leading-relaxed mb-4">
            She knows how difficult it can be to understand locals — the Chilean accent is very different from other Spanish accents, and even those who have learned Spanish can feel completely lost when talking to Chileans.
          </p>
          <p className="text-navy text-[15px] leading-relaxed">
            That is why she created this app — so that foreigners who come to visit this beautiful country have the opportunity to communicate with locals and truly understand them.
          </p>
        </div>

        <a
          href="mailto:kincherova@gmail.com"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-coral hover:bg-coral-dark text-white font-semibold text-[15px] transition-colors shadow-sm active:scale-95"
        >
          <Mail size={18} />
          Contact Irina
        </a>
      </div>
    </div>
  );
}
