import { useState, useEffect } from 'react';
import { Volume2, Copy, Check } from 'lucide-react';
import { IntroPage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';
import { playAudio, preloadAudio } from '../../lib/audio';

interface Props {
  page: IntroPage;
  fontSize: FontSize;
}

export default function IntroPageView({ page, fontSize }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    page.phrases.forEach((phrase) => {
      if (phrase.audioUrl) preloadAudio(phrase.audioUrl);
    });
  }, [page.phrases]);

  const handlePlay = (idx: number, url: string) => {
    setActiveIdx(idx);
    playAudio(url, () => setActiveIdx((prev) => (prev === idx ? null : prev)));
  };

  const handleCopy = async () => {
    const text = page.phrases
      .map((p) => {
        let line = `${p.spanish} — ${p.english}`;
        if (p.reply) line += ` (Reply: ${p.reply})`;
        return line;
      })
      .join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="relative">
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy text-white text-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-2.5 animate-fade-in max-w-xs text-center">
          <Check size={15} className="text-green-400 flex-shrink-0" />
          <span>List copied! You may paste it in your notes to use offline.</span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-1">
        <h1 className={`font-display font-bold text-navy ${fs.heading(fontSize)}`}>{page.title}</h1>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 mt-0.5 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy list'}
        </button>
      </div>
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
