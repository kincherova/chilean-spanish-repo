import { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ChevronRight, SkipForward } from 'lucide-react';
import { MultipleChoicePage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  page: MultipleChoicePage;
  fontSize: FontSize;
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
}

export default function MultipleChoiceView({ page, fontSize, onCorrect, onWrong, onNext }: Props) {
  const [currentItem, setCurrentItem] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<Set<number>>(new Set());
  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const item = page.items[currentItem];

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(() => {});
  };

  const handleSelect = (idx: number) => {
    if (correctlyAnswered || wrongGuesses.has(idx)) return;
    if (idx === item.correctAnswer) {
      setCorrectlyAnswered(true);
      onCorrect();
    } else {
      setWrongGuesses((prev) => new Set(prev).add(idx));
      onWrong();
    }
  };

  const handleNext = () => {
    if (currentItem < page.items.length - 1) {
      setCurrentItem((i) => i + 1);
      setWrongGuesses(new Set());
      setCorrectlyAnswered(false);
    } else {
      setDone(true);
    }
  };

  const handleSkip = () => {
    if (currentItem < page.items.length - 1) {
      setCurrentItem((i) => i + 1);
      setWrongGuesses(new Set());
      setCorrectlyAnswered(false);
    } else {
      setDone(true);
    }
  };

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
    <div>
      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      <p className={`text-muted mb-6 ${fs.bodySmall(fontSize)}`}>{currentItem + 1} / {page.items.length}</p>

      <div className="bg-white rounded-card-lg p-5 mb-5">
        {item.phrase && (
          <div className="flex items-center justify-between mb-2">
            <p className={`font-display font-bold text-navy ${fs.heading(fontSize)}`}>{item.phrase}</p>
            {item.audioUrl && (
              <button
                onClick={() => playAudio(item.audioUrl!)}
                className="p-2 bg-coral/10 hover:bg-coral/20 rounded-full text-coral transition-colors"
              >
                <Volume2 size={16} />
              </button>
            )}
          </div>
        )}
        <p className={`text-muted ${fs.bodySmall(fontSize)}`}>{item.question}</p>
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
        {correctlyAnswered && (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
          >
            {currentItem < page.items.length - 1 ? 'Next question' : 'Continue'}
            <ChevronRight size={18} />
          </button>
        )}

        <button
          onClick={handleSkip}
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
