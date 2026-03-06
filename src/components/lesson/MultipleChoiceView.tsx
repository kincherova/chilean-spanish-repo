import { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { MultipleChoicePage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  page: MultipleChoicePage;
  fontSize: FontSize;
  onCorrect: () => void;
  onWrong: () => void;
}

export default function MultipleChoiceView({ page, fontSize, onCorrect, onWrong }: Props) {
  const [currentItem, setCurrentItem] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const item = page.items[currentItem];

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(() => {});
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === item.correctAnswer) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const handleNext = () => {
    if (currentItem < page.items.length - 1) {
      setCurrentItem((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 size={48} className="text-green-500 mb-4" />
        <h2 className="font-display text-2xl font-bold text-navy mb-2">Section complete!</h2>
        <p className="text-muted">Continue to the next part.</p>
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

      <div className="space-y-2 mb-5">
        {item.options.map((opt, idx) => {
          let cls = 'border-gray-200 bg-white hover:border-coral/40 hover:bg-coral/5';
          if (answered) {
            if (idx === item.correctAnswer) cls = 'border-green-400 bg-green-50';
            else if (idx === selected) cls = 'border-red-400 bg-red-50';
            else cls = 'border-gray-100 bg-white opacity-50';
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-card border-2 text-left transition-all ${cls}`}
            >
              <span className={`font-medium text-navy ${fs.bodySmall(fontSize)}`}>{opt}</span>
              {answered && idx === item.correctAnswer && <CheckCircle2 size={16} className="text-green-500" />}
              {answered && idx === selected && idx !== item.correctAnswer && <XCircle size={16} className="text-red-400" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
        >
          {currentItem < page.items.length - 1 ? 'Next question' : 'Continue'}
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
