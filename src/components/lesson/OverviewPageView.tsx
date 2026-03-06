import { Target, Lightbulb } from 'lucide-react';
import { OverviewPage } from '../../types/database';

export default function OverviewPageView({ page }: { page: OverviewPage }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy mb-2">{page.title}</h1>
      </div>

      <div className="bg-coral/10 border border-coral/20 rounded-card-lg p-5 flex gap-3">
        <Target size={20} className="text-coral flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-navy text-sm mb-1">Goal</p>
          <p className="text-muted text-sm leading-relaxed">{page.goal}</p>
        </div>
      </div>

      {page.cultural_note && (
        <div className="bg-gold/10 border border-gold/20 rounded-card-lg p-5 flex gap-3">
          <Lightbulb size={20} className="text-gold flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-navy text-sm mb-1">Cultural note</p>
            <p className="text-muted text-sm leading-relaxed">{page.cultural_note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
