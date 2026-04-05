import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Tag, BookOpen, PartyPopper } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { playAudio } from '../lib/audio';
import { Flashcard, UserFlashcardTag } from '../types/database';
import { useAuth } from '../contexts/AuthContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { fs } from '../components/lesson/fontSizeClasses';
import { getTipForUnit } from '../lib/languageTips';

interface NextDestination {
  moduleId: string;
  unitId: string;
  lessonId: string;
  unitTitle: string;
}

const FONT_SIZE_LABELS = { normal: 'A', large: 'A+', xlarge: 'A++' };

export default function FlashcardsPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const { user } = useAuth();
  const { fontSize, cycleFontSize } = useFontSize();
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [tags, setTags] = useState<Record<string, UserFlashcardTag['tag']>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showGuestToast, setShowGuestToast] = useState(false);
  const [nextDest, setNextDest] = useState<NextDestination | null>(null);

  useEffect(() => {
    async function loadNextDestination() {
      if (!unitId || !moduleId) return;

      const { data: currentUnit } = await supabase
        .from('units')
        .select('order_index, module_id')
        .eq('id', unitId)
        .maybeSingle();

      if (!currentUnit) return;

      const { data: nextUnit } = await supabase
        .from('units')
        .select('id, title, module_id')
        .eq('module_id', currentUnit.module_id)
        .gt('order_index', currentUnit.order_index)
        .order('order_index')
        .limit(1)
        .maybeSingle();

      if (nextUnit) {
        const { data: firstLesson } = await supabase
          .from('lessons')
          .select('id')
          .eq('unit_id', nextUnit.id)
          .order('order_index')
          .limit(1)
          .maybeSingle();

        if (firstLesson) {
          setNextDest({ moduleId: nextUnit.module_id, unitId: nextUnit.id, lessonId: firstLesson.id, unitTitle: nextUnit.title });
          return;
        }
      }

      const { data: currentModule } = await supabase
        .from('modules')
        .select('order_index')
        .eq('id', currentUnit.module_id)
        .maybeSingle();

      if (!currentModule) return;

      const { data: nextModule } = await supabase
        .from('modules')
        .select('id')
        .gt('order_index', currentModule.order_index)
        .order('order_index')
        .limit(1)
        .maybeSingle();

      if (nextModule) {
        const { data: firstUnit } = await supabase
          .from('units')
          .select('id, title')
          .eq('module_id', nextModule.id)
          .order('order_index')
          .limit(1)
          .maybeSingle();

        if (firstUnit) {
          const { data: firstLesson } = await supabase
            .from('lessons')
            .select('id')
            .eq('unit_id', firstUnit.id)
            .order('order_index')
            .limit(1)
            .maybeSingle();

          if (firstLesson) {
            setNextDest({ moduleId: nextModule.id, unitId: firstUnit.id, lessonId: firstLesson.id, unitTitle: firstUnit.title });
          }
        }
      }
    }

    loadNextDestination();
  }, [unitId, moduleId]);

  useEffect(() => {
    async function load() {
      if (!unitId) return;
      const { data: cardsData } = await supabase
        .from('flashcards')
        .select('*')
        .eq('unit_id', unitId)
        .order('order_index');

      if (cardsData) setFlashcards(cardsData);

      if (user) {
        const cardIds = cardsData?.map((c) => c.id) ?? [];
        if (cardIds.length > 0) {
          const { data: tagsData } = await supabase
            .from('user_flashcard_tags')
            .select('*')
            .eq('user_id', user.id)
            .in('flashcard_id', cardIds);
          if (tagsData) {
            const tagMap: Record<string, UserFlashcardTag['tag']> = {};
            tagsData.forEach((t) => { tagMap[t.flashcard_id] = t.tag; });
            setTags(tagMap);
          }
        }
      }
      setLoading(false);
    }
    load();
  }, [unitId, user]);

  const card = flashcards[currentIndex];


  const setTag = async (tag: UserFlashcardTag['tag'] | null) => {
    if (!user) {
      setShowGuestToast(true);
      setTimeout(() => setShowGuestToast(false), 2500);
      return;
    }
    if (!card) return;
    if (tag === null) {
      await supabase.from('user_flashcard_tags').delete().eq('user_id', user.id).eq('flashcard_id', card.id);
      const updated = { ...tags };
      delete updated[card.id];
      setTags(updated);
    } else {
      await supabase.from('user_flashcard_tags').upsert({
        user_id: user.id,
        flashcard_id: card.id,
        tag,
        updated_at: new Date().toISOString(),
      });
      setTags({ ...tags, [card.id]: tag });
    }
  };

  const prev = () => { setFlipped(false); setCurrentIndex((i) => Math.max(0, i - 1)); };
  const next = () => {
    if (currentIndex === flashcards.length - 1) {
      setFinished(true);
    } else {
      setFlipped(false);
      setCurrentIndex((i) => i + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={`/modules/${moduleId}/units/${unitId}`} />
        <div className="flex items-center justify-center pt-20">
          <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={`/modules/${moduleId}/units/${unitId}`} title="Flashcards" />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-muted">No flashcards available for this unit yet.</p>
        </div>
      </div>
    );
  }

  const currentTag = card ? tags[card.id] : null;

  const tip = unitId ? getTipForUnit(unitId) : null;

  if (finished) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={`/modules/${moduleId}/units/${unitId}`} title="Flashcards" />
        <div className="max-w-sm mx-auto px-4 py-16 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6 shadow-sm">
            <PartyPopper size={36} className="text-amber-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy mb-3">¡Buen trabajo!</h2>
          <p className="text-muted text-sm leading-relaxed max-w-xs mb-8">
            You can access the words you marked{' '}
            <span className="font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-white text-xs">Practice</span>
            {' '}in your personal vocabulary list{' '}
            <BookOpen size={14} className="inline-block align-middle text-coral" />
          </p>
          {tip && (
            <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={14} className="text-teal-600" />
                </div>
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                  Quick Language Tip
                </span>
              </div>
              <p className="text-sm font-semibold text-navy mb-2">{tip.heading}</p>
              <div
                className="text-sm text-gray-700 leading-relaxed [&_strong]:font-semibold [&_em]:italic [&_em]:text-gray-800"
                dangerouslySetInnerHTML={{ __html: tip.body }}
              />
            </div>
          )}
          {nextDest && (
            <button
              onClick={() => navigate(`/modules/${nextDest.moduleId}/units/${nextDest.unitId}/lessons/${nextDest.lessonId}`)}
              className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-card transition-colors"
            >
              Next lesson
              <ChevronRight size={18} />
            </button>
          )}
          <button
            onClick={() => { setFinished(false); setCurrentIndex(0); setFlipped(false); }}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-card transition-colors mt-3 ${nextDest ? 'border border-navy/20 text-navy hover:bg-navy/5' : 'bg-coral hover:bg-coral-dark text-white'}`}
          >
            Review cards again
          </button>
          <button
            onClick={() => navigate('/modules')}
            className="mt-4 text-sm text-muted hover:text-navy transition-colors"
          >
            Go back to modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back={`/modules/${moduleId}/units/${unitId}`} title="Flashcards" />
      <div className="max-w-sm mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 text-sm text-muted">
          <span>{currentIndex + 1} / {flashcards.length}</span>
          <button
            onClick={cycleFontSize}
            title="Cycle text size"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex-shrink-0 ${
              fontSize === 'normal'
                ? 'text-muted border-gray-200 hover:border-coral/40 hover:text-navy bg-white'
                : 'text-coral border-coral/40 bg-coral/10'
            }`}
          >
            {FONT_SIZE_LABELS[fontSize]}
          </button>
          <div className="flex gap-1">
            {flashcards.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setFlipped(false); }}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-coral w-4' : 'bg-muted/30'}`}
              />
            ))}
          </div>
          <button
            onClick={() => { setCurrentIndex(0); setFlipped(false); }}
            className="p-1 hover:text-navy transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full aspect-[3/2] perspective-1000 mb-6"
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div
              className="absolute inset-0 bg-white rounded-card-lg shadow-md flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-xs text-muted uppercase tracking-wider mb-4">Spanish</p>
              <p className={`font-display font-bold text-navy text-center leading-tight ${fs.heading(fontSize)}`}>{card?.spanish_text}</p>
              {card?.audio_url && (
                <button
                  onClick={(e) => { e.stopPropagation(); playAudio(card.audio_url!); }}
                  className="mt-5 p-2.5 bg-green-500/10 hover:bg-green-500/20 rounded-full text-green-500 transition-colors"
                >
                  <Volume2 size={18} />
                </button>
              )}
              <p className="text-muted text-xs mt-4">Tap to reveal</p>
            </div>
            <div
              className="absolute inset-0 bg-navy rounded-card-lg shadow-md flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-xs text-white/50 uppercase tracking-wider mb-4">English</p>
              <p className={`font-display font-bold text-white text-center leading-tight ${fs.heading(fontSize)}`}>{card?.english_text}</p>
            </div>
          </div>
        </button>

        <div className="flex gap-2 justify-center mb-1">
          {(['needs_practice', 'mastered'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTag(currentTag === t ? null : t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                currentTag === t
                  ? t === 'mastered'
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-amber-400 text-white border-amber-400'
                  : 'bg-white text-muted border-gray-200 hover:border-gray-300'
              }`}
            >
              <Tag size={11} />
              {t === 'needs_practice' ? 'Practice' : 'Mastered'}
            </button>
          ))}
        </div>
        <div className={`flex justify-center mt-2 mb-4 transition-opacity duration-300 ${showGuestToast ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <p className="text-xs text-coral font-medium">Register to mark the phrase</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-cream border border-gray-200 rounded-card text-navy font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-coral hover:bg-coral-dark text-white rounded-card font-medium text-sm transition-colors"
          >
            {currentIndex === flashcards.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
