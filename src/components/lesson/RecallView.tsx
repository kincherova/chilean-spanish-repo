import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, ChevronRight, SkipForward } from 'lucide-react';
import { RecallPage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  page: RecallPage;
  fontSize: FontSize;
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
}

type ItemState = 'idle' | 'correct' | 'incorrect' | 'skipped';

export default function RecallView({ page, fontSize, onCorrect, onWrong, onNext }: Props) {
  const { user } = useAuth();
  const userName = user?.user_metadata?.name?.split(' ')[0] ?? '';

  const [currentItem, setCurrentItem] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [itemState, setItemState] = useState<ItemState>('idle');
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const item = page.items[currentItem];

  useEffect(() => {
    if (itemState === 'idle') {
      inputRef.current?.focus();
    }
  }, [currentItem, itemState]);

  const normalise = (s: string) => s.trim().toLowerCase();

  const isAccepted = (input: string, correct: string) => {
    const a = normalise(input);
    const b = normalise(correct);
    if (a === b) return true;
    const variants = b.split('/').map((v) => v.trim());
    return variants.some((v) => a === v);
  };

  const advance = () => {
    setInputValue('');
    setItemState('idle');
    if (currentItem < page.items.length - 1) {
      setCurrentItem((i) => i + 1);
    } else {
      setDone(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemState !== 'idle') {
      advance();
      return;
    }
    if (!inputValue.trim()) return;
    if (isAccepted(inputValue, item.spanish)) {
      setItemState('correct');
      onCorrect();
    } else {
      setItemState('incorrect');
      onWrong();
    }
  };

  const handleSkip = () => {
    if (itemState !== 'idle') {
      advance();
      return;
    }
    setItemState('skipped');
    onWrong();
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 size={48} className="text-green-500 mb-4" />
        <h2 className={`font-display font-bold text-navy mb-2 ${fs.heading(fontSize)}`}>
          ¡Muy bien{userName ? `, ${userName}` : ''}!
        </h2>
        <p className={`text-muted mb-6 ${fs.bodySmall(fontSize)}`}>Keep going!</p>
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
        >
          Next exercise <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  const isRevealed = itemState !== 'idle';

  return (
    <div>
      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      <p className={`text-muted mb-1 ${fs.bodySmall(fontSize)}`}>Type the Spanish word from memory.</p>
      <p className={`text-muted/60 mb-6 ${fs.label(fontSize)}`}>{currentItem + 1} / {page.items.length}</p>

      <div className="bg-white rounded-card-lg p-5 mb-5">
        <p className={`text-muted mb-1 ${fs.label(fontSize)}`}>How do you say this in Spanish?</p>
        <p className={`font-display font-bold text-navy ${fs.heading(fontSize)}`}>{item.english}</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative mb-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              if (itemState === 'idle') setInputValue(e.target.value);
            }}
            disabled={isRevealed}
            placeholder="Type in Spanish…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className={`w-full px-4 py-3.5 rounded-card border-2 text-navy font-medium outline-none transition-all ${fs.body(fontSize)} ${
              itemState === 'correct'
                ? 'border-green-400 bg-green-50'
                : itemState === 'incorrect' || itemState === 'skipped'
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200 bg-white focus:border-coral/60'
            }`}
          />
          {itemState === 'correct' && (
            <CheckCircle2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          )}
          {(itemState === 'incorrect' || itemState === 'skipped') && (
            <XCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
          )}
        </div>

        {(itemState === 'incorrect' || itemState === 'skipped') && (
          <div className="flex items-center gap-2 px-4 py-3 bg-navy/5 rounded-card mb-3">
            <span className={`text-muted ${fs.label(fontSize)}`}>Correct answer:</span>
            <span className={`font-display font-bold text-navy ${fs.body(fontSize)}`}>{item.spanish}</span>
          </div>
        )}

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-card transition-colors ${
            isRevealed
              ? 'bg-coral hover:bg-coral-dark text-white'
              : 'bg-coral hover:bg-coral-dark text-white disabled:opacity-50'
          }`}
          disabled={!isRevealed && !inputValue.trim()}
        >
          {isRevealed ? (
            <>Continue <ChevronRight size={18} /></>
          ) : (
            'Check'
          )}
        </button>
      </form>

      {!isRevealed && (
        <div className="space-y-2">
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
      )}
    </div>
  );
}
