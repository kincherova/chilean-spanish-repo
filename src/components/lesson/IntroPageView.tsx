import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { IntroPage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';
import { playAudio, preloadAudio } from '../../lib/audio';

interface Props {
  page: IntroPage;
  fontSize: FontSize;
}

export default function IntroPageView({ page, fontSize }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    page.phrases.forEach((phrase) => {
      if (phrase.audioUrl) preloadAudio(phrase.audioUrl);
    });
  }, [page.phrases]);

  const handlePlay = (idx: number, url: string) => {
    setActiveIdx(idx);
    playAudio(url, () => setActiveIdx((prev) => (prev === idx ? null : prev)));
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
                onClick={() => handlePlay(i, phrase.audioUrl!)}
                className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                  activeIdx === i
                    ? 'bg-green-700 text-white'
                    : 'bg-green-100 hover:bg-green-200 text-green-600'
                }`}
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
