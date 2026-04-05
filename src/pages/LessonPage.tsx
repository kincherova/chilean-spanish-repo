import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, BrainCircuit } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Lesson, Flashcard, LessonPage as LessonPageType, DialoguePracticePage, PhraseListPage, RecallPage } from '../types/database';
import { useProgress } from '../contexts/ProgressContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { useAuth } from '../contexts/AuthContext';
import OverviewPageView from '../components/lesson/OverviewPageView';
import IntroPageView from '../components/lesson/IntroPageView';
import MultipleChoiceView from '../components/lesson/MultipleChoiceView';
import AudioChoiceView from '../components/lesson/AudioChoiceView';
import FlashcardsView from '../components/lesson/FlashcardsView';
import DialogueView from '../components/lesson/DialogueView';
import DialoguePracticeView from '../components/lesson/DialoguePracticeView';
import RecapView from '../components/lesson/RecapView';
import PhraseListView from '../components/lesson/PhraseListView';
import RecallView from '../components/lesson/RecallView';
import RegistrationPromptModal from '../components/RegistrationPromptModal';

const MODULE1_UNIT1_ID = 'bac8627a-e89e-400a-b54e-217e4f379fc2';

const FONT_SIZES = ['normal', 'large', 'xlarge'] as const;

export default function LessonPage() {
  const { moduleId, unitId, lessonId } = useParams<{ moduleId: string; unitId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { markLessonComplete } = useProgress();
  const { fontSize, setFontSize } = useFontSize();
  const { user } = useAuth();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [unitTitle, setUnitTitle] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(0);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [pendingFlashcardsNav, setPendingFlashcardsNav] = useState(false);

  useEffect(() => {
    async function load() {
      if (!lessonId || !unitId) return;
      const [{ data: lessonData }, { data: flashcardsData }, { data: unitData }] = await Promise.all([
        supabase.from('lessons').select('*').eq('id', lessonId).maybeSingle(),
        supabase.from('flashcards').select('*').eq('unit_id', unitId).order('order_index'),
        supabase.from('units').select('title').eq('id', unitId).maybeSingle(),
      ]);
      if (lessonData) setLesson(lessonData);
      if (flashcardsData) setFlashcards(flashcardsData);
      if (unitData) setUnitTitle(unitData.title);
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

  const rawPages = lesson.content?.pages ?? [];
  const pages: LessonPageType[] = rawPages.reduce<LessonPageType[]>((acc, p) => {
    acc.push(p);
    if (p.type === 'dialogue') {
      const practice: DialoguePracticePage = {
        type: 'dialogue_practice',
        title: 'Your Turn',
        subtitle: 'Tap each hidden reply to reveal what you could say.',
        dialogue: p.dialogue,
      };
      acc.push(practice);
    }
    return acc;
  }, []);
  const totalPages = pages.length;
  const page = pages[currentPage] as LessonPageType | undefined;
  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  const goToFlashcards = () => {
    navigate(`/modules/${moduleId}/units/${unitId}/flashcards`);
  };

  const handleNext = async () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
    } else {
      await markLessonComplete(lesson.id, quizAnswered > 0 ? Math.round((score / quizAnswered) * 100) : undefined);
      if (!user && unitId === MODULE1_UNIT1_ID) {
        setPendingFlashcardsNav(true);
        setShowRegistrationModal(true);
      } else {
        goToFlashcards();
      }
    }
  };

  const handleModalClose = () => {
    setShowRegistrationModal(false);
    if (pendingFlashcardsNav) {
      goToFlashcards();
    }
  };

  const handleModalRegistered = () => {
    setShowRegistrationModal(false);
    goToFlashcards();
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
      {showRegistrationModal && (
        <RegistrationPromptModal
          onClose={handleModalClose}
          onRegistered={handleModalRegistered}
        />
      )}
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
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-end gap-0.5 border border-gray-200 rounded-lg px-1.5 py-1 bg-white/60">
            {FONT_SIZES.map((size, i) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                title={size === 'normal' ? 'Small text' : size === 'large' ? 'Medium text' : 'Large text'}
                className={`font-bold leading-none transition-all ${
                  fontSize === size ? 'text-coral' : 'text-muted hover:text-navy'
                } ${i === 0 ? 'text-[10px]' : i === 1 ? 'text-[13px]' : 'text-[17px]'}`}
              >
                A
              </button>
            ))}
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg text-muted hover:text-navy hover:bg-white/60 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className={page?.type === 'overview' ? undefined : 'flex-1'}>
          {page?.type === 'overview' && (
            <OverviewPageView page={page} fontSize={fontSize} unitTitle={unitTitle} />
          )}
          {page?.type === 'intro' && (
            <IntroPageView page={page} fontSize={fontSize} />
          )}
          {page?.type === 'phrase_list' && (
            <PhraseListView page={page as PhraseListPage} fontSize={fontSize} flashcards={flashcards} />
          )}
          {page?.type === 'multiple_choice' && (
            <MultipleChoiceView page={page} fontSize={fontSize} onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} onNext={handleNext} />
          )}
          {page?.type === 'audio_choice' && (
            <AudioChoiceView page={page} fontSize={fontSize} onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} onNext={handleNext} />
          )}
          {page?.type === 'flashcards' && (
            <FlashcardsView flashcards={flashcards} unitId={unitId!} fontSize={fontSize} />
          )}
          {page?.type === 'dialogue' && (
            <DialogueView page={page} fontSize={fontSize} />
          )}
          {page?.type === 'dialogue_practice' && (
            <DialoguePracticeView page={page} fontSize={fontSize} />
          )}
          {page?.type === 'recap' && (
            <RecapView page={page} lessonTitle={lesson.title} fontSize={fontSize} />
          )}
          {page?.type === 'recall' && (
            <RecallView page={page as RecallPage} fontSize={fontSize} onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} onNext={handleNext} />
          )}
        </div>

        {page?.type !== 'multiple_choice' && page?.type !== 'audio_choice' && page?.type !== 'recall' && (
          <div className="pt-6 flex flex-col gap-3">
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
            >
              {isLastPage ? (
                <>
                  <BrainCircuit size={18} />
                  Test your memory with flashcards
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight size={18} />
                </>
              )}
            </button>
            {page?.type === 'recap' && (
              <button
                onClick={() => navigate(`/modules/${moduleId}`)}
                className="w-full flex items-center justify-center gap-2 border border-navy/20 text-navy hover:bg-navy/5 font-semibold py-3.5 rounded-card transition-colors"
              >
                Back to lessons
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
