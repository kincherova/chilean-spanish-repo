import { Volume2 } from 'lucide-react';
import { IntroPage } from '../../types/database';

export default function IntroPageView({ page }: { page: IntroPage }) {
  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(() => {});
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy mb-1">{page.title}</h1>
      {page.subtitle && <p className="text-muted text-sm mb-5">{page.subtitle}</p>}

      <div className="space-y-3">
        {page.phrases.map((phrase, i) => (
          <div key={i} className="bg-white rounded-card-lg p-4 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-navy text-base">{phrase.spanish}</p>
                {phrase.isChilean && (
                  <span className="text-sm" title="Chilean expression">🇨🇱</span>
                )}
              </div>
              <p className="text-muted text-sm">{phrase.english}</p>
              {phrase.reply && (
                <p className="text-xs text-muted/70 mt-1 italic">Reply: {phrase.reply}</p>
              )}
            </div>
            {phrase.audioUrl && (
              <button
                onClick={() => playAudio(phrase.audioUrl!)}
                className="p-2 bg-coral/10 hover:bg-coral/20 rounded-full text-coral transition-colors flex-shrink-0"
              >
                <Volume2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
