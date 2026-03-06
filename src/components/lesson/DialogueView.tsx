import { DialoguePage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  page: DialoguePage;
  fontSize: FontSize;
}

export default function DialogueView({ page, fontSize }: Props) {
  return (
    <div>
      <h1 className={`font-display font-bold text-navy mb-1 ${fs.heading(fontSize)}`}>{page.title}</h1>
      {page.subtitle && <p className={`text-muted mb-5 ${fs.bodySmall(fontSize)}`}>{page.subtitle}</p>}

      <div className="space-y-3">
        {page.dialogue?.map((line, i) => {
          const isLocal = line.speaker === 'local';
          const isWaiter = line.speaker === 'waiter';
          const isRight = !isLocal && !isWaiter;

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
                {line.english && (
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
