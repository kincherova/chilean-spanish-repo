import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft, Volume2, Copy, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import SignInButton from '../components/SignInButton';

interface Lesson {
  id: string;
  title: string;
  type: string;
  content: any;
  order_index: number;
  unit_id: string;
}

interface QuizItem {
  question: string;
  phrase?: string;
  options: string[];
  correctAnswer: number;
  audioUrl?: string;
}

interface Page {
  type: string;
  title: string;
  subtitle?: string;
  items?: QuizItem[];
  dialogue?: any[];
  phrases?: Phrase[];
  message?: string;
}

interface Phrase {
  spanish: string;
  english: string;
  reply: string;
  isChilean: boolean;
  audioUrl?: string;
}

export default function LessonPlayer() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLastUnit, setIsLastUnit] = useState(false);

  const pages: Page[] = lesson?.content?.pages || [];
  const currentPage = pages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;

  useEffect(() => {
    if (lessonId) {
      setCurrentPageIndex(0);
      setLesson(null);
      setLoading(true);
      setIsCompleted(false);
      setIsLastUnit(false);
      loadLesson();
      if (user) {
        checkProgress();
      }
    }
  }, [lessonId, user]);

  useEffect(() => {
    if (!unitId) return;
    const checkLastUnit = async () => {
      const { data: currentUnit } = await supabase
        .from('units')
        .select('order_index, module_id')
        .eq('id', unitId)
        .maybeSingle();
      if (!currentUnit) return;
      const { data: nextUnit } = await supabase
        .from('units')
        .select('id')
        .eq('module_id', currentUnit.module_id)
        .eq('order_index', currentUnit.order_index + 1)
        .maybeSingle();
      setIsLastUnit(!nextUnit);
    };
    checkLastUnit();
  }, [unitId]);

  const loadLesson = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .maybeSingle();

      if (error) throw error;
      setLesson(data);
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkProgress = async () => {
    if (!user || !lessonId) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (error) throw error;
      setIsCompleted(!!data);
    } catch (error) {
      console.error('Error checking progress:', error);
    }
  };

  const markLessonComplete = async () => {
    if (!user || !lessonId) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .insert([{ user_id: user.id, lesson_id: lessonId }]);

      if (error && error.code !== '23505') throw error;

      setIsCompleted(true);
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = async () => {
    if (!isCompleted) {
      await markLessonComplete();
    }
    if (isLastUnit) {
      navigate('/modules');
    } else {
      const { data: currentUnit } = await supabase
        .from('units')
        .select('order_index, module_id')
        .eq('id', unitId)
        .maybeSingle();

      if (currentUnit) {
        const { data: nextUnit } = await supabase
          .from('units')
          .select('id')
          .eq('module_id', currentUnit.module_id)
          .eq('order_index', currentUnit.order_index + 1)
          .maybeSingle();

        if (nextUnit) {
          const { data: lessons } = await supabase
            .from('lessons')
            .select('id')
            .eq('unit_id', nextUnit.id)
            .order('order_index')
            .limit(1);

          if (lessons && lessons.length > 0) {
            navigate(`/units/${nextUnit.id}/lessons/${lessons[0].id}`);
            return;
          }
          navigate(`/units/${nextUnit.id}/lessons`);
          return;
        }
      }
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-coral text-lg font-light">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted font-light mb-4">Lesson not found.</p>
          <button
            onClick={() => navigate(`/units/${unitId}/lessons`)}
            className="text-coral hover:text-coral-dark font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back</span>
          </button>
          <div className="flex items-center gap-3">
            {isCompleted && (
              <div className="flex items-center gap-2 text-teal">
                <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
            <SignInButton />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">
              {lesson.title}
            </h1>
            <span className="text-sm text-muted font-medium">
              {currentPageIndex + 1} / {pages.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-coral to-coral-dark h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPageIndex + 1) / pages.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-card-lg shadow-lg border border-[#f0e8e0] p-6 md:p-10 min-h-[500px] flex flex-col">
          <div className="flex-grow mb-8">
            {currentPage && <PageRenderer page={currentPage} onComplete={handleComplete} />}
          </div>

          <div>
            <div className="flex gap-4">
              {!isFirstPage && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-charcoal rounded-card font-medium hover:bg-gray-50 transition-all min-h-[48px]"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
              {!isLastPage ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-br from-coral to-coral-dark text-white py-3 rounded-card font-medium hover:shadow-xl transition-all shadow-lg flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {currentPageIndex === 0 ? '¡Vamos!' : 'Next'}
                  {currentPageIndex !== 0 && <ChevronRight className="w-5 h-5" />}
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex-1 bg-gradient-to-br from-teal to-teal/90 text-white py-3 rounded-card font-medium hover:shadow-xl transition-all shadow-lg flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {isCompleted ? (isLastUnit ? 'Back to modules' : 'Back to Units') : 'Complete Lesson'}
                </button>
              )}
            </div>
            {currentPageIndex === 0 && !isLastPage && (
              <p className="text-sm text-muted font-light italic text-center mt-2">Let's go</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageRenderer({ page, onComplete }: { page: Page; onComplete: () => void }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-6">
        {page.title}
      </h2>
      {page.subtitle && (
        <p className="text-base text-muted mb-6 -mt-4">{page.subtitle}</p>
      )}

      {page.type === 'overview' && <OverviewPage />}
      {page.type === 'intro' && <IntroPage phrases={page.phrases || []} />}
      {page.type === 'phrase_list' && <PhraseListPage phrases={page.phrases || []} />}
      {page.type === 'flashcards' && <FlashcardsPage />}
      {page.type === 'multiple_choice' && <MultipleChoicePage items={page.items || []} />}
      {page.type === 'audio_choice' && <AudioChoicePage items={page.items || []} />}
      {page.type === 'dialogue' && <DialoguePage dialogue={page.dialogue} />}
      {page.type === 'recap' && <RecapPage onComplete={onComplete} message={page.message} />}
    </div>
  );
}

function OverviewPage() {
  const { lessonId } = useParams();
  const [pageContent, setPageContent] = useState<any>(null);

  useEffect(() => {
    const loadPageContent = async () => {
      if (!lessonId) return;

      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('content')
          .eq('id', lessonId)
          .maybeSingle();

        if (error) throw error;

        const overviewPage = data?.content?.pages?.find((p: any) => p.type === 'overview');
        setPageContent(overviewPage);
      } catch (error) {
        console.error('Error loading page content:', error);
      }
    };

    loadPageContent();
  }, [lessonId]);

  const goal = pageContent?.goal || "By the end of this unit, you'll be able to recognize some of the most common questions Chileans can ask you.";
  const culturalNote = pageContent?.cultural_note || "Chileans are friendly and curious! They often ask questions quickly, sometimes dropping words. Don't worry—you only need to catch the key word to understand.";

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-cream to-white rounded-card-lg p-6 border-2 border-coral/20">
        <p className="text-lg text-charcoal font-light leading-relaxed">
          {goal}
        </p>
      </div>

      <div className="bg-gradient-to-br from-teal/10 to-coral/10 rounded-card-lg p-6 border border-teal/20">
        <h3 className="text-xl font-display font-semibold text-navy mb-3 flex items-center gap-2">
          <span>🇨🇱</span> Here's what you need to know about Chile
        </h3>
        <p className="text-charcoal font-light leading-relaxed">
          {culturalNote}
        </p>
      </div>

    </div>
  );
}

function AudioPlayer({ audioUrl, size = 'default' }: { audioUrl?: string; size?: 'default' | 'large' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(!audioUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setError(!audioUrl);
    setLoading(false);
  }, [audioUrl]);

  const handlePlay = async () => {
    if (!audioUrl) {
      setError(true);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('error', () => {
        setError(true);
        setLoading(false);
        setIsPlaying(false);
      });
    }

    if (audioRef.current && !error) {
      try {
        setLoading(true);
        setError(false);
        await audioRef.current.play();
        setIsPlaying(true);
        setLoading(false);
      } catch (err) {
        console.error('Error playing audio:', err);
        setError(true);
        setLoading(false);
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const iconSize = size === 'large' ? 'w-10 h-10' : 'w-5 h-5';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (isPlaying) {
          handleStop();
        } else {
          handlePlay();
        }
      }}
      disabled={error}
      className={`p-2 rounded-lg transition-colors ${
        error
          ? 'text-gray-300 cursor-not-allowed'
          : 'hover:bg-teal/10 text-teal cursor-pointer'
      }`}
      title={error ? 'Audio not available' : isPlaying ? 'Stop audio' : 'Play audio'}
    >
      {loading ? (
        <Loader2 className={`${iconSize} animate-spin`} />
      ) : (
        <Volume2 className={`${iconSize} ${isPlaying ? 'fill-current' : ''}`} />
      )}
    </button>
  );
}

function IntroPage({ phrases }: { phrases: Phrase[] }) {
  const { unitId, lessonId } = useParams();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [audioMap, setAudioMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!unitId) return;
    const fetchAudio = async () => {
      const { data } = await supabase
        .from('flashcards')
        .select('spanish_text, audio_url')
        .eq('unit_id', unitId)
        .not('audio_url', 'is', null);
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((f: any) => { map[f.spanish_text] = f.audio_url; });
        setAudioMap(map);
      }
    };
    fetchAudio();
  }, [unitId]);

  if (!phrases || phrases.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-cream rounded-card-lg p-6 text-center">
          <p className="text-lg text-charcoal font-light">
            This page will contain audio examples of questions you'll hear in Chile.
          </p>
          <p className="text-sm text-muted mt-4 italic">Content to be added</p>
        </div>
      </div>
    );
  }

  const handleCopyAll = () => {
    const text = phrases
      .map(p => `${p.spanish} - ${p.english}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-card hover:bg-gray-50 transition-colors text-sm font-medium text-charcoal"
        >
          <Copy className="w-4 h-4" />
          {copiedIndex === -1 ? 'Copied!' : 'Copy All'}
        </button>
      </div>

      <div className="space-y-4">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className="bg-white rounded-card-lg border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <AudioPlayer audioUrl={phrase.audioUrl || audioMap[phrase.spanish]} />
              <h3 className="text-xl font-semibold text-navy">
                {phrase.spanish}
              </h3>
              {phrase.isChilean && (
                <span className="text-lg" title="Chilean Spanish">🇨🇱</span>
              )}
            </div>
            <p className="text-base text-charcoal">{phrase.english}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhraseListPage({ phrases }: { phrases: Phrase[] }) {
  const { unitId } = useParams();
  const [copied, setCopied] = useState(false);
  const [audioMap, setAudioMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!unitId) return;
    const fetchAudio = async () => {
      const { data } = await supabase
        .from('flashcards')
        .select('spanish_text, audio_url')
        .eq('unit_id', unitId)
        .not('audio_url', 'is', null);
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((f: any) => { map[f.spanish_text] = f.audio_url; });
        setAudioMap(map);
      }
    };
    fetchAudio();
  }, [unitId]);

  const handleCopyAll = () => {
    const text = phrases
      .map(p => `${p.spanish}\n${p.english}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-cream to-white rounded-card-lg p-6 border-2 border-coral/20">
        <p className="text-base text-charcoal font-light leading-relaxed">
          📝 We recommend writing these down in a notebook. Writing helps memory!
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-card hover:bg-gray-50 transition-colors text-sm font-medium text-charcoal"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy All'}
        </button>
      </div>

      <div className="bg-white rounded-card-lg border border-gray-200 p-6 shadow-sm">
        <div className="space-y-4">
          {phrases.map((phrase, index) => (
            <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <div className="flex items-center gap-2">
                <AudioPlayer audioUrl={phrase.audioUrl || audioMap[phrase.spanish]} />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-navy mb-1">
                    {phrase.spanish}
                    {phrase.isChilean && <span className="ml-2 text-sm">🇨🇱</span>}
                  </p>
                  <p className="text-base text-charcoal font-light">
                    {phrase.english}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Flashcard {
  id: string;
  spanish_text: string;
  english_text: string;
  order_index: number;
  audio_url?: string;
}

function FlashcardsPage() {
  const { unitId } = useParams();
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tags, setTags] = useState<Record<string, string>>({});

  useEffect(() => {
    loadFlashcards();
    if (user) {
      loadUserTags();
    }
  }, [unitId, user]);

  const loadFlashcards = async () => {
    if (!unitId) return;

    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('unit_id', unitId)
        .order('order_index');

      if (error) throw error;
      setFlashcards(data || []);
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserTags = async () => {
    if (!user || !unitId) return;

    try {
      const { data: flashcardsData } = await supabase
        .from('flashcards')
        .select('id')
        .eq('unit_id', unitId);

      if (!flashcardsData) return;

      const flashcardIds = flashcardsData.map(f => f.id);

      const { data, error } = await supabase
        .from('user_flashcard_tags')
        .select('flashcard_id, tag')
        .eq('user_id', user.id)
        .in('flashcard_id', flashcardIds);

      if (error) throw error;

      if (data) {
        const tagMap: Record<string, string> = {};
        data.forEach((item: any) => {
          tagMap[item.flashcard_id] = item.tag;
        });
        setTags(tagMap);
      }
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleTag = async (tag: 'needs_practice' | 'mastered') => {
    if (!user || flashcards.length === 0) return;

    const currentCard = flashcards[currentIndex];
    const currentTag = tags[currentCard.id];

    if (currentTag === tag) {
      try {
        const { error } = await supabase
          .from('user_flashcard_tags')
          .delete()
          .eq('user_id', user.id)
          .eq('flashcard_id', currentCard.id);

        if (error) throw error;

        setTags(prev => {
          const newTags = { ...prev };
          delete newTags[currentCard.id];
          return newTags;
        });
      } catch (error) {
        console.error('Error removing tag:', error);
      }
    } else {
      try {
        const { error } = await supabase
          .from('user_flashcard_tags')
          .upsert({
            user_id: user.id,
            flashcard_id: currentCard.id,
            tag: tag,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,flashcard_id'
          });

        if (error) throw error;

        setTags(prev => ({ ...prev, [currentCard.id]: tag }));
      } catch (error) {
        console.error('Error setting tag:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted">Loading flashcards...</div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="bg-cream rounded-card-lg p-6 text-center">
        <p className="text-lg text-charcoal font-light">No flashcards available for this lesson.</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentCard = flashcards[currentIndex];
  const currentTag = tags[currentCard.id];

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <span className="text-sm text-muted font-medium">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
      </div>

      <div className="relative">
        {currentTag && (
          <div className="flex gap-2 mb-3">
            {currentTag === 'needs_practice' && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                Needs practice
              </span>
            )}
            {currentTag === 'mastered' && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Mastered
              </span>
            )}
          </div>
        )}

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-96 cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div
              className="absolute inset-0 bg-white rounded-card-lg shadow-lg p-12 flex items-center justify-center border-2 border-coral"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <div className="text-sm text-muted font-medium mb-4">SPANISH</div>
                <p className="text-4xl font-bold text-charcoal">{currentCard.spanish_text}</p>
                {currentCard.audio_url && (
                  <div className="mt-4 flex justify-center">
                    <AudioPlayer audioUrl={currentCard.audio_url} />
                  </div>
                )}
                <p className="text-sm text-muted mt-6 font-light">Click to flip</p>
              </div>
            </div>

            <div
              className="absolute inset-0 bg-white rounded-card-lg shadow-lg p-12 flex items-center justify-center border-2 border-teal"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-center">
                <div className="text-sm text-muted font-medium mb-4">ENGLISH</div>
                <p className="text-4xl font-bold text-charcoal">{currentCard.english_text}</p>
                <p className="text-sm text-muted mt-8 font-light">Click to flip back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => handleTag('needs_practice')}
          disabled={!user}
          className={`px-8 py-3 rounded-card font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            currentTag === 'needs_practice'
              ? 'bg-amber-600 text-white'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          {currentTag === 'needs_practice' ? '✓ Needs practice' : 'Needs practice'}
        </button>
        <button
          onClick={() => handleTag('mastered')}
          disabled={!user}
          className={`px-8 py-3 rounded-card font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            currentTag === 'mastered'
              ? 'bg-green-600 text-white'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {currentTag === 'mastered' ? '✓ Mastered!' : 'Mastered!'}
        </button>
      </div>

      {!user && (
        <p className="text-sm text-muted font-light text-center -mt-4">
          <a href="/auth" className="text-coral hover:text-coral-dark underline underline-offset-2 transition-colors">Sign in</a> to save your progress
        </p>
      )}

      <div className="flex gap-4 justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 border border-gray-300 text-charcoal rounded-card font-medium hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="px-6 py-3 border border-gray-300 text-charcoal rounded-card font-medium hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function MultipleChoicePage({ items }: { items: QuizItem[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-cream rounded-card-lg p-8 text-center">
        <p className="text-lg text-charcoal font-light">Quiz questions coming soon.</p>
      </div>
    );
  }

  const currentQuestion = items[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    setSelectedIndex(index);

    if (index === currentQuestion.correctAnswer) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        if (currentQuestionIndex < items.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedIndex(null);
        } else {
          setIsComplete(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setSelectedIndex(null);
      }, 1000);
    }
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-teal/10 to-teal/5 rounded-card-lg p-8 text-center border-2 border-teal/20">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-navy mb-3">¡Excelente!</h3>
          <p className="text-lg text-charcoal font-light">
            You've completed all the questions! Keep up the great work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-card-lg p-8 shadow-xl border-2 border-teal">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">Correct!</h3>
              <p className="text-lg text-charcoal font-light">Next question</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <span className="text-sm text-muted font-medium">
          Question {currentQuestionIndex + 1} of {items.length}
        </span>
      </div>

      <div className="bg-cream rounded-card-lg p-6 text-center">
        {currentQuestion.audioUrl && (
          <div className="flex justify-center mb-3">
            <AudioPlayer audioUrl={currentQuestion.audioUrl} />
          </div>
        )}
        <h3 className="text-3xl font-bold text-navy mb-2">
          {currentQuestion.phrase || currentQuestion.question}
        </h3>
        {currentQuestion.phrase && (
          <p className="text-sm text-muted font-medium">What does it mean?</p>
        )}
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === currentQuestion.correctAnswer;
          const showResult = selectedIndex !== null;

          let buttonClasses = 'w-full p-4 rounded-card text-left font-medium transition-all border-2 ';

          if (showResult) {
            if (isSelected && isCorrectOption) {
              buttonClasses += 'bg-green-50 border-green-500 text-green-700';
            } else if (isSelected && !isCorrectOption) {
              buttonClasses += 'bg-red-50 border-red-500 text-red-700';
            } else {
              buttonClasses += 'bg-white border-gray-200 text-muted opacity-50';
            }
          } else {
            buttonClasses += 'bg-white border-gray-300 text-charcoal hover:border-navy hover:bg-navy/5';
          }

          return (
            <button
              key={index}
              onClick={() => selectedIndex === null && handleAnswerClick(index)}
              disabled={selectedIndex !== null}
              className={buttonClasses}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AudioChoicePage({ items }: { items: QuizItem[] }) {
  const [questions] = useState(() => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-cream rounded-card-lg p-8 text-center">
        <p className="text-lg text-charcoal font-light">Audio exercises coming soon.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    setSelectedIndex(index);

    if (index === currentQuestion.correctAnswer) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedIndex(null);
        } else {
          setIsComplete(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setSelectedIndex(null);
      }, 1000);
    }
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-teal/10 to-teal/5 rounded-card-lg p-8 text-center border-2 border-teal/20">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-navy mb-3">¡Excelente!</h3>
          <p className="text-lg text-charcoal font-light">
            You're getting faster at recognizing questions! Keep it up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-card-lg p-8 shadow-xl border-2 border-teal">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">Correct!</h3>
              <p className="text-lg text-charcoal font-light">Next question</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <span className="text-sm text-muted font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="bg-cream rounded-card-lg p-6 flex items-center justify-center min-h-[120px]">
        <AudioPlayer audioUrl={currentQuestion.audioUrl} size="large" />
      </div>

      <div className="text-center mb-4">
        <p className="text-sm text-muted font-medium">What do you hear?</p>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === currentQuestion.correctAnswer;
          const showResult = selectedIndex !== null;

          let buttonClasses = 'w-full p-4 rounded-card text-left font-medium transition-all border-2 ';

          if (showResult) {
            if (isSelected && isCorrectOption) {
              buttonClasses += 'bg-green-50 border-green-500 text-green-700';
            } else if (isSelected && !isCorrectOption) {
              buttonClasses += 'bg-red-50 border-red-500 text-red-700';
            } else {
              buttonClasses += 'bg-white border-gray-200 text-muted opacity-50';
            }
          } else {
            buttonClasses += 'bg-white border-gray-300 text-charcoal hover:border-navy hover:bg-navy/5';
          }

          return (
            <button
              key={index}
              onClick={() => selectedIndex === null && handleAnswerClick(index)}
              disabled={selectedIndex !== null}
              className={buttonClasses}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DialogueLine {
  speaker: 'local' | 'tourist' | 'waiter';
  name?: string;
  spanish: string;
  english?: string;
}

function DialoguePage({ dialogue }: { dialogue?: DialogueLine[] }) {
  const defaultDialogue: DialogueLine[] = [
    { speaker: 'local', spanish: '¿Primera vez en Chile?' },
    { speaker: 'tourist', spanish: 'Sí.' },
    { speaker: 'local', spanish: '¿Te gusta?' },
    { speaker: 'tourist', spanish: 'Sí, mucho.' },
    { speaker: 'local', spanish: 'Ya, perfecto. ¿Te ayudo con algo?' },
    { speaker: 'tourist', spanish: 'No, gracias. Todo bien.' },
    { speaker: 'local', spanish: '¡Está bien. ¡Que tengas buen día!' },
    { speaker: 'tourist', spanish: 'Muchas gracias.' },
  ];

  const displayDialogue = dialogue || defaultDialogue;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-card-lg border border-gray-200 p-8 shadow-sm">
        <div className="space-y-4">
          {displayDialogue.map((line, index) => (
            <div key={index} className={`${line.speaker === 'local' ? 'text-left' : 'text-left pl-8'}`}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-semibold text-coral whitespace-nowrap">
                  {line.name ? `${line.name}:` : line.speaker === 'local' ? 'Juan (Local):' : 'Michael (Tourist):'}
                </span>
                <span className="text-lg text-charcoal">
                  {line.spanish}
                  {line.english && (
                    <span className="text-sm text-gray-500 italic ml-1">[{line.english}]</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecapPage({ onComplete, message }: { onComplete: () => void; message?: string }) {
  const { unitId } = useParams<{ unitId: string }>();
  const [nextUnitId, setNextUnitId] = useState<string | null>(null);
  const [loadingNext, setLoadingNext] = useState(true);

  useEffect(() => {
    const findNextUnit = async () => {
      if (!unitId) return;
      try {
        const { data: currentUnit } = await supabase
          .from('units')
          .select('order_index, module_id')
          .eq('id', unitId)
          .maybeSingle();

        if (!currentUnit) return;

        const { data: nextUnit } = await supabase
          .from('units')
          .select('id')
          .eq('module_id', currentUnit.module_id)
          .eq('order_index', currentUnit.order_index + 1)
          .maybeSingle();

        setNextUnitId(nextUnit?.id || null);
      } catch (error) {
        console.error('Error finding next unit:', error);
      } finally {
        setLoadingNext(false);
      }
    };

    findNextUnit();
  }, [unitId]);

  return (
    <div className="space-y-6 text-center">
      <div className="bg-gradient-to-br from-teal/10 to-coral/10 rounded-card-lg p-8">
        <p className="text-xl text-charcoal font-light mb-8 leading-relaxed">
          {message || '¡Felicidades! 🥳 You\'ve completed this unit. Now let\'s move to the next one!'}
        </p>
        <button
          onClick={onComplete}
          disabled={loadingNext}
          className="px-8 py-3 bg-coral text-white rounded-full font-semibold hover:bg-coral-dark transition-colors shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loadingNext ? 'Loading...' : nextUnitId ? 'Next lesson' : 'Back to modules'}
        </button>
      </div>
    </div>
  );
}
