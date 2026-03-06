import { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Flashcard } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  flashcards: Flashcard[];
  unitId: string;
  fontSize: FontSize;
}

export default function FlashcardsView({ flashcards, fontSize }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = flashcards[currentIndex];

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(() => {});
  };

  if (flashcards.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted">No flashcards for this unit yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className={`font-display font-bold text-navy mb-6 ${fs.heading(fontSize)}`}>Test Your Memory</h1>

      <div className="flex items-center justify-between mb-3 text-xs text-muted">
        <span>{currentIndex + 1} / {flashcards.length}</span>
        <div className="flex gap-1">
          {flashcards.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setFlipped(false); }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-coral w-3' : 'bg-muted/30'}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full aspect-[3/2] mb-4"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className="absolute inset-0 bg-white rounded-card-lg shadow-sm flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className={`text-muted uppercase tracking-wider mb-4 ${fs.label(fontSize)}`}>Spanish</p>
            <p className={`font-display font-bold text-navy text-center ${fs.heading(fontSize)}`}>{card?.spanish_text}</p>
            {card?.audio_url && (
              <button
                onClick={(e) => { e.stopPropagation(); playAudio(card.audio_url!); }}
                className="mt-4 p-2 bg-green-100 hover:bg-green-200 rounded-full text-green-600 transition-colors"
              >
                <Volume2 size={16} />
              </button>
            )}
            <p className={`text-muted mt-3 ${fs.label(fontSize)}`}>Tap to reveal</p>
          </div>
          <div
            className="absolute inset-0 bg-navy rounded-card-lg shadow-sm flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className={`text-white/50 uppercase tracking-wider mb-4 ${fs.label(fontSize)}`}>English</p>
            <p className={`font-display font-bold text-white text-center ${fs.heading(fontSize)}`}>{card?.english_text}</p>
          </div>
        </div>
      </button>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => { setCurrentIndex((i) => Math.max(0, i - 1)); setFlipped(false); }}
          disabled={currentIndex === 0}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-white border border-gray-200 rounded-card text-navy text-sm font-medium transition-colors disabled:opacity-40"
        >
          <ChevronLeft size={15} /> Prev
        </button>
        <button
          onClick={() => { setCurrentIndex((i) => Math.min(flashcards.length - 1, i + 1)); setFlipped(false); }}
          disabled={currentIndex === flashcards.length - 1}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-coral hover:bg-coral-dark text-white rounded-card text-sm font-medium transition-colors disabled:opacity-40"
        >
          Next <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
