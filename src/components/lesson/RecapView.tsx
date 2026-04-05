import { Star, BookOpen } from 'lucide-react';
import { RecapPage } from '../../types/database';
import { FontSize } from './fontSizeClasses';
import { LanguageTip } from '../../lib/languageTips';

interface Props {
  page: RecapPage;
  lessonTitle: string;
  fontSize: FontSize;
  tip?: LanguageTip | null;
}

export default function RecapView({ page, lessonTitle, fontSize: _fontSize, tip }: Props) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
        <Star size={28} className="text-green-500" />
      </div>
      <h1 className="font-display text-2xl font-bold text-navy mb-2">
        {page.title || 'You completed the unit!'}
      </h1>
      <p className="text-muted text-sm max-w-xs mb-6">
        You've completed the <strong>{lessonTitle}</strong> lesson.
      </p>

      {tip && (
        <div className="w-full max-w-sm bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
              <BookOpen size={14} className="text-teal-600" />
            </div>
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
              In case you want to understand Spanish better
            </span>
          </div>
          <p className="text-sm font-semibold text-navy mb-2">{tip.heading}</p>
          <div
            className="text-sm text-gray-700 leading-relaxed tip-body [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:list-none [&_ul]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-1 [&_li]:before:content-['•'] [&_li]:before:text-amber-500 [&_li]:before:mt-0.5 [&_li]:before:flex-shrink-0 [&_em]:italic [&_em]:text-gray-800"
            dangerouslySetInnerHTML={{ __html: tip.body }}
          />
        </div>
      )}
    </div>
  );
}
