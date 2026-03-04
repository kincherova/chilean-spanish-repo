import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ChevronLeft, Save, X, ChevronDown, ChevronUp, MessageSquare, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Lesson {
  id: string;
  title: string;
}

interface QuizItem {
  phrase?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  audioUrl?: string;
}

interface EditingItem {
  index: number;
  phrase: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function AdminThisOrThat() {
  const { user, loading: authLoading } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [items, setItems] = useState<QuizItem[]>([]);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  useEffect(() => {
    if (selectedLessonId) {
      loadItems();
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

  async function loadItems() {
    setItems([]);
    setEditingItem(null);
    setExpandedIndex(null);
    setDeleteConfirmIndex(null);

    const { data, error } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', selectedLessonId)
      .maybeSingle();

    if (error || !data) return;

    const pages = data.content?.pages ?? [];
    const quizPage = pages.find((p: { type: string }) => p.type === 'multiple_choice');
    if (quizPage?.items) {
      setItems(quizPage.items);
    }
  }

  function startEdit(index: number) {
    setDeleteConfirmIndex(null);
    const item = items[index];
    setEditingItem({
      index,
      phrase: item.phrase ?? '',
      question: item.question,
      options: [...item.options],
      correctAnswer: item.correctAnswer,
    });
    setExpandedIndex(index);
  }

  function cancelEdit() {
    setEditingItem(null);
  }

  function updateOption(optionIndex: number, value: string) {
    if (!editingItem) return;
    const newOptions = [...editingItem.options];
    newOptions[optionIndex] = value;
    setEditingItem({ ...editingItem, options: newOptions });
  }

  async function persistPages(
    updater: (items: QuizItem[]) => QuizItem[]
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', selectedLessonId)
      .maybeSingle();

    if (error || !data) {
      alert('Error loading lesson data');
      return false;
    }

    const content = data.content;
    const pages = content.pages.map((page: { type: string; items?: QuizItem[] }) => {
      if (page.type !== 'multiple_choice') return page;
      return { ...page, items: updater(page.items ?? []) };
    });

    const { error: updateError } = await supabase
      .from('lessons')
      .update({ content: { ...content, pages } })
      .eq('id', selectedLessonId);

    if (updateError) {
      alert('Error saving changes');
      return false;
    }

    return true;
  }

  async function saveItem() {
    if (!editingItem) return;

    if (!editingItem.question.trim()) {
      alert('Question text is required.');
      return;
    }
    for (const opt of editingItem.options) {
      if (!opt.trim()) {
        alert('All options must have text.');
        return;
      }
    }

    setSaving(true);

    const ok = await persistPages((items) =>
      items.map((item, i) => {
        if (i !== editingItem.index) return item;
        return {
          ...item,
          phrase: editingItem.phrase || undefined,
          question: editingItem.question,
          options: editingItem.options,
          correctAnswer: editingItem.correctAnswer,
        };
      })
    );

    setSaving(false);
    if (!ok) return;

    setEditingItem(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    await loadItems();
  }

  async function deleteItem(index: number) {
    setSaving(true);

    const ok = await persistPages((items) =>
      items.filter((_, i) => i !== index)
    );

    setSaving(false);
    if (!ok) return;

    setDeleteConfirmIndex(null);
    setExpandedIndex(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    await loadItems();
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-coral text-lg font-light">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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

        <h1 className="text-4xl font-bold text-charcoal mb-2">This or That</h1>
        <p className="text-muted font-light mb-8">Edit or delete questions for each lesson</p>

        <div className="mb-8">
          <label className="block text-sm font-medium text-charcoal mb-2">Select Lesson</label>
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="w-full max-w-md px-4 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral"
          >
            {lessons.map(lesson => (
              <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
            ))}
          </select>
        </div>

        {saveSuccess && (
          <div className="mb-4 px-4 py-3 bg-green-50 border-2 border-green-400 rounded-card text-green-700 font-medium">
            Changes saved successfully.
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-card-lg p-8 shadow-sm text-center text-muted font-light">
            No "This or That" exercise found for this lesson.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => {
              const isEditing = editingItem?.index === index;
              const isExpanded = expandedIndex === index;
              const isConfirmingDelete = deleteConfirmIndex === index;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-card-lg shadow-sm border-2 transition-colors ${
                    isEditing
                      ? 'border-coral'
                      : isConfirmingDelete
                      ? 'border-red-400'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => {
                      if (isExpanded) {
                        setExpandedIndex(null);
                        setDeleteConfirmIndex(null);
                        setEditingItem(null);
                      } else {
                        setExpandedIndex(index);
                        setDeleteConfirmIndex(null);
                        setEditingItem(null);
                      }
                    }}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-coral" />
                      </div>
                      <div>
                        <div className="text-xs text-muted font-medium mb-0.5">QUESTION {index + 1}</div>
                        <div className="text-charcoal font-medium text-sm">
                          {item.phrase ? (
                            <span className="text-teal mr-2 font-semibold">{item.phrase}</span>
                          ) : null}
                          <span className="text-charcoal/80 font-normal">{item.question}</span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                              Spanish Phrase <span className="text-muted font-normal">(optional)</span>
                            </label>
                            <input
                              type="text"
                              value={editingItem.phrase}
                              onChange={(e) => setEditingItem({ ...editingItem, phrase: e.target.value })}
                              className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                              placeholder="e.g. ¿De dónde viene?"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-1">
                              Question
                            </label>
                            <input
                              type="text"
                              value={editingItem.question}
                              onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                              className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                              placeholder="e.g. What does the officer mean?"
                            />
                          </div>

                          <div>
                            <div className="text-sm font-medium text-charcoal mb-2">Options</div>
                            <div className="space-y-2">
                              {editingItem.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setEditingItem({ ...editingItem, correctAnswer: optIdx })}
                                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
                                      editingItem.correctAnswer === optIdx
                                        ? 'border-teal bg-teal'
                                        : 'border-gray-300 hover:border-teal'
                                    }`}
                                    title="Mark as correct answer"
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => updateOption(optIdx, e.target.value)}
                                    className="flex-1 px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral text-sm"
                                    placeholder={`Option ${optIdx + 1}`}
                                  />
                                  {editingItem.correctAnswer === optIdx ? (
                                    <span className="text-xs text-teal font-medium w-16">correct</span>
                                  ) : (
                                    <span className="w-16" />
                                  )}
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-muted mt-2">Click the circle to mark the correct answer.</p>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={saveItem}
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
                        <div className="space-y-3">
                          <p className="text-sm text-red-700 font-medium">
                            Delete question {index + 1}? This cannot be undone.
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteItem(index)}
                              disabled={saving}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-card font-medium hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              {saving ? 'Deleting...' : 'Yes, delete'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmIndex(null)}
                              disabled={saving}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-card font-medium hover:bg-gray-600 transition-colors text-sm"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="space-y-2 mb-4">
                            {item.options.map((opt, optIdx) => (
                              <div
                                key={optIdx}
                                className={`flex items-center gap-3 px-3 py-2 rounded-card text-sm ${
                                  optIdx === item.correctAnswer
                                    ? 'bg-teal/10 text-teal font-medium'
                                    : 'text-charcoal'
                                }`}
                              >
                                <span className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold border-current">
                                  {optIdx + 1}
                                </span>
                                {opt}
                                {optIdx === item.correctAnswer && (
                                  <span className="ml-auto text-xs text-teal font-medium">correct</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(index)}
                              className="px-4 py-2 text-sm bg-coral text-white rounded-card hover:bg-coral-dark transition-colors font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirmIndex(index)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border-2 border-red-200 rounded-card hover:bg-red-50 hover:border-red-400 transition-colors font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
