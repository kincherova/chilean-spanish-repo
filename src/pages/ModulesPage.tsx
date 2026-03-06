import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { Module, Unit, Lesson } from '../types/database';
import { useProgress } from '../contexts/ProgressContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { fs } from '../components/lesson/fontSizeClasses';

const FONT_SIZE_LABELS: Record<string, string> = {
  normal: 'A',
  large: 'A+',
  xlarge: 'A++',
};

interface ModuleWithStats extends Module {
  unitCount: number;
  totalLessons: number;
  totalMinutes: number;
  completedLessons: number;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<ModuleWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { completedLessons } = useProgress();
  const { fontSize, cycleFontSize } = useFontSize();

  useEffect(() => {
    async function load() {
      const { data: modulesData } = await supabase
        .from('modules')
        .select('*')
        .order('order_index');

      const { data: units } = await supabase
        .from('units')
        .select('id, module_id, estimated_minutes');

      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, unit_id');

      if (!modulesData) return;

      const unitsList = (units as Pick<Unit, 'id' | 'module_id' | 'estimated_minutes'>[]) ?? [];
      const lessonsList = (lessons as Pick<Lesson, 'id' | 'unit_id'>[]) ?? [];

      const withStats: ModuleWithStats[] = modulesData.map((m) => {
        const moduleUnits = unitsList.filter((u) => u.module_id === m.id);
        const unitIds = new Set(moduleUnits.map((u) => u.id));
        const moduleLessons = lessonsList.filter((l) => unitIds.has(l.unit_id));
        const completedCount = moduleLessons.filter((l) => completedLessons.has(l.id)).length;

        return {
          ...m,
          unitCount: moduleUnits.length,
          totalLessons: moduleLessons.length,
          totalMinutes: moduleUnits.reduce((s, u) => s + (u.estimated_minutes ?? 0), 0),
          completedLessons: completedCount,
        };
      });

      setModules(withStats);
      setLoading(false);
    }
    load();
  }, [completedLessons]);

  return (
    <div className="min-h-screen bg-warm-bg">
      <NavBar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy mb-2">Your lessons</h1>
            <p className="text-muted">Pick up where you left off or start something new.</p>
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

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-card-lg p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {modules.map((mod, idx) => {
              const pct = mod.totalLessons > 0 ? Math.round((mod.completedLessons / mod.totalLessons) * 100) : 0;
              const isComplete = pct === 100;

              return (
                <Link
                  key={mod.id}
                  to={`/modules/${mod.id}`}
                  className="block bg-white hover:bg-cream rounded-card-lg p-5 transition-all hover:shadow-md border border-transparent hover:border-coral/20 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-card bg-warm-bg flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                        {mod.icon === 'book' ? '📖' : mod.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-muted font-medium ${fs.label(fontSize)}`}>Module {idx + 1}</span>
                          {isComplete && <CheckCircle2 size={14} className="text-green-500" />}
                        </div>
                        <h2 className={`font-semibold text-navy leading-snug mb-1 truncate ${fs.body(fontSize)}`}>
                          {mod.title}
                        </h2>
                        <p className={`text-muted leading-relaxed line-clamp-2 ${fs.bodySmall(fontSize)}`}>{mod.description}</p>
                        <div className={`flex items-center gap-3 mt-2 text-muted ${fs.label(fontSize)}`}>
                          <span>{mod.unitCount} units</span>
                          <span>·</span>
                          <Clock size={12} />
                          <span>{mod.totalMinutes} min</span>
                          {mod.completedLessons > 0 && (
                            <>
                              <span>·</span>
                              <span className="text-green-600 font-medium">{pct}% done</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-muted group-hover:text-coral transition-colors flex-shrink-0 mt-1" />
                  </div>

                  {pct > 0 && (
                    <div className="mt-4 bg-warm-bg rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
