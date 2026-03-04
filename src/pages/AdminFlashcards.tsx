import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Unit {
  id: string;
  title: string;
  module_id: string;
}

interface Flashcard {
  id: string;
  unit_id: string;
  spanish_text: string;
  english_text: string;
  order_index: number;
}

interface EditingFlashcard {
  id?: string;
  spanish_text: string;
  english_text: string;
  order_index: number;
}

export default function AdminFlashcards() {
  const { user } = useAuth();
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [editingCard, setEditingCard] = useState<EditingFlashcard | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUnits();
  }, []);

  useEffect(() => {
    if (selectedUnitId) {
      loadFlashcards();
    }
  }, [selectedUnitId]);

  async function loadUnits() {
    const { data, error } = await supabase
      .from('units')
      .select('id, title, module_id')
      .order('module_id, order_index');

    if (error) {
      console.error('Error loading units:', error);
    } else {
      setUnits(data || []);
      if (data && data.length > 0) {
        setSelectedUnitId(data[0].id);
      }
    }
    setLoading(false);
  }

  async function loadFlashcards() {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('unit_id', selectedUnitId)
      .order('order_index');

    if (error) {
      console.error('Error loading flashcards:', error);
    } else {
      setFlashcards(data || []);
    }
  }

  function startNewCard() {
    const maxOrder = flashcards.length > 0
      ? Math.max(...flashcards.map(f => f.order_index))
      : 0;

    setEditingCard({
      spanish_text: '',
      english_text: '',
      order_index: maxOrder + 1
    });
  }

  function startEdit(card: Flashcard) {
    setEditingCard({
      id: card.id,
      spanish_text: card.spanish_text,
      english_text: card.english_text,
      order_index: card.order_index
    });
  }

  function cancelEdit() {
    setEditingCard(null);
  }

  async function saveCard() {
    if (!editingCard || !selectedUnitId) return;

    if (!editingCard.spanish_text.trim() || !editingCard.english_text.trim()) {
      alert('Both Spanish and English text are required');
      return;
    }

    setSaving(true);

    if (editingCard.id) {
      const { error } = await supabase
        .from('flashcards')
        .update({
          spanish_text: editingCard.spanish_text,
          english_text: editingCard.english_text,
          order_index: editingCard.order_index
        })
        .eq('id', editingCard.id);

      if (error) {
        console.error('Error updating flashcard:', error);
        alert('Error updating flashcard');
      }
    } else {
      const { error } = await supabase
        .from('flashcards')
        .insert({
          unit_id: selectedUnitId,
          spanish_text: editingCard.spanish_text,
          english_text: editingCard.english_text,
          order_index: editingCard.order_index
        });

      if (error) {
        console.error('Error creating flashcard:', error);
        alert('Error creating flashcard');
      }
    }

    setSaving(false);
    setEditingCard(null);
    loadFlashcards();
  }

  async function deleteCard(id: string) {
    if (!confirm('Are you sure you want to delete this flashcard?')) return;

    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting flashcard:', error);
      alert('Error deleting flashcard');
    } else {
      loadFlashcards();
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <p className="text-charcoal text-lg mb-4">Please sign in to access admin features</p>
          <Link to="/auth" className="text-coral hover:underline">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-coral text-lg font-light">Loading...</div>
      </div>
    );
  }

  const selectedUnit = units.find(u => u.id === selectedUnitId);

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-charcoal hover:text-coral mb-6 font-light"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold text-charcoal mb-2">Manage Flashcards</h1>
        <p className="text-muted font-light mb-8">Add, edit, or delete flashcards for each unit</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Select Unit
          </label>
          <select
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value)}
            className="w-full max-w-md px-4 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral"
          >
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.title}
              </option>
            ))}
          </select>
        </div>

        {selectedUnit && (
          <div className="bg-white rounded-card-lg p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-charcoal">{selectedUnit.title}</h2>
              <button
                onClick={startNewCard}
                className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-card font-medium hover:bg-coral-dark transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Flashcard
              </button>
            </div>

            {editingCard && (
              <div className="bg-teal-50 border-2 border-teal rounded-card p-4 mb-4">
                <h3 className="font-bold text-charcoal mb-3">
                  {editingCard.id ? 'Edit Flashcard' : 'New Flashcard'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">
                      Spanish Text
                    </label>
                    <input
                      type="text"
                      value={editingCard.spanish_text}
                      onChange={(e) => setEditingCard({ ...editingCard, spanish_text: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral"
                      placeholder="Hola"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">
                      English Text
                    </label>
                    <input
                      type="text"
                      value={editingCard.english_text}
                      onChange={(e) => setEditingCard({ ...editingCard, english_text: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral"
                      placeholder="Hello"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      value={editingCard.order_index}
                      onChange={(e) => setEditingCard({ ...editingCard, order_index: parseInt(e.target.value) })}
                      className="w-32 px-3 py-2 border-2 border-charcoal rounded-card focus:outline-none focus:border-coral"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={saveCard}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-card font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-card font-medium hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {flashcards.length === 0 ? (
                <p className="text-muted font-light text-center py-8">
                  No flashcards yet. Click "Add Flashcard" to create one.
                </p>
              ) : (
                flashcards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-card hover:border-coral transition-colors"
                  >
                    <div className="text-sm text-muted font-medium w-12">
                      #{card.order_index}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted font-medium mb-1">SPANISH</div>
                        <div className="text-charcoal font-medium">{card.spanish_text}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted font-medium mb-1">ENGLISH</div>
                        <div className="text-charcoal font-medium">{card.english_text}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(card)}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-card hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-card transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
