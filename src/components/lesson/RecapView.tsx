import { Star } from 'lucide-react';
import { RecapPage } from '../../types/database';
import { FontSize } from './fontSizeClasses';

interface Props {
  page: RecapPage;
  lessonTitle: string;
  fontSize: FontSize;
}

export default function RecapView({ page, lessonTitle, fontSize: _fontSize }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
        <Star size={28} className="text-green-500" />
      </div>
      <h1 className="font-display text-2xl font-bold text-navy mb-2">{page.title || 'You completed the unit!'}</h1>
      <p className="text-muted text-sm max-w-xs">
        You've completed the <strong>{lessonTitle}</strong> lesson.
      </p>
    </div>
  );
}
