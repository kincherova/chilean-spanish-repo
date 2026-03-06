import { useState } from 'react';
import { Eye } from 'lucide-react';
import { DialoguePracticePage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  page: DialoguePracticePage;
  fontSize: FontSize;
}

export default function DialoguePracticeView({ page, fontSize }: Props) {
  const [revealed, setReveal] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setReveal((r) => ({ ...r, [i]: !r[i] }));

  return (
    <div>
      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      {page.subtitle && <p className={`text-muted mb-5 ${fs.bodySmall(fontSize)}`}>{page.subtitle}</p>}

      <div className="space-y-3">
        {page.dialogue?.map((line, i) => {
          const isLocal = line.speaker === 'local';
          const isWaiter = line.speaker === 'waiter';
          const isTourist = !isLocal && !isWaiter;
          const isRight = isTourist;
          const isHidden = isTourist && !revealed[i];

          return (
            <div key={i} className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
              {isHidden ? (
                <button
                  onClick={() => toggle(i)}
                  className="max-w-[80%] rounded-card-lg px-4 py-3 bg-green-100 border-2 border-dashed border-green-300 flex items-center gap-2 text-green-700 hover:bg-green-200 transition-colors"
                >
                  <Eye size={15} className="flex-shrink-0" />
                  <span className={`font-medium ${fs.body(fontSize)}`}>Tap to see your reply</span>
                </button>
              ) : (
                <button
                  onClick={() => isTourist && toggle(i)}
                  className={`max-w-[80%] rounded-card-lg px-4 py-3 text-left transition-colors ${
                    isLocal
                      ? 'bg-navy text-white cursor-default'
                      : isWaiter
                      ? 'bg-teal/20 text-navy cursor-default'
                      : 'bg-green-100 text-navy hover:bg-green-200 cursor-pointer'
                  }`}
                >
                  {line.name && (
                    <p className={`font-semibold mb-1 ${fs.label(fontSize)} ${isLocal ? 'text-white/60' : isWaiter ? 'text-teal' : 'text-green-600'}`}>
                      {line.name}
                    </p>
                  )}
                  <p className={`font-medium ${fs.body(fontSize)} ${isLocal ? 'text-white' : 'text-navy'}`}>{line.spanish}</p>
                  {line.english && (
                    <p className={`mt-1 italic ${fs.label(fontSize)} ${isLocal ? 'text-white/60' : 'text-muted'}`}>{line.english}</p>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
