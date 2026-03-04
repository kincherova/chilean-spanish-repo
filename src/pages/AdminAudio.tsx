import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface Phrase {
  spanish: string;
  english: string;
  audioUrl?: string;
}

interface Lesson {
  id: string;
  title: string;
  content: {
    pages?: Array<{
      type: string;
      phrases?: Phrase[];
    }>;
  };
}

interface VocabUnit {
  id: string;
  title: string;
}

interface VocabFlashcard {
  id: string;
  spanish_text: string;
  english_text: string;
  order_index: number;
  audio_url?: string;
}

type AdminTab = 'lessons' | 'vocabulary';

export default function AdminAudio() {
  const [activeTab, setActiveTab] = useState<AdminTab>('lessons');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audio Upload Admin</h1>
          <p className="text-gray-600 mb-6">Upload pronunciation audio for phrases and vocabulary words</p>

          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === 'lessons'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Lesson Phrases
            </button>
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === 'vocabulary'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Vocabulary Words
            </button>
          </div>

          {activeTab === 'lessons' && <LessonPhraseUploader />}
          {activeTab === 'vocabulary' && <VocabularyWordUploader />}
        </div>
      </div>
    </div>
  );
}

function LessonPhraseUploader() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [selectedPhrase, setSelectedPhrase] = useState<number>(-1);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('id, title, content')
        .order('title');

      if (error) throw error;

      const lessonsWithPhrases = (data || []).filter((lesson: Lesson) => {
        const pages = lesson.content?.pages || [];
        return pages.some(page => page.phrases && page.phrases.length > 0);
      });

      setLessons(lessonsWithPhrases);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setMessage({ type: 'error', text: 'Failed to load lessons' });
    } finally {
      setLoading(false);
    }
  };

  const getPhrases = (lessonId: string): Phrase[] => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return [];
    const pages = lesson.content?.pages || [];
    for (const page of pages) {
      if (page.phrases && page.phrases.length > 0) return page.phrases;
    }
    return [];
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || selectedLesson === '' || selectedPhrase === -1) return;

    setUploading(true);
    setMessage(null);

    try {
      const phrases = getPhrases(selectedLesson);
      const phrase = phrases[selectedPhrase];
      const fileName = `phrases/${selectedLesson}_${selectedPhrase}_${Date.now()}.mp3`;

      const { error: uploadError } = await supabase.storage
        .from('audio-lessons')
        .upload(fileName, file, { contentType: 'audio/mpeg', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('audio-lessons')
        .getPublicUrl(fileName);

      const lesson = lessons.find(l => l.id === selectedLesson);
      if (!lesson) throw new Error('Lesson not found');

      const updatedContent = { ...lesson.content };
      const pages = updatedContent.pages || [];

      for (const page of pages) {
        if (page.phrases && page.phrases.length > 0) {
          page.phrases[selectedPhrase] = { ...page.phrases[selectedPhrase], audioUrl: publicUrl };
          break;
        }
      }

      const { error: updateError } = await supabase
        .from('lessons')
        .update({ content: updatedContent })
        .eq('id', selectedLesson);

      if (updateError) throw updateError;

      setMessage({ type: 'success', text: `Audio uploaded for "${phrase.spanish}"!` });
      await fetchLessons();
      event.target.value = '';
    } catch (error: any) {
      console.error('Error uploading audio:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to upload audio' });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const currentPhrases = selectedLesson ? getPhrases(selectedLesson) : [];

  return (
    <div className="space-y-6">
      <StatusMessage message={message} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">1. Select Lesson</label>
        <select
          value={selectedLesson}
          onChange={(e) => { setSelectedLesson(e.target.value); setSelectedPhrase(-1); }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a lesson...</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
          ))}
        </select>
      </div>

      {selectedLesson && currentPhrases.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">2. Select Phrase</label>
          <div className="space-y-2 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {currentPhrases.map((phrase, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhrase(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedPhrase === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="font-medium text-gray-900">{phrase.spanish}</div>
                <div className="text-sm text-gray-600">{phrase.english}</div>
                {phrase.audioUrl && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Has audio</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedLesson && selectedPhrase !== -1 && (
        <AudioUploadDropzone uploading={uploading} inputId="lesson-audio-upload" onChange={handleFileUpload} />
      )}
    </div>
  );
}

