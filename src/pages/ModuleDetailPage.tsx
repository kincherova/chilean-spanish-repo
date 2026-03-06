import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, ChevronRight, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { Module, Unit, Lesson } from '../types/database';
import { useProgress } from '../contexts/ProgressContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { fs } from '../components/lesson/fontSizeClasses';

const FONT_SIZE_LABELS = { normal: 'A', large: 'A+', xlarge: 'A++' };

interface UnitWithProgress extends Unit {
  lessons: Lesson[];
  completedCount: number;
}

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [units, setUnits] = useState<UnitWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { completedLessons } = useProgress();
  const { fontSize, cycleFontSize } = useFontSize();

  useEffect(() => {
    async function load() {
      if (!moduleId) return;

      const [{ data: mod }, { data: unitsData }, { data: lessonsData }] = await Promise.all([
        supabase.from('modules').select('*').eq('id', moduleId).maybeSingle(),
        supabase.from('units').select('*').eq('module_id', moduleId).order('order_index'),
        supabase.from('lessons').select('*').order('order_index'),
      ]);

      if (!mod || !unitsData) return;
      setModule(mod);

      const withProgress: UnitWithProgress[] = unitsData.map((u) => {
        const uLessons = (lessonsData ?? []).filter((l) => l.unit_id === u.id);
        const completedCount = uLessons.filter((l) => completedLessons.has(l.id)).length;
        return { ...u, lessons: uLessons, completedCount };
      });

      setUnits(withProgress);
      setLoading(false);
    }
    load();
  }, [moduleId, completedLessons]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <NavBar back="/modules" />
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-card-lg p-5 animate-pulse h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (!module) return null;

  const vocabUnits = units.filter((u) => u.unit_type === 'vocabulary');
  const standardUnits = units.filter((u) => u.unit_type !== 'vocabulary');

  function UnitCard({ unit, index }: { unit: UnitWithProgress; index: number }) {
    const pct = unit.lessons.length > 0 ? Math.round((unit.completedCount / unit.lessons.length) * 100) : 0;
    const isComplete = unit.completedCount === unit.lessons.length && unit.lessons.length > 0;

    return (
      <Link
        to={`/modules/${moduleId}/units/${unit.id}`}
        className="block bg-white hover:bg-cream rounded-card-lg p-5 transition-all hover:shadow-md border border-transparent hover:border-coral/20 group"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-card bg-coral/10 flex items-center justify-center text-sm font-bold text-coral flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {unit.unit_type === 'vocabulary' ? (
                  <span className="inline-flex items-center gap-1 text-xs bg-teal/10 text-teal rounded-full px-2 py-0.5 font-medium">
                    <Layers size={10} /> Vocabulary
                  </span>
                ) : null}
                {isComplete && <CheckCircle2 size={14} className="text-green-500" />}
              </div>
              <h3 className={`font-semibold text-navy leading-snug mb-1 ${fs.body(fontSize)}`}>{unit.title}</h3>
              <p className={`text-muted leading-relaxed line-clamp-2 ${fs.bodySmall(fontSize)}`}>{unit.description}</p>
              <div className={`flex items-center gap-2 mt-1.5 text-muted ${fs.label(fontSize)}`}>
                <Clock size={11} />
                <span>{unit.estimated_minutes} min</span>
                {unit.lessons.length > 0 && (
                  <>
                    <span>·</span>
                    <BookOpen size={11} />
                    <span>{unit.lessons.length} lesson{unit.lessons.length !== 1 ? 's' : ''}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-muted group-hover:text-coral transition-colors flex-shrink-0 mt-1" />
        </div>
        {pct > 0 && (
          <div className="mt-3 bg-warm-bg rounded-full h-1 overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        )}
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar back="/modules" />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy mb-2">{module.title}</h1>
            <p className={`text-muted ${fs.body(fontSize)}`}>{module.description}</p>
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

        {vocabUnits.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Vocabulary</h2>
            <div className="space-y-3">
              {vocabUnits.map((u, i) => <UnitCard key={u.id} unit={u} index={i} />)}
            </div>
          </div>
        )}

        {standardUnits.length > 0 && (
          <div>
            {vocabUnits.length > 0 && (
              <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Lessons</h2>
            )}
            <div className="space-y-3">
              {standardUnits.map((u, i) => <UnitCard key={u.id} unit={u} index={vocabUnits.length + i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
