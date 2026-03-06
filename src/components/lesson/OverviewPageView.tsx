import { Target, Lightbulb } from 'lucide-react';
import { OverviewPage } from '../../types/database';
import { FontSize, fs } from './fontSizeClasses';

interface Props {
  page: OverviewPage;
  fontSize: FontSize;
}

export default function OverviewPageView({ page, fontSize }: Props) {
  return (
    <div className="space-y-5">
      <h1 className={`font-display font-bold text-navy mb-2 ${fs.heading(fontSize)}`}>{page.title}</h1>

      <div className="bg-green-50 border border-green-200 rounded-card-lg p-5 flex gap-3">
        <Target size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className={`font-semibold text-navy mb-1 ${fs.bodySmall(fontSize)}`}>Goal</p>
          <p className={`text-muted leading-relaxed ${fs.bodySmall(fontSize)}`}>{page.goal}</p>
        </div>
      </div>

      {page.cultural_note && (
        <div className="bg-gold/10 border border-gold/20 rounded-card-lg p-5 flex gap-3">
          <Lightbulb size={20} className="text-gold flex-shrink-0 mt-0.5" />
          <div>
            <p className={`font-semibold text-navy mb-1 ${fs.bodySmall(fontSize)}`}>Cultural note</p>
            <p className={`text-muted leading-relaxed ${fs.bodySmall(fontSize)}`}>{page.cultural_note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