function VocabularyWordUploader() {
  const [units, setUnits] = useState<VocabUnit[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [flashcards, setFlashcards] = useState<VocabFlashcard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);

  useEffect(() => {
    fetchVocabUnits();
  }, []);

  const fetchVocabUnits = async () => {
    try {
      const { data, error } = await supabase
        .from('units')
        .select('id, title')
        .eq('unit_type', 'vocabulary')
        .order('title');

      if (error) throw error;
      setUnits(data || []);
    } catch (error) {
      console.error('Error fetching vocabulary units:', error);
      setMessage({ type: 'error', text: 'Failed to load vocabulary units' });
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChange = async (unitId: string) => {
    setSelectedUnitId(unitId);
    setSelectedCardId('');
    setFlashcards([]);
    if (!unitId) return;

    setLoadingCards(true);
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('id, spanish_text, english_text, order_index, audio_url')
        .eq('unit_id', unitId)
        .order('order_index');

      if (error) throw error;
      setFlashcards(data || []);
    } catch (error: any) {
      console.error('Error fetching flashcards:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to load vocabulary words' });
    } finally {
      setLoadingCards(false);
    }
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedCardId) return;

    setUploading(true);
    setMessage(null);

    try {
      const card = flashcards.find(c => c.id === selectedCardId);
      if (!card) throw new Error('Flashcard not found');

      const fileName = `vocab/${selectedUnitId}_${selectedCardId}_${Date.now()}.mp3`;

      const { error: uploadError } = await supabase.storage
        .from('audio-lessons')
        .upload(fileName, file, { contentType: 'audio/mpeg', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('audio-lessons')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('flashcards')
        .update({ audio_url: publicUrl })
        .eq('id', selectedCardId);

      if (updateError) throw updateError;

      setMessage({ type: 'success', text: `Audio uploaded for "${card.spanish_text}"!` });

      setFlashcards(prev => prev.map(c => c.id === selectedCardId ? { ...c, audio_url: publicUrl } : c));
      event.target.value = '';
    } catch (error: any) {
      console.error('Error uploading audio:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to upload audio' });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatusMessage message={message} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">1. Select Vocabulary Unit</label>
        <select
          value={selectedUnitId}
          onChange={(e) => handleUnitChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">Choose a vocabulary unit...</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>{unit.title}</option>
          ))}
        </select>
      </div>

      {selectedUnitId && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">2. Select Word</label>
          {loadingCards ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
            </div>
          ) : flashcards.length === 0 ? (
            <div className="border border-gray-200 rounded-lg p-8 text-center text-gray-500">
              No vocabulary words found for this unit.
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {flashcards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardSelect(card.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedCardId === card.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="font-medium text-gray-900">{card.spanish_text}</div>
                  <div className="text-sm text-gray-600">{card.english_text}</div>
                  {card.audio_url && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Has audio</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedCardId && (
        <AudioUploadDropzone uploading={uploading} inputId="vocab-audio-upload" onChange={handleFileUpload} />
      )}
    </div>
  );
}

function AudioUploadDropzone({
  uploading,
  inputId,
  onChange,
}: {
  uploading: boolean;
  inputId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">3. Upload Audio File</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept="audio/mpeg,audio/mp3"
          onChange={onChange}
          disabled={uploading}
          className="hidden"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className={`cursor-pointer flex flex-col items-center gap-3 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {uploading ? (
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}
          <div>
            <span className="text-blue-600 font-medium">
              {uploading ? 'Uploading...' : 'Click to upload'}
            </span>
            <span className="text-gray-600"> or drag and drop</span>
          </div>
          <span className="text-sm text-gray-500">MP3 files only (max 10MB)</span>
        </label>
      </div>
    </div>
  );
}

function StatusMessage({ message }: { message: { type: 'success' | 'error'; text: string } | null }) {
  if (!message) return null;
  return (
    <div className={`p-4 rounded-lg flex items-start gap-3 ${
      message.type === 'success'
        ? 'bg-green-50 text-green-800 border border-green-200'
        : 'bg-red-50 text-red-800 border border-red-200'
    }`}>
      {message.type === 'success' ? (
        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      )}
      <span>{message.text}</span>
    </div>
  );
}
