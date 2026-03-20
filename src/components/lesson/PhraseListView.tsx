import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { PhraseListPage, Flashcard } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';
import { playAudio, preloadAudio } from '../../lib/audio';

interface Props {
  page: PhraseListPage;
  fontSize: FontSize;
  flashcards?: Flashcard[];
}

export default function PhraseListView({ page, fontSize, flashcards = [] }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const audioMap = new Map(flashcards.map((f) => [f.spanish_text.toLowerCase(), f.audio_url]));

  const getAudio = (phrase: { spanish: string; audioUrl?: string }) =>
    phrase.audioUrl || audioMap.get(phrase.spanish.toLowerCase()) || null;

  useEffect(() => {
    page.phrases.forEach((phrase) => {
      const url = getAudio(phrase);
      if (url) preloadAudio(url);
    });
  }, [page.phrases, flashcards]);

  const handlePlay = (idx: number, url: string) => {
    setActiveIdx(idx);
    playAudio(url, () => setActiveIdx((prev) => (prev === idx ? null : prev)));
  };

  return (
    <div>
      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      {page.subtitle && <p className={`text-muted mb-5 ${fs.bodySmall(fontSize)}`}>{page.subtitle}</p>}

      <div className="space-y-2.5">
        {page.phrases.map((phrase, i) => {
          const audioUrl = getAudio(phrase);
          return (
            <div key={i} className="bg-white rounded-card-lg p-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`font-semibold text-navy ${fs.body(fontSize)}`}>{phrase.spanish}</p>
                  {phrase.isChilean && (
                    <span className="text-sm" title="Chilean expression">🇨🇱</span>
                  )}
                </div>
                <p className={`text-muted ${fs.bodySmall(fontSize)}`}>{phrase.english}</p>
              </div>
              {audioUrl && (
                <button
                  onClick={() => handlePlay(i, audioUrl)}
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
          );
        })}
      </div>
    </div>
  );
}
