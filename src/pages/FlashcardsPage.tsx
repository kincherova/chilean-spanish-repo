import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Tag } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { Flashcard, UserFlashcardTag } from '../types/database';
import { useAuth } from '../contexts/AuthContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { fs } from '../components/lesson/fontSizeClasses';

const FONT_SIZE_LABELS = { normal: 'A', large: 'A+', xlarge: 'A++' };

export default function FlashcardsPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const { user } = useAuth();
  const { fontSize, cycleFontSize } = useFontSize();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [tags, setTags] = useState<Record<string, UserFlashcardTag['tag']>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(() => {});
  };

  const setTag = async (tag: UserFlashcardTag['tag'] | null) => {
    if (!user || !card) return;
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
  const next = () => { setFlipped(false); setCurrentIndex((i) => Math.min(flashcards.length - 1, i + 1)); };

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
                  className="mt-5 p-2.5 bg-coral/10 hover:bg-coral/20 rounded-full text-coral transition-colors"
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

        <div className="flex gap-2 mb-6 justify-center">
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
            disabled={currentIndex === flashcards.length - 1}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-coral hover:bg-coral-dark text-white rounded-card font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
