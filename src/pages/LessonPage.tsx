import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Lesson, Flashcard, LessonPage as LessonPageType } from '../types/database';
import { useProgress } from '../contexts/ProgressContext';
import OverviewPageView from '../components/lesson/OverviewPageView';
import IntroPageView from '../components/lesson/IntroPageView';
import MultipleChoiceView from '../components/lesson/MultipleChoiceView';
import AudioChoiceView from '../components/lesson/AudioChoiceView';
import FlashcardsView from '../components/lesson/FlashcardsView';
import DialogueView from '../components/lesson/DialogueView';
import RecapView from '../components/lesson/RecapView';

export default function LessonPage() {
  const { moduleId, unitId, lessonId } = useParams<{ moduleId: string; unitId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { markLessonComplete, isLessonComplete } = useProgress();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(0);

  useEffect(() => {
    async function load() {
      if (!lessonId || !unitId) return;
      const [{ data: lessonData }, { data: flashcardsData }] = await Promise.all([
        supabase.from('lessons').select('*').eq('id', lessonId).maybeSingle(),
        supabase.from('flashcards').select('*').eq('unit_id', unitId).order('order_index'),
      ]);
      if (lessonData) setLesson(lessonData);
      if (flashcardsData) setFlashcards(flashcardsData);
      setLoading(false);
    }
    load();
  }, [lessonId, unitId]);

  if (loading || !lesson) {
    return (
      <div className="min-h-screen bg-warm-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pages = lesson.content?.pages ?? [];
  const totalPages = pages.length;
  const page = pages[currentPage] as LessonPageType | undefined;
  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  const handleNext = async () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
    } else {
      await markLessonComplete(lesson.id, quizAnswered > 0 ? Math.round((score / quizAnswered) * 100) : undefined);
      navigate(`/modules/${moduleId}/units/${unitId}`);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  const handleClose = () => {
    navigate(`/modules/${moduleId}/units/${unitId}`);
  };

  const handleQuizCorrect = () => {
    setScore((s) => s + 1);
    setQuizAnswered((q) => q + 1);
  };

  const handleQuizWrong = () => {
    setQuizAnswered((q) => q + 1);
  };

  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      <div className="sticky top-0 z-50 bg-warm-bg/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          {currentPage > 0 ? (
            <button onClick={handleBack} className="p-1.5 rounded-lg text-muted hover:text-navy hover:bg-white/60 transition-colors">
              <ChevronLeft size={20} />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <div className="flex-1 bg-white/60 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-coral rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg text-muted hover:text-navy hover:bg-white/60 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="flex-1">
          {page?.type === 'overview' && (
            <OverviewPageView page={page} />
          )}
          {page?.type === 'intro' && (
            <IntroPageView page={page} />
          )}
          {page?.type === 'multiple_choice' && (
            <MultipleChoiceView page={page} onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} />
          )}
          {page?.type === 'audio_choice' && (
            <AudioChoiceView page={page} onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} />
          )}
          {page?.type === 'flashcards' && (
            <FlashcardsView flashcards={flashcards} unitId={unitId!} />
          )}
          {page?.type === 'dialogue' && (
            <DialogueView page={page} />
          )}
          {page?.type === 'recap' && (
            <RecapView page={page} lessonTitle={lesson.title} isComplete={isLessonComplete(lesson.id)} />
          )}
        </div>

        {page?.type !== 'multiple_choice' && page?.type !== 'audio_choice' && (
          <div className="pt-6">
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
            >
              {isLastPage ? 'Finish lesson' : 'Continue'}
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
