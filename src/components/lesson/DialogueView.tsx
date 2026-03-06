import { DialoguePage } from '../../types/database';

export default function DialogueView({ page }: { page: DialoguePage }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy mb-1">{page.title}</h1>
      {page.subtitle && <p className="text-muted text-sm mb-5">{page.subtitle}</p>}

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
                'bg-coral/15 text-navy'
              }`}>
                {line.name && (
                  <p className={`text-xs font-semibold mb-1 ${isLocal ? 'text-white/60' : isWaiter ? 'text-teal' : 'text-coral'}`}>
                    {line.name}
                  </p>
                )}
                <p className={`text-sm font-medium ${isLocal ? 'text-white' : 'text-navy'}`}>{line.spanish}</p>
                {line.english && (
                  <p className={`text-xs mt-1 italic ${isLocal ? 'text-white/60' : 'text-muted'}`}>{line.english}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
