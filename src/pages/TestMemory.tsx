import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, RotateCw, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Flashcard {
  id: string;
  spanish_text: string;
  english_text: string;
  order_index: number;
}

interface FlashcardTag {
  tag: string;
}

export default function TestMemory() {
  const { unitId } = useParams<{ unitId: string }>();
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Record<string, string>>({});
  const [unitTitle, setUnitTitle] = useState('');

  useEffect(() => {
    loadFlashcards();
    if (user) {
      loadUserTags();
    }
  }, [unitId, user]);

  async function loadFlashcards() {
    if (!unitId) return;

    const { data: unitData } = await supabase
      .from('units')
      .select('title')
      .eq('id', unitId)
      .maybeSingle();

    if (unitData) {
      setUnitTitle(unitData.title);
    }

    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('unit_id', unitId)
      .order('order_index');

    if (error) {
      console.error('Error loading flashcards:', error);
    } else {
      setFlashcards(data || []);
    }

    setLoading(false);
  }

  async function loadUserTags() {
    if (!user || !unitId) return;

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

    if (error) {
      console.error('Error loading tags:', error);
    } else if (data) {
      const tagMap: Record<string, string> = {};
      data.forEach((item: any) => {
        tagMap[item.flashcard_id] = item.tag;
      });
      setTags(tagMap);
    }
  }

  async function setTag(tag: 'needs_practice' | 'mastered') {
    if (!user) return;

    const flashcard = flashcards[currentIndex];
    if (!flashcard) return;

    const { error } = await supabase
      .from('user_flashcard_tags')
      .upsert({
        user_id: user.id,
        flashcard_id: flashcard.id,
        tag: tag,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,flashcard_id'
      });

    if (error) {
      console.error('Error setting tag:', error);
    } else {
      setTags(prev => ({ ...prev, [flashcard.id]: tag }));

      if (currentIndex < flashcards.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setIsFlipped(false);
        }, 300);
      }
    }
  }

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleNext() {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-coral text-lg font-light">Loading flashcards...</div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-cream p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to={`/units/${unitId}/lessons`}
            className="inline-flex items-center text-charcoal hover:text-coral mb-6 font-light"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to lessons
          </Link>
          <div className="bg-white rounded-card-lg p-8 text-center">
            <p className="text-charcoal font-light">No flashcards available for this unit yet.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const currentTag = tags[currentCard.id];

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/units/${unitId}/lessons`}
            className="inline-flex items-center text-charcoal hover:text-coral font-light"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to lessons
          </Link>
          <div className="text-sm text-muted font-light">
            Card {currentIndex + 1} of {flashcards.length}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-charcoal mb-2">Test Your Memory</h1>
        <p className="text-muted font-light mb-8">{unitTitle}</p>

        <div className="flex flex-col items-center space-y-6">
          <div
            onClick={handleFlip}
            className="relative w-full max-w-2xl h-96 cursor-pointer perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className="absolute inset-0 bg-white rounded-card-lg shadow-lg p-12 flex items-center justify-center backface-hidden border-2 border-coral"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <div className="text-sm text-muted font-medium mb-4">SPANISH</div>
                  <p className="text-4xl font-bold text-charcoal">{currentCard.spanish_text}</p>
                  <p className="text-sm text-muted mt-8 font-light">Click to flip</p>
                </div>
              </div>

              <div
                className="absolute inset-0 bg-white rounded-card-lg shadow-lg p-12 flex items-center justify-center backface-hidden border-2 border-teal"
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

          {currentTag && (
            <div className="flex items-center gap-2 text-sm font-medium">
              {currentTag === 'needs_practice' && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                  Needs Practice
                </span>
              )}
              {currentTag === 'mastered' && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  Mastered!
                </span>
              )}
            </div>
          )}

          <div className="flex gap-4 w-full max-w-2xl">
            <button
              onClick={() => setTag('needs_practice')}
              disabled={!user}
              className="flex-1 bg-amber-500 text-white py-4 rounded-card font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RotateCw className="w-5 h-5" />
              Needs Practice
            </button>
            <button
              onClick={() => setTag('mastered')}
              disabled={!user}
              className="flex-1 bg-green-600 text-white py-4 rounded-card font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Mastered!
            </button>
          </div>

          {!user && (
            <p className="text-sm text-muted font-light">
              <a href="/auth" className="text-coral hover:text-coral-dark underline underline-offset-2 transition-colors">Sign in</a> to save your progress
            </p>
          )}

          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-6 py-2 bg-white border-2 border-charcoal text-charcoal rounded-card font-medium hover:bg-charcoal hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="px-6 py-2 bg-white border-2 border-charcoal text-charcoal rounded-card font-medium hover:bg-charcoal hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
