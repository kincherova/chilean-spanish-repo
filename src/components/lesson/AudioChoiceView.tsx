import { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, ChevronRight, Play, SkipForward } from 'lucide-react';
import { AudioChoicePage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';
import { playAudio as playSharedAudio, stopAudio } from '../../lib/audio';

interface Props {
  page: AudioChoicePage;
  fontSize: FontSize;
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
}

export default function AudioChoiceView({ page, fontSize, onCorrect, onWrong, onNext }: Props) {
  const [currentItem, setCurrentItem] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<Set<number>>(new Set());
  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showBravo, setShowBravo] = useState(false);

  const item = page.items[currentItem];

  const playAudio = () => {
    if (!item.audioUrl) return;
    setPlaying(true);
    playSharedAudio(item.audioUrl, () => setPlaying(false));
  };

  const advanceItem = () => {
    stopAudio();
    if (currentItem < page.items.length - 1) {
      setCurrentItem((i) => i + 1);
      setWrongGuesses(new Set());
      setCorrectlyAnswered(false);
      setPlaying(false);
    } else {
      setDone(true);
    }
  };

  const handleSelect = (idx: number) => {
    if (correctlyAnswered || wrongGuesses.has(idx)) return;
    if (idx === item.correctAnswer) {
      setCorrectlyAnswered(true);
      setShowBravo(true);
      onCorrect();
    } else {
      setWrongGuesses((prev) => new Set(prev).add(idx));
      onWrong();
    }
  };

  useEffect(() => {
    if (!showBravo) return;
    const timer = setTimeout(() => {
      setShowBravo(false);
      advanceItem();
    }, 1000);
    return () => clearTimeout(timer);
  }, [showBravo]);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 size={48} className="text-green-500 mb-4" />
        <h2 className="font-display text-2xl font-bold text-navy mb-2">Section complete!</h2>
        <p className="text-muted mb-6">Continue to the next part.</p>
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
        >
          Next exercise <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {showBravo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-500 text-white font-bold text-2xl px-8 py-4 rounded-2xl shadow-2xl animate-bounce">
            ¡Muy bien!
          </div>
        </div>
      )}

      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      <p className={`text-muted mb-6 ${fs.bodySmall(fontSize)}`}>{currentItem + 1} / {page.items.length}</p>

      <div className="flex flex-col items-center py-8 mb-6">
        <button
          onClick={playAudio}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md ${
            playing ? 'bg-coral/20 border-4 border-coral scale-95' : 'bg-coral hover:bg-coral-dark'
          }`}
        >
          {playing ? (
            <Volume2 size={30} className="text-coral animate-pulse" />
          ) : (
            <Play size={30} className="text-white ml-1" />
          )}
        </button>
        <p className={`text-muted mt-3 ${fs.bodySmall(fontSize)}`}>{item.question}</p>
      </div>

      <div className="space-y-2 mb-4">
        {item.options.map((opt, idx) => {
          const isWrong = wrongGuesses.has(idx);
          const isCorrect = correctlyAnswered && idx === item.correctAnswer;
          const isDisabled = isWrong || correctlyAnswered;

          let cls = 'border-gray-200 bg-white hover:border-coral/40 hover:bg-coral/5';
          if (isCorrect) cls = 'border-green-400 bg-green-50';
          else if (isWrong) cls = 'border-red-400 bg-red-50 opacity-70';
          else if (correctlyAnswered) cls = 'border-gray-100 bg-white opacity-50';

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-card border-2 text-left transition-all ${cls}`}
            >
              <span className={`font-medium text-navy ${fs.bodySmall(fontSize)}`}>{opt}</span>
              {isCorrect && <CheckCircle2 size={16} className="text-green-500 shrink-0" />}
              {isWrong && <XCircle size={16} className="text-red-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <button
          onClick={advanceItem}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white hover:bg-gray-50 text-muted font-medium rounded-card transition-colors text-sm"
        >
          <SkipForward size={15} />
          Skip this question
        </button>

        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white hover:bg-gray-50 text-muted font-medium rounded-card transition-colors text-sm"
        >
          <ChevronRight size={15} />
          Go to the next exercise
        </button>
      </div>
    </div>
  );
}
