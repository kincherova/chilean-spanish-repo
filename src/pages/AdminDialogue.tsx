import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ChevronLeft, Save, X, ChevronDown, ChevronUp, MessageCircle, GripVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Lesson {
  id: string;
  title: string;
}

type Speaker = 'local' | 'tourist' | 'waiter';

interface DialogueLine {
  speaker: Speaker;
  name?: string;
  spanish: string;
  english?: string;
}

interface DialoguePage {
  type: 'dialogue';
  title?: string;
  subtitle?: string;
  dialogue: DialogueLine[];
  pageIndex: number;
}

interface EditingLine {
  index: number;
  speaker: Speaker;
  name: string;
  spanish: string;
  english: string;
}

const SPEAKER_OPTIONS: { value: Speaker; label: string }[] = [
  { value: 'local', label: 'Local' },
  { value: 'tourist', label: 'Tourist' },
  { value: 'waiter', label: 'Waiter' },
];

const SPEAKER_COLORS: Record<Speaker, string> = {
  local: 'text-coral',
  tourist: 'text-teal',
  waiter: 'text-amber-600',
};

const SPEAKER_BG: Record<Speaker, string> = {
  local: 'bg-coral/10',
  tourist: 'bg-teal/10',
  waiter: 'bg-amber-50',
};

