import { Volume2 } from 'lucide-react';
import { IntroPage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  page: IntroPage;
  fontSize: FontSize;
}

export default function IntroPageView({ page, fontSize }: Props) {
  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(() => {});
  };

  return (
    <div>
      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      {page.subtitle && <p className={`text-muted mb-5 ${fs.bodySmall(fontSize)}`}>{page.subtitle}</p>}

      <div className="space-y-3">
        {page.phrases.map((phrase, i) => (
          <div key={i} className="bg-white rounded-card-lg p-4 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className={`font-semibold text-navy ${fs.body(fontSize)}`}>{phrase.spanish}</p>
                {phrase.isChilean && (
                  <span className="text-sm" title="Chilean expression">🇨🇱</span>
                )}
              </div>
              <p className={`text-muted ${fs.bodySmall(fontSize)}`}>{phrase.english}</p>
              {phrase.reply && (
                <p className={`text-muted/70 mt-1 italic ${fs.label(fontSize)}`}>Reply: {phrase.reply}</p>
              )}
            </div>
            {phrase.audioUrl && (
              <button
                onClick={() => playAudio(phrase.audioUrl!)}
                className="p-2 bg-green-100 hover:bg-green-200 rounded-full text-green-600 transition-colors flex-shrink-0"
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
