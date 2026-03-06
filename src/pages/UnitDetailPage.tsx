import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { Unit, Lesson, Module } from '../types/database';
import { useProgress } from '../contexts/ProgressContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { fs } from '../components/lesson/fontSizeClasses';

const FONT_SIZE_LABELS = { normal: 'A', large: 'A+', xlarge: 'A++' };

export default function UnitDetailPage() {
  const { moduleId, unitId } = useParams<{ moduleId: string; unitId: string }>();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLessonComplete } = useProgress();
  const { fontSize, cycleFontSize } = useFontSize();

  useEffect(() => {
    async function load() {
      if (!unitId || !moduleId) return;
      const [{ data: unitData }, { data: modData }, { data: lessonsData }] = await Promise.all([
        supabase.from('units').select('*').eq('id', unitId).maybeSingle(),
        supabase.from('modules').select('*').eq('id', moduleId).maybeSingle(),
        supabase.from('lessons').select('*').eq('unit_id', unitId).order('order_index'),
      ]);
      if (unitData) setUnit(unitData);
      if (modData) setModule(modData);
      if (lessonsData) setLessons(lessonsData);
      setLoading(false);
    }
    load();
  }, [unitId, moduleId]);

  if (loading || !unit || !module) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back={`/modules/${moduleId}`} />
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-card-lg p-5 animate-pulse h-20" />
          ))}
        </div>
      </div>
    );
  }

  const lessonTypeLabel: Record<string, string> = {
    vocabulary: 'Vocabulary',
    dialogue: 'Dialogue',
    quiz: 'Quiz',
  };

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back={`/modules/${moduleId}`} title={unit.title} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className={`text-muted font-medium mb-1 uppercase tracking-wider ${fs.label(fontSize)}`}>{module.title}</p>
            <h1 className="font-display text-2xl font-bold text-navy mb-2">{unit.title}</h1>
            <p className={`text-muted leading-relaxed ${fs.bodySmall(fontSize)}`}>{unit.description}</p>
          </div>
          <button
            onClick={cycleFontSize}
            title="Cycle text size"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border mt-1 flex-shrink-0 ${
              fontSize === 'normal'
                ? 'text-muted border-gray-200 hover:border-coral/40 hover:text-navy bg-white'
                : 'text-coral border-coral/40 bg-coral/10'
            }`}
          >
            {FONT_SIZE_LABELS[fontSize]}
          </button>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, idx) => {
            const done = isLessonComplete(lesson.id);
            return (
              <Link
                key={lesson.id}
                to={`/modules/${moduleId}/units/${unitId}/lessons/${lesson.id}`}
                className="flex items-center justify-between bg-white hover:bg-cream rounded-card-lg p-4 transition-all hover:shadow-md border border-transparent hover:border-coral/20 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-card flex items-center justify-center flex-shrink-0 ${done ? 'bg-green-100' : 'bg-warm-bg'}`}>
                    {done ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : (
                      <span className="text-xs font-bold text-muted">{idx + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className={`font-medium text-navy ${fs.body(fontSize)}`}>{lesson.title}</p>
                    {lessonTypeLabel[lesson.type] && (
                      <span className={`text-muted ${fs.label(fontSize)}`}>{lessonTypeLabel[lesson.type]}</span>
                    )}
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted group-hover:text-coral transition-colors" />
              </Link>
            );
          })}

          <Link
            to={`/modules/${moduleId}/units/${unitId}/flashcards`}
            className="flex items-center justify-between bg-teal/10 hover:bg-teal/20 border border-teal/20 rounded-card-lg p-4 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-card bg-teal/20 flex items-center justify-center">
                <CreditCard size={15} className="text-teal" />
              </div>
              <div>
                <p className={`font-medium text-navy ${fs.body(fontSize)}`}>Flashcards</p>
                <span className={`text-muted ${fs.label(fontSize)}`}>Review vocabulary</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-teal group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
