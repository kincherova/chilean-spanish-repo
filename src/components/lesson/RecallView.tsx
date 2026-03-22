import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, ChevronRight, SkipForward, AlertCircle } from 'lucide-react';
import { RecallPage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';
import { useAuth } from '../../contexts/AuthContext';

const ACCENT_MAP: Record<string, string> = {
  'n': 'ñ',
  'a': 'á',
  'e': 'é',
  'i': 'í',
  'o': 'ó',
  'u': 'ú',
};

const SPECIAL_CHAR_WORDS: Record<string, string[]> = {
  'bano':           ['baño',          'ñ is not the same as n'],
  'cafe':           ['café',          'é is not the same as e'],
  'azucar':         ['azúcar',        'ú is not the same as u'],
  'acompanamiento': ['Acompañamiento','ñ is not the same as n'],
  'jamon':          ['Jamón',         'ó is not the same as o'],
  'sandwich':       ['Sándwich',      'á is not the same as a'],
  'credito':        ['Crédito',       'é is not the same as e'],
};

function getAccentWarning(input: string, correct: string): string | null {
  const normInput = input.trim().toLowerCase();
  const normCorrect = correct.trim().toLowerCase();

  const stripped = normCorrect
    .replace(/ñ/g, 'n')
    .replace(/[áàä]/g, 'a')
    .replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i')
    .replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u');

  if (normInput !== stripped) return null;

  const entry = SPECIAL_CHAR_WORDS[stripped];
  if (!entry) return null;

  for (const [plain, special] of Object.entries(ACCENT_MAP)) {
    if (normCorrect.includes(special) && normInput.includes(plain) && !normInput.includes(special)) {
      return `Heads up: "${special}" is not the same as "${plain}" — make sure to write it correctly next time!`;
    }
  }
  return null;
}

interface Props {
  page: RecallPage;
  fontSize: FontSize;
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
}

type ItemState = 'idle' | 'try2' | 'revealed' | 'correct' | 'skipped';

export default function RecallView({ page, fontSize, onCorrect, onWrong, onNext }: Props) {
  const { user } = useAuth();
  const userName = user?.user_metadata?.name?.split(' ')[0] ?? '';

  const [currentItem, setCurrentItem] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [itemState, setItemState] = useState<ItemState>('idle');
  const [done, setDone] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [accentWarning, setAccentWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const item = page.items[currentItem];

  useEffect(() => {
    if (itemState === 'idle' || itemState === 'try2') {
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
    setShowCorrect(false);
    setAccentWarning(null);
    if (currentItem < page.items.length - 1) {
      setCurrentItem((i) => i + 1);
    } else {
      setDone(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (itemState !== 'idle' && itemState !== 'try2') return;
    const val = e.target.value;
    setInputValue(val);

    if (isAccepted(val, item.spanish)) {
      setItemState('correct');
      onCorrect();
      setTimeout(() => advance(), 800);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemState === 'correct') return;

    if (itemState === 'revealed' || itemState === 'skipped') {
      advance();
      return;
    }

    if (!inputValue.trim()) return;

    if (itemState === 'idle') {
      const warning = getAccentWarning(inputValue, item.spanish);
      setAccentWarning(warning);
      setItemState('try2');
      setInputValue('');
      onWrong();
    } else if (itemState === 'try2') {
      const warning = getAccentWarning(inputValue, item.spanish);
      setAccentWarning(warning);
      setItemState('revealed');
      setShowCorrect(true);
      onWrong();
    }
  };

  const handleSkip = () => {
    if (itemState === 'revealed' || itemState === 'skipped') {
      advance();
      return;
    }
    setItemState('skipped');
    setShowCorrect(true);
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

  const isFinished = itemState === 'revealed' || itemState === 'skipped';
  const isTyping = itemState === 'idle' || itemState === 'try2';

  let inputBorderClass = 'border-gray-200 bg-white focus:border-coral/60';
  if (itemState === 'correct') inputBorderClass = 'border-green-400 bg-green-50';
  else if (isFinished) inputBorderClass = 'border-red-300 bg-red-50';
  else if (itemState === 'try2') inputBorderClass = 'border-amber-300 bg-amber-50';

  return (
    <div>
      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      <p className={`text-muted mb-1 ${fs.bodySmall(fontSize)}`}>Type the Spanish word from memory.</p>
      <p className={`text-muted/60 mb-6 ${fs.label(fontSize)}`}>{currentItem + 1} / {page.items.length}</p>

      <div className="bg-white rounded-card-lg p-5 mb-5">
        <p className={`text-muted mb-1 ${fs.label(fontSize)}`}>How do you say this in Spanish?</p>
        <p className={`font-display font-bold text-navy ${fs.heading(fontSize)}`}>{item.english}</p>
      </div>

      {itemState === 'try2' && !accentWarning && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-card mb-3">
          <span className={`text-amber-700 font-medium ${fs.label(fontSize)}`}>Not quite — try once more!</span>
        </div>
      )}

      {accentWarning && (itemState === 'try2' || isFinished) && (
        <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-card mb-3">
          <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className={`text-amber-800 font-semibold ${fs.label(fontSize)}`}>
              {itemState === 'try2' ? 'Not quite — try once more!' : 'Incorrect'}
            </p>
            <p className={`text-amber-700 ${fs.label(fontSize)}`}>{accentWarning}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative mb-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            disabled={!isTyping}
            placeholder={itemState === 'try2' ? 'Try again…' : 'Type in Spanish…'}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className={`w-full px-4 py-3.5 rounded-card border-2 text-navy font-medium outline-none transition-all ${fs.body(fontSize)} ${inputBorderClass}`}
          />
          {itemState === 'correct' && (
            <CheckCircle2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
          )}
          {isFinished && (
            <XCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
          )}
        </div>

        {isTyping && (
          <div className="flex gap-2 mb-3">
            {['á', 'é', 'ñ', 'ó', 'ú'].map((char) => (
              <button
                key={char}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const input = inputRef.current;
                  if (!input) return;
                  const start = input.selectionStart ?? inputValue.length;
                  const end = input.selectionEnd ?? inputValue.length;
                  const next = inputValue.slice(0, start) + char + inputValue.slice(end);
                  setInputValue(next);
                  requestAnimationFrame(() => {
                    input.focus();
                    input.setSelectionRange(start + 1, start + 1);
                  });
                }}
                className={`flex-1 py-2.5 rounded-card border-2 border-navy/20 bg-white text-navy font-semibold hover:bg-navy/5 hover:border-navy/40 active:bg-navy/10 transition-colors ${fs.body(fontSize)}`}
              >
                {char}
              </button>
            ))}
          </div>
        )}

        {showCorrect && (
          <div className="flex items-center gap-2 px-4 py-3 bg-navy/5 rounded-card mb-3">
            <span className={`text-muted ${fs.label(fontSize)}`}>Correct answer:</span>
            <span className={`font-display font-bold text-navy ${fs.body(fontSize)}`}>{item.spanish}</span>
          </div>
        )}

        {isTyping && (
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors disabled:opacity-50"
          >
            {itemState === 'try2' ? 'Check again' : 'Check'}
          </button>
        )}

        {isFinished && (
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
          >
            Continue <ChevronRight size={18} />
          </button>
        )}
      </form>

      {isTyping && (
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
