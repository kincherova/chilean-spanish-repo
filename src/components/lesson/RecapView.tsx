import { CheckCircle2, Star } from 'lucide-react';
import { RecapPage } from '../../types/database';
import { FontSize } from './fontSizeClasses';
import DialogueView from './DialogueView';

interface Props {
  page: RecapPage;
  lessonTitle: string;
  isComplete: boolean;
  fontSize: FontSize;
}

export default function RecapView({ page, lessonTitle, isComplete, fontSize }: Props) {
  if (page.dialogue && page.dialogue.length > 0) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-navy">{page.title}</h1>
            <p className="text-muted text-sm">Review the conversation</p>
          </div>
        </div>
        <DialogueView page={{ type: 'dialogue', title: '', dialogue: page.dialogue }} fontSize={fontSize} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
        <Star size={28} className="text-green-500" />
      </div>
      <h1 className="font-display text-2xl font-bold text-navy mb-2">{page.title}</h1>
      <p className="text-muted text-sm max-w-xs">
        You've completed the <strong>{lessonTitle}</strong> lesson.
        {isComplete ? " It's already marked as complete." : " Hit Continue to mark it done."}
      </p>
    </div>
  );
}
