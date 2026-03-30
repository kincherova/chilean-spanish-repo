import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Volume2, Check, X, ChevronDown, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { playAudio } from '../lib/audio';

interface VocabUnit {
  id: string;
  title: string;
  module_title: string;
  module_order: number;
  order_index: number;
  flashcard_count: number;
  with_audio: number;
}

interface Flashcard {
  id: string;
  spanish_text: string;
  english_text: string;
  audio_url: string | null;
  order_index: number;
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

interface UploadStatus {
  [flashcardId: string]: { state: UploadState; message?: string };
}

export default function AdminAudioPage() {
  const navigate = useNavigate();
  const [units, setUnits] = useState<VocabUnit[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({});
  const [draggingOver, setDraggingOver] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [id: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }

      const { data } = await supabase.rpc('get_vocab_units_with_audio_count');
      if (data) {
        setUnits(data);
      } else {
        const { data: rawUnits } = await supabase
          .from('units')
          .select('id, title, order_index, unit_type, modules(title, order_index)')
          .eq('unit_type', 'vocabulary')
          .order('order_index');
        if (rawUnits) {
          const mapped = (rawUnits as unknown as {
            id: string; title: string; order_index: number;
            modules: { title: string; order_index: number };
          }[]).map(u => ({
            id: u.id,
            title: u.title,
            module_title: u.modules?.title ?? '',
            module_order: u.modules?.order_index ?? 0,
            order_index: u.order_index,
            flashcard_count: 0,
            with_audio: 0,
          }));
          setUnits(mapped.sort((a, b) => a.module_order - b.module_order || a.order_index - b.order_index));
        }
      }
      setLoadingUnits(false);
    })();
  }, [navigate]);

  useEffect(() => {
    if (!selectedUnitId) return;
    setLoadingCards(true);
    setFlashcards([]);
    setUploadStatus({});
    (async () => {
      const { data } = await supabase
        .from('flashcards')
        .select('id, spanish_text, english_text, audio_url, order_index')
        .eq('unit_id', selectedUnitId)
        .order('order_index');
      setFlashcards((data as Flashcard[]) ?? []);
      setLoadingCards(false);
    })();
  }, [selectedUnitId]);

  const handleFileUpload = async (flashcardId: string, file: File) => {
    if (!file.type.startsWith('audio/')) {
      setUploadStatus(s => ({ ...s, [flashcardId]: { state: 'error', message: 'File must be an audio file' } }));
      return;
    }

    setUploadStatus(s => ({ ...s, [flashcardId]: { state: 'uploading' } }));

    const ext = file.name.split('.').pop() ?? 'mp3';
    const path = `vocab/${selectedUnitId}_${flashcardId}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('audio-lessons')
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setUploadStatus(s => ({ ...s, [flashcardId]: { state: 'error', message: uploadError.message } }));
      return;
    }

    const { data: urlData } = supabase.storage.from('audio-lessons').getPublicUrl(path);
    const publicUrl = urlData.publicUrl;

    const { error: dbError } = await supabase
      .from('flashcards')
      .update({ audio_url: publicUrl })
      .eq('id', flashcardId);

    if (dbError) {
      setUploadStatus(s => ({ ...s, [flashcardId]: { state: 'error', message: dbError.message } }));
      return;
    }

    setFlashcards(cards =>
      cards.map(c => c.id === flashcardId ? { ...c, audio_url: publicUrl } : c)
    );
    setUploadStatus(s => ({ ...s, [flashcardId]: { state: 'success' } }));

    setTimeout(() => {
      setUploadStatus(s => {
        const next = { ...s };
        if (next[flashcardId]?.state === 'success') delete next[flashcardId];
        return next;
      });
    }, 3000);
  };

  const handleRemoveAudio = async (flashcardId: string) => {
    setUploadStatus(s => ({ ...s, [flashcardId]: { state: 'uploading' } }));
    const { error } = await supabase
      .from('flashcards')
      .update({ audio_url: null })
      .eq('id', flashcardId);

    if (error) {
      setUploadStatus(s => ({ ...s, [flashcardId]: { state: 'error', message: error.message } }));
      return;
    }

    setFlashcards(cards =>
      cards.map(c => c.id === flashcardId ? { ...c, audio_url: null } : c)
    );
    setUploadStatus(s => {
      const next = { ...s };
      delete next[flashcardId];
      return next;
    });
  };

  const handleDrop = async (flashcardId: string, e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(null);
    const file = e.dataTransfer.files[0];
    if (file) await handleFileUpload(flashcardId, file);
  };

  const selectedUnit = units.find(u => u.id === selectedUnitId);

  const grouped = units.reduce<Record<string, VocabUnit[]>>((acc, u) => {
    if (!acc[u.module_title]) acc[u.module_title] = [];
    acc[u.module_title].push(u);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-navy text-white font-body px-4 py-10">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-white">Audio Manager</h1>
          <p className="text-white/40 text-sm mt-1">Upload pronunciation audio for vocabulary flashcards</p>
        </div>

        {/* Unit selector */}
        <div className="mb-8">
          <label className="block text-white/60 text-sm font-medium mb-2">Select vocabulary unit</label>
          <div className="relative">
            <select
              value={selectedUnitId}
              onChange={e => setSelectedUnitId(e.target.value)}
              disabled={loadingUnits}
              className="w-full appearance-none bg-white/5 border border-white/15 text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-white/30 cursor-pointer disabled:opacity-50"
            >
              <option value="" className="bg-[#1a2744]">— Choose a unit —</option>
              {Object.entries(grouped).map(([moduleTitle, moduleUnits]) => (
                <optgroup key={moduleTitle} label={moduleTitle} className="bg-[#1a2744]">
                  {moduleUnits.map(u => (
                    <option key={u.id} value={u.id} className="bg-[#1a2744]">
                      {u.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
        </div>

        {/* Progress bar */}
        {selectedUnit && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 mb-6 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/60 text-sm">{selectedUnit.module_title} — {selectedUnit.title}</span>
                <span className="text-white/40 text-xs">
                  {flashcards.filter(f => f.audio_url).length} / {flashcards.length} with audio
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal rounded-full transition-all duration-500"
                  style={{ width: flashcards.length > 0 ? `${(flashcards.filter(f => f.audio_url).length / flashcards.length) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Flashcard list */}
        {loadingCards ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-white/30" />
          </div>
        ) : flashcards.length > 0 ? (
          <div className="space-y-3">
            {flashcards.map(card => {
              const status = uploadStatus[card.id];
              const isUploading = status?.state === 'uploading';
              const isSuccess = status?.state === 'success';
              const isError = status?.state === 'error';
              const isDragging = draggingOver === card.id;

              return (
                <div
                  key={card.id}
                  className={`bg-white/5 border rounded-xl px-5 py-4 transition-colors ${
                    isDragging ? 'border-teal/60 bg-teal/5' : 'border-white/10'
                  }`}
                  onDragOver={e => { e.preventDefault(); setDraggingOver(card.id); }}
                  onDragLeave={() => setDraggingOver(null)}
                  onDrop={e => handleDrop(card.id, e)}
                >
                  <div className="flex items-center gap-4">
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-base truncate">{card.spanish_text}</p>
                      <p className="text-white/40 text-sm truncate">{card.english_text}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Play existing audio */}
                      {card.audio_url && !isUploading && (
                        <button
                          onClick={() => playAudio(card.audio_url!)}
                          className="w-8 h-8 rounded-lg bg-teal/20 hover:bg-teal/30 flex items-center justify-center transition-colors"
                          title="Preview audio"
                        >
                          <Volume2 size={14} className="text-teal" />
                        </button>
                      )}

                      {/* Remove audio */}
                      {card.audio_url && !isUploading && (
                        <button
                          onClick={() => handleRemoveAudio(card.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors group"
                          title="Remove audio"
                        >
                          <Trash2 size={14} className="text-white/30 group-hover:text-red-400 transition-colors" />
                        </button>
                      )}

                      {/* Status indicator */}
                      {isUploading && (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Loader2 size={16} className="animate-spin text-white/50" />
                        </div>
                      )}
                      {isSuccess && (
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <Check size={14} className="text-green-400" />
                        </div>
                      )}
                      {isError && (
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center" title={status.message}>
                          <X size={14} className="text-red-400" />
                        </div>
                      )}

                      {/* Upload button */}
                      {!isUploading && (
                        <>
                          <input
                            ref={el => { fileInputRefs.current[card.id] = el; }}
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(card.id, file);
                              e.target.value = '';
                            }}
                          />
                          <button
                            onClick={() => fileInputRefs.current[card.id]?.click()}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              card.audio_url
                                ? 'bg-white/8 hover:bg-white/15 text-white/50 hover:text-white/80'
                                : 'bg-teal/20 hover:bg-teal/30 text-teal'
                            }`}
                          >
                            <Upload size={12} />
                            {card.audio_url ? 'Replace' : 'Upload'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Error message */}
                  {isError && status.message && (
                    <p className="mt-2 text-red-400 text-xs">{status.message}</p>
                  )}

                  {/* Drop hint */}
                  {isDragging && (
                    <p className="mt-2 text-teal text-xs">Drop audio file here</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : selectedUnitId && !loadingCards ? (
          <div className="text-center py-20 text-white/30 text-sm">No flashcards found in this unit.</div>
        ) : null}

      </div>
    </div>
  );
}
