import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronRight, BookOpen, BookMarked, RotateCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  icon: string;
}

interface PhraseBookEntry {
  id: string;
  spanish_text: string;
  english_text: string;
  unit_title: string;
  unit_id: string;
}

type TabType = 'learn' | 'phrasebook';

export default function ModulesList() {
  const navigate = useNavigate();
  const { signOut, profile, user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [phrases, setPhrases] = useState<PhraseBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [phrasesLoading, setPhrasesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('learn');

  useEffect(() => {
    loadModules();
  }, []);

  useEffect(() => {
    if (activeTab === 'phrasebook' && user) {
      loadPhrases();
    }
  }, [activeTab, user]);

  const loadModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setModules(data || []);
    } catch (error) {
      console.error('Error loading modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPhrases = async () => {
    if (!user) {
      setPhrases([]);
      return;
    }

    setPhrasesLoading(true);
    try {
      const { data: tagData, error: tagError } = await supabase
        .from('user_flashcard_tags')
        .select('flashcard_id')
        .eq('user_id', user.id)
        .eq('tag', 'needs_practice');

      if (tagError) throw tagError;

      if (!tagData || tagData.length === 0) {
        setPhrases([]);
        return;
      }

      const flashcardIds = tagData.map(t => t.flashcard_id);

      const { data: flashcardData, error: flashcardError } = await supabase
        .from('flashcards')
        .select('id, spanish_text, english_text, unit_id')
        .in('id', flashcardIds);

      if (flashcardError) throw flashcardError;

      if (!flashcardData || flashcardData.length === 0) {
        setPhrases([]);
        return;
      }

      const unitIds = [...new Set(flashcardData.map((f: any) => f.unit_id))];

      const { data: unitsData, error: unitsError } = await supabase
        .from('units')
        .select('id, title')
        .in('id', unitIds);

      if (unitsError) throw unitsError;

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

      setPhrases(formattedPhrases);
    } catch (error) {
      console.error('Error loading phrases:', error);
    } finally {
      setPhrasesLoading(false);
    }
  };

  const removeFromPhraseBook = async (flashcardId: string) => {
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
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-coral text-lg font-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🇨🇱</div>
            <div>
              <h1 className="text-xl font-light text-navy">
                Survival Chilean Spanish
              </h1>
              {profile && (
                <p className="text-sm text-muted font-light">
                  Welcome back, {profile.name}
                </p>
              )}
            </div>
          </div>
          {profile ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-muted hover:text-navy transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline font-light">Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="text-sm font-medium text-coral hover:text-coral-dark transition-colors"
            >
              Sign in
            </button>
          )}
        </header>

        <div className="flex gap-2 mb-8 bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-1">
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-card transition-all ${
              activeTab === 'learn'
                ? 'bg-coral text-white shadow-sm'
                : 'text-muted hover:text-navy'
            }`}
          >
            <BookOpen className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium">Learn</span>
          </button>
          <button
            onClick={() => setActiveTab('phrasebook')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-card transition-all ${
              activeTab === 'phrasebook'
                ? 'bg-coral text-white shadow-sm'
                : 'text-muted hover:text-navy'
            }`}
          >
            <BookMarked className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium">Your personal phrase book</span>
          </button>
        </div>

        {activeTab === 'learn' && (
          <>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-2">
                Choose Your Module
              </h2>
              <p className="text-muted font-light">
                Each module focuses on practical situations you'll encounter
              </p>
            </div>

        {modules.length === 0 ? (
          <div className="bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-8 text-center">
            <p className="text-muted font-light">
              No modules available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((module) => {
              const isReady = module.order_index <= 5;
              const isClickable = isReady;
              const emojiMatch = module.title.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u);
              const emoji = emojiMatch ? emojiMatch[0] : '';
              const titleText = module.title.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, '');

              return (
                <div
                  key={module.id}
                  onClick={isClickable ? () => navigate(`/modules/${module.id}/units`) : undefined}
                  className={`w-full bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-6 flex items-center justify-between min-h-[48px] ${
                    isClickable ? 'hover:shadow-md transition-all cursor-pointer group' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-4 text-left flex-1">
                    <div className="text-4xl">
                      {emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-navy mb-1">
                        {titleText}
                      </h3>
                      <p className="text-muted text-sm font-light mb-2">
                        {module.description}
                      </p>
                      {!isReady && (
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                  {isClickable && (
                    <ChevronRight className="w-6 h-6 text-muted group-hover:text-coral transition-colors" strokeWidth={1.5} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted font-light italic">
          New module coming soon — stay tuned!
        </p>
          </>
        )}

        {activeTab === 'phrasebook' && (
          <>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-2">
                Your Personal Phrase Book
              </h2>
              <p className="text-muted font-light">
                Phrases you've marked as "needs practice" will appear here
              </p>
            </div>

            {!user ? (
              <div className="bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-12 text-center">
                <BookMarked className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-charcoal mb-2">Sign in Required</h3>
                <p className="text-muted font-light mb-6">
                  Sign in to save phrases to your personal phrase book
                </p>
                <button
                  onClick={() => navigate('/auth')}
                  className="inline-block bg-coral text-white px-6 py-3 rounded-card font-medium hover:bg-coral/90 transition-colors"
                >
                  Sign In
                </button>
              </div>
            ) : phrasesLoading ? (
              <div className="bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-12 text-center">
                <p className="text-muted font-light">Loading your phrases...</p>
              </div>
            ) : phrases.length === 0 ? (
              <div className="bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-12 text-center">
                <RotateCw className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-charcoal mb-2">No phrases yet</h3>
                <p className="text-muted font-light mb-6">
                  Start practicing lessons and mark phrases as "Needs Practice" to add them here
                </p>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="inline-block bg-coral text-white px-6 py-3 rounded-card font-medium hover:bg-coral/90 transition-colors"
                >
                  Browse Lessons
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] overflow-hidden">
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
                              <p className="text-xl font-bold text-charcoal">{phrase.spanish_text}</p>
                            </div>
                            <div>
                              <div className="text-xs text-muted font-medium mb-1">ENGLISH</div>
                              <p className="text-lg text-charcoal font-light">{phrase.english_text}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-shrink-0 gap-2">
                          <button
                            onClick={() => navigate(`/units/${phrase.unit_id}/test-memory`)}
                            className="px-4 py-2 bg-teal text-white rounded-card text-sm font-medium hover:bg-teal/90 transition-colors whitespace-nowrap"
                          >
                            Practice
                          </button>
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
          </>
        )}

        <footer className="mt-12 pt-8 border-t border-[#f0e8e0] text-center">
          <p className="text-muted text-sm font-light">
            Designed for travelers. Powered by Humans.
          </p>
        </footer>
      </div>
    </div>
  );
}
