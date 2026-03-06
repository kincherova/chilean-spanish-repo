import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, BookOpen, Zap } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { fs } from '../components/lesson/fontSizeClasses';
import { Flashcard } from '../types/database';

const FONT_SIZE_LABELS = { normal: 'A', large: 'A+', xlarge: 'A++' };

type Tag = 'needs_practice' | 'mastered';

interface TaggedCard extends Flashcard {
  tag: Tag;
}

const TABS: { key: Tag; label: string; color: string; activeClass: string }[] = [
  {
    key: 'needs_practice',
    label: 'Practice',
    color: 'text-amber-600',
    activeClass: 'bg-amber-400 text-white border-amber-400',
  },
  {
    key: 'mastered',
    label: 'Mastered',
    color: 'text-green-600',
    activeClass: 'bg-green-500 text-white border-green-500',
  },
];

export default function VocabularyPage() {
  const { user } = useAuth();
  const { fontSize, cycleFontSize } = useFontSize();
  const navigate = useNavigate();
  const [cards, setCards] = useState<TaggedCard[]>([]);
  const [tab, setTab] = useState<Tag>('needs_practice');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function load() {
      setLoading(true);
      const { data: tagRows } = await supabase
        .from('user_flashcard_tags')
        .select('flashcard_id, tag')
        .eq('user_id', user!.id);

      if (!tagRows || tagRows.length === 0) {
        setCards([]);
        setLoading(false);
        return;
      }

      const ids = tagRows.map((r) => r.flashcard_id);
      const { data: flashcards } = await supabase
        .from('flashcards')
        .select('*')
        .in('id', ids);

      if (!flashcards) {
        setCards([]);
        setLoading(false);
        return;
      }

      const tagMap: Record<string, Tag> = {};
      tagRows.forEach((r) => { tagMap[r.flashcard_id] = r.tag; });

      const merged: TaggedCard[] = flashcards.map((f) => ({
        ...f,
        tag: tagMap[f.id],
      }));

      setCards(merged);
      setLoading(false);
    }

    load();
  }, [user]);

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(() => {});
  };

  const removeTag = async (cardId: string) => {
    if (!user) return;
    await supabase
      .from('user_flashcard_tags')
      .delete()
      .eq('user_id', user.id)
      .eq('flashcard_id', cardId);
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const visible = cards.filter((c) => c.tag === tab);

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back="/profile" title="My Vocabulary" />
      <div className="max-w-2xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
          {TABS.map((t) => {
            const count = cards.filter((c) => c.tag === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  tab === t.key
                    ? t.activeClass
                    : 'bg-white text-muted border-gray-200 hover:border-gray-300'
                }`}
              >
                {t.label}
                <span className={`text-xs font-bold rounded-full px-1.5 py-0.5 ${
                  tab === t.key ? 'bg-white/30' : 'bg-gray-100 text-navy'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
          </div>
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
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-card-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <BookOpen size={22} className="text-muted" />
            </div>
            <p className="font-semibold text-navy mb-1">No words here yet</p>
            <p className="text-muted text-sm">
              {tab === 'needs_practice'
                ? 'Tag flashcards as "Practice" while studying to collect them here.'
                : 'Tag flashcards as "Mastered" to track what you\'ve learned.'}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {visible.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-card-lg px-4 py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-navy leading-snug ${fs.body(fontSize)}`}>{card.spanish_text}</p>
                    <p className={`text-muted mt-0.5 ${fs.bodySmall(fontSize)}`}>{card.english_text}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {card.audio_url && (
                      <button
                        onClick={() => playAudio(card.audio_url!)}
                        className="p-1.5 bg-coral/10 hover:bg-coral/20 rounded-full text-coral transition-colors"
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => removeTag(card.id)}
                      className="text-xs text-muted hover:text-coral transition-colors px-2 py-1 rounded hover:bg-coral/5"
                      title="Remove tag"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {tab === 'needs_practice' && (
              <div className="mt-6">
                <button
                  onClick={() => navigate('/vocabulary/practice')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-card-lg transition-colors shadow-sm"
                >
                  <Zap size={17} />
                  Let's practice them
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