export default function AdminDialogue() {
  const { user, loading: authLoading } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [dialoguePages, setDialoguePages] = useState<DialoguePage[]>([]);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [editingLine, setEditingLine] = useState<EditingLine | null>(null);
  const [addingLine, setAddingLine] = useState(false);
  const [newLine, setNewLine] = useState<Omit<EditingLine, 'index'>>({ speaker: 'local', name: '', spanish: '', english: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  useEffect(() => {
    if (selectedLessonId) {
      loadDialoguePages();
    }
  }, [selectedLessonId]);

  async function loadLessons() {
    const { data, error } = await supabase
      .from('lessons')
      .select('id, title')
      .order('title');
    if (!error && data) {
      setLessons(data);
      if (data.length > 0) setSelectedLessonId(data[0].id);
    }
    setLoading(false);
  }

  async function loadDialoguePages() {
    setDialoguePages([]);
    setEditingLine(null);
    setAddingLine(false);
    setDeleteConfirmIndex(null);
    setSelectedPageIndex(0);

    const { data, error } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', selectedLessonId)
      .maybeSingle();

    if (error || !data) return;

    const pages = data.content?.pages ?? [];
    const found: DialoguePage[] = pages
      .map((p: Record<string, unknown>, i: number) => ({ ...p, pageIndex: i }))
      .filter((p: Record<string, unknown>) => p.type === 'dialogue') as DialoguePage[];

    setDialoguePages(found);
  }

  const activePage = dialoguePages[selectedPageIndex] ?? null;

  async function getFullContent(): Promise<{ pages: Record<string, unknown>[] } | null> {
    const { data, error } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', selectedLessonId)
      .maybeSingle();
    if (error || !data) return null;
    return data.content;
  }

  async function persistLines(newLines: DialogueLine[]): Promise<boolean> {
    const content = await getFullContent();
    if (!content) { alert('Error loading lesson data'); return false; }

    const pages = content.pages.map((p: Record<string, unknown>, i: number) => {
      if (i !== activePage.pageIndex) return p;
      return { ...p, dialogue: newLines };
    });

    const { error } = await supabase
      .from('lessons')
      .update({ content: { ...content, pages } })
      .eq('id', selectedLessonId);

    if (error) { alert('Error saving changes'); return false; }
    return true;
  }

  function startEdit(lineIndex: number) {
    setDeleteConfirmIndex(null);
    setAddingLine(false);
    const line = activePage.dialogue[lineIndex];
    setEditingLine({
      index: lineIndex,
      speaker: line.speaker,
      name: line.name ?? '',
      spanish: line.spanish,
      english: line.english ?? '',
    });
  }

  function cancelEdit() {
    setEditingLine(null);
  }

  async function saveLine() {
    if (!editingLine) return;
    if (!editingLine.spanish.trim()) { alert('Spanish text is required.'); return; }

    setSaving(true);
    const newLines = activePage.dialogue.map((l, i) => {
      if (i !== editingLine.index) return l;
      return {
        speaker: editingLine.speaker,
        ...(editingLine.name.trim() ? { name: editingLine.name.trim() } : {}),
        spanish: editingLine.spanish.trim(),
        ...(editingLine.english.trim() ? { english: editingLine.english.trim() } : {}),
      };
    });

    const ok = await persistLines(newLines);
    setSaving(false);
    if (!ok) return;
    setEditingLine(null);
    flashSuccess();
    await loadDialoguePages();
  }

  async function deleteLine(lineIndex: number) {
    setSaving(true);
    const newLines = activePage.dialogue.filter((_, i) => i !== lineIndex);
    const ok = await persistLines(newLines);
    setSaving(false);
    if (!ok) return;
    setDeleteConfirmIndex(null);
    flashSuccess();
    await loadDialoguePages();
  }

  async function addLine() {
    if (!newLine.spanish.trim()) { alert('Spanish text is required.'); return; }
    setSaving(true);
    const line: DialogueLine = {
      speaker: newLine.speaker,
      ...(newLine.name.trim() ? { name: newLine.name.trim() } : {}),
      spanish: newLine.spanish.trim(),
      ...(newLine.english.trim() ? { english: newLine.english.trim() } : {}),
    };
    const newLines = [...activePage.dialogue, line];
    const ok = await persistLines(newLines);
    setSaving(false);
    if (!ok) return;
    setAddingLine(false);
    setNewLine({ speaker: 'local', name: '', spanish: '', english: '' });
    flashSuccess();
    await loadDialoguePages();
  }

  function flashSuccess() {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-coral text-lg font-light">Loading...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-charcoal hover:text-coral mb-6 font-light"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold text-charcoal mb-2">Dialogues</h1>
        <p className="text-muted font-light mb-8">Edit dialogue lines in any lesson</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-charcoal mb-2">Select Lesson</label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="w-full px-4 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral"
            >
              {lessons.map(lesson => (
                <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
              ))}
            </select>
          </div>

          {dialoguePages.length > 1 && (
            <div className="sm:w-56">
              <label className="block text-sm font-medium text-charcoal mb-2">Dialogue</label>
              <select
                value={selectedPageIndex}
                onChange={(e) => {
                  setSelectedPageIndex(Number(e.target.value));
                  setEditingLine(null);
                  setAddingLine(false);
                  setDeleteConfirmIndex(null);
                }}
                className="w-full px-4 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral"
              >
                {dialoguePages.map((p, i) => (
                  <option key={i} value={i}>{p.title ?? `Dialogue ${i + 1}`}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {saveSuccess && (
          <div className="mb-4 px-4 py-3 bg-green-50 border-2 border-green-400 rounded-card text-green-700 font-medium">
            Changes saved successfully.
          </div>
        )}

        {!activePage ? (
          <div className="bg-white rounded-card-lg p-8 shadow-sm text-center text-muted font-light">
            No dialogue found for this lesson.
          </div>
        ) : (
          <div>
            {activePage.title && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-charcoal">{activePage.title}</h2>
                {activePage.subtitle && (
                  <p className="text-sm text-muted font-light">{activePage.subtitle}</p>
                )}
              </div>
            )}

            <div className="space-y-2 mb-4">
              {activePage.dialogue.map((line, lineIndex) => {
                const isEditing = editingLine?.index === lineIndex;
                const isConfirmingDelete = deleteConfirmIndex === lineIndex;
                const speakerLabel = line.name ?? (line.speaker === 'local' ? 'Local' : line.speaker === 'waiter' ? 'Waiter' : 'Tourist');

                return (
                  <div
                    key={lineIndex}
                    className={`bg-white rounded-card-lg border-2 shadow-sm transition-colors ${
                      isEditing ? 'border-coral' : isConfirmingDelete ? 'border-red-400' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    {isEditing ? (
                      <div className="p-5 space-y-3">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-charcoal mb-1">Speaker</label>
                            <select
                              value={editingLine.speaker}
                              onChange={(e) => setEditingLine({ ...editingLine, speaker: e.target.value as Speaker })}
                              className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                            >
                              {SPEAKER_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-charcoal mb-1">
                              Display Name <span className="text-muted font-normal">(optional)</span>
                            </label>
                            <input
                              type="text"
                              value={editingLine.name}
                              onChange={(e) => setEditingLine({ ...editingLine, name: e.target.value })}
                              placeholder="e.g. Officer"
                              className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal mb-1">Spanish</label>
                          <textarea
                            rows={2}
                            value={editingLine.spanish}
                            onChange={(e) => setEditingLine({ ...editingLine, spanish: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal mb-1">
                            English <span className="text-muted font-normal">(optional)</span>
                          </label>
                          <input
                            type="text"
                            value={editingLine.english}
                            onChange={(e) => setEditingLine({ ...editingLine, english: e.target.value })}
                            placeholder="e.g. How long are you staying?"
                            className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={saveLine}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-card font-medium hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                          >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={cancelEdit}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-card font-medium hover:bg-gray-600 transition-colors text-sm"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : isConfirmingDelete ? (
                      <div className="p-5 space-y-3">
                        <p className="text-sm text-red-700 font-medium">
                          Delete this line? This cannot be undone.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteLine(lineIndex)}
                            disabled={saving}
                            className="px-4 py-2 bg-red-600 text-white rounded-card font-medium hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                          >
                            {saving ? 'Deleting...' : 'Yes, delete'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirmIndex(null)}
                            disabled={saving}
                            className="px-4 py-2 bg-gray-500 text-white rounded-card font-medium hover:bg-gray-600 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 p-4">
                        <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${SPEAKER_BG[line.speaker]}`}>
                          <MessageCircle className={`w-3.5 h-3.5 ${SPEAKER_COLORS[line.speaker]}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs font-semibold ${SPEAKER_COLORS[line.speaker]}`}>{speakerLabel}</span>
                          <p className="text-charcoal text-sm mt-0.5">{line.spanish}</p>
                          {line.english && (
                            <p className="text-muted text-xs italic mt-0.5">{line.english}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => startEdit(lineIndex)}
                            className="px-3 py-1.5 text-xs bg-coral text-white rounded-card hover:bg-coral-dark transition-colors font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setEditingLine(null);
                              setAddingLine(false);
                              setDeleteConfirmIndex(lineIndex);
                            }}
                            className="px-3 py-1.5 text-xs text-red-600 border-2 border-red-200 rounded-card hover:bg-red-50 hover:border-red-400 transition-colors font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {addingLine ? (
              <div className="bg-white rounded-card-lg border-2 border-teal p-5 shadow-sm space-y-3">
                <div className="text-sm font-semibold text-teal mb-1">New Line</div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-charcoal mb-1">Speaker</label>
                    <select
                      value={newLine.speaker}
                      onChange={(e) => setNewLine({ ...newLine, speaker: e.target.value as Speaker })}
                      className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                    >
                      {SPEAKER_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-charcoal mb-1">
                      Display Name <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={newLine.name}
                      onChange={(e) => setNewLine({ ...newLine, name: e.target.value })}
                      placeholder="e.g. Officer"
                      className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1">Spanish</label>
                  <textarea
                    rows={2}
                    value={newLine.spanish}
                    onChange={(e) => setNewLine({ ...newLine, spanish: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1">
                    English <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={newLine.english}
                    onChange={(e) => setNewLine({ ...newLine, english: e.target.value })}
                    placeholder="e.g. How long are you staying?"
                    className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={addLine}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-card font-medium hover:bg-teal/80 transition-colors disabled:opacity-50 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Adding...' : 'Add Line'}
                  </button>
                  <button
                    onClick={() => { setAddingLine(false); setNewLine({ speaker: 'local', name: '', spanish: '', english: '' }); }}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-card font-medium hover:bg-gray-600 transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setEditingLine(null); setDeleteConfirmIndex(null); setAddingLine(true); }}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-card-lg text-muted hover:border-teal hover:text-teal transition-colors text-sm font-medium"
              >
                + Add Line
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
