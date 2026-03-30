import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DialoguePage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  page: DialoguePage;
  fontSize: FontSize;
}

export default function DialogueView({ page, fontSize }: Props) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const text = (page.dialogue ?? [])
      .map((line) => {
        const prefix = line.name ? `${line.name}: ` : '';
        return `${prefix}${line.spanish}${line.english ? ` — ${line.english}` : ''}`;
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
          <span>Dialogue copied! You may paste it in your notes to use offline.</span>
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
          {copied ? 'Copied!' : 'Copy dialogue'}
        </button>
      </div>
      {page.subtitle && <p className={`text-muted mb-5 ${fs.bodySmall(fontSize)}`}>{page.subtitle}</p>}

      <div className="space-y-3">
        {page.dialogue?.map((line, i) => {
          const isLocal = line.speaker === 'local';
          const isWaiter = line.speaker === 'waiter';
          const isTourist = !isLocal && !isWaiter;
          const isRight = isTourist;

          return (
            <div key={i} className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-card-lg px-4 py-3 ${
                isLocal ? 'bg-navy text-white' :
                isWaiter ? 'bg-teal/20 text-navy' :
                'bg-green-100 text-navy'
              }`}>
                {line.name && (
                  <p className={`font-semibold mb-1 ${fs.label(fontSize)} ${isLocal ? 'text-white/60' : isWaiter ? 'text-teal' : 'text-green-600'}`}>
                    {line.name}
                  </p>
                )}
                <p className={`font-medium ${fs.body(fontSize)} ${isLocal ? 'text-white' : 'text-navy'}`}>{line.spanish}</p>
                {line.english && !isTourist && (
                  <p className={`mt-1 italic ${fs.label(fontSize)} ${isLocal ? 'text-white/60' : 'text-muted'}`}>{line.english}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
