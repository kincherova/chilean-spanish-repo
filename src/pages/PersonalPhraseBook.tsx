import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, BookMarked, RotateCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface PhraseBookEntry {
  id: string;
  spanish_text: string;
  english_text: string;
  unit_title: string;
  unit_id: string;
}

export default function PersonalPhraseBook() {
  const { user } = useAuth();
  const [phrases, setPhrases] = useState<PhraseBookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPhrases();
    } else {
      setLoading(false);
    }
  }, [user]);

  async function loadPhrases() {
    if (!user) return;

    try {
      // First get the tagged flashcard IDs
      const { data: tagData, error: tagError } = await supabase
        .from('user_flashcard_tags')
        .select('flashcard_id')
        .eq('user_id', user.id)
        .eq('tag', 'needs_practice');

      console.log('Tag data:', tagData, 'Error:', tagError);

      if (tagError) throw tagError;

      if (!tagData || tagData.length === 0) {
        setPhrases([]);
        return;
      }

      const flashcardIds = tagData.map(t => t.flashcard_id);
      console.log('Flashcard IDs:', flashcardIds);

      // Get flashcards
      const { data: flashcardData, error: flashcardError } = await supabase
        .from('flashcards')
        .select('id, spanish_text, english_text, unit_id')
        .in('id', flashcardIds);

      console.log('Flashcard data:', flashcardData, 'Error:', flashcardError);

      if (flashcardError) throw flashcardError;

      if (!flashcardData || flashcardData.length === 0) {
        setPhrases([]);
        return;
      }

      // Get unique unit IDs
      const unitIds = [...new Set(flashcardData.map((f: any) => f.unit_id))];
      console.log('Unit IDs:', unitIds);

      // Get units
      const { data: unitsData, error: unitsError } = await supabase
        .from('units')
        .select('id, title')
        .in('id', unitIds);

      console.log('Units data:', unitsData, 'Error:', unitsError);

      if (unitsError) throw unitsError;

      // Create a map of unit titles
      const unitTitles: Record<string, string> = {};
      (unitsData || []).forEach((unit: any) => {
        unitTitles[unit.id] = unit.title;
      });

      const formattedPhrases: PhraseBookEntry[] = flashcardData.map((item: any) => ({
        id: item.id,
        spanish_text: item.spanish_text,
        english_text: item.english_text,
        unit_title: unitTitles[item.unit_id] || 'Unknown Unit',
        unit_id: item.unit_id,
      }));

      console.log('Final formatted phrases:', formattedPhrases);
      setPhrases(formattedPhrases);
    } catch (error) {
      console.error('Error loading phrases:', error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFromPhraseBook(flashcardId: string) {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_flashcard_tags')
        .delete()
        .eq('user_id', user.id)
        .eq('flashcard_id', flashcardId);

      if (error) throw error;

      setPhrases(prev => prev.filter(p => p.id !== flashcardId));
    } catch (error) {
      console.error('Error removing phrase:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-coral text-lg font-light">Loading your phrase book...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-charcoal hover:text-coral mb-6 font-light"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to home
          </Link>
          <div className="bg-white rounded-card-lg p-8 text-center">
            <BookMarked className="w-16 h-16 text-muted mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-charcoal mb-2">Sign in Required</h2>
            <p className="text-muted font-light mb-6">
              Sign in to save phrases to your personal phrase book
            </p>
            <Link
              to="/auth"
              className="inline-block bg-coral text-white px-6 py-3 rounded-card font-medium hover:bg-coral/90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-charcoal hover:text-coral mb-6 font-light"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to home
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookMarked className="w-8 h-8 text-coral" />
            <h1 className="text-4xl font-bold text-charcoal">Your Personal Phrase Book</h1>
          </div>
          <p className="text-muted font-light">
            Phrases you've marked as needing practice
          </p>
        </div>

        {phrases.length === 0 ? (
          <div className="bg-white rounded-card-lg p-12 text-center">
            <RotateCw className="w-16 h-16 text-muted mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-charcoal mb-2">No phrases yet</h2>
            <p className="text-muted font-light mb-6">
              Start practicing lessons and mark phrases as "Needs Practice" to add them here
            </p>
            <Link
              to="/"
              className="inline-block bg-coral text-white px-6 py-3 rounded-card font-medium hover:bg-coral/90 transition-colors"
            >
              Browse Lessons
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-card-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {phrases.map((phrase) => (
                <div
                  key={phrase.id}
                  className="p-6 hover:bg-cream/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          {phrase.unit_title}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted font-medium mb-1">SPANISH</div>
                          <p className="text-xl font-bold text-charcoal truncate">{phrase.spanish_text}</p>
                        </div>
                        <div>
                          <div className="text-xs text-muted font-medium mb-1">ENGLISH</div>
                          <p className="text-lg text-charcoal font-light truncate">{phrase.english_text}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 gap-2">
                      <Link
                        to={`/units/${phrase.unit_id}/test-memory`}
                        className="px-4 py-2 bg-teal text-white rounded-card text-sm font-medium hover:bg-teal/90 transition-colors whitespace-nowrap"
                      >
                        Practice
                      </Link>
                      <button
                        onClick={() => removeFromPhraseBook(phrase.id)}
                        className="px-4 py-2 bg-white border-2 border-charcoal text-charcoal rounded-card text-sm font-medium hover:bg-charcoal hover:text-white transition-colors whitespace-nowrap"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
