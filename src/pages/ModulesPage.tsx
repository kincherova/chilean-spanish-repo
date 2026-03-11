import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, CheckCircle2, Lock, UserPlus, X } from 'lucide-react';
import NavBar from '../components/NavBar';
import { supabase } from '../lib/supabase';
import { Module, Unit, Lesson } from '../types/database';
import { useProgress } from '../contexts/ProgressContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { useAuth } from '../contexts/AuthContext';
import { fs } from '../components/lesson/fontSizeClasses';
import type { FontSize } from '../components/lesson/fontSizeClasses';

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

interface ModuleCardContentProps {
  mod: ModuleWithStats;
  idx: number;
  pct: number;
  isComplete: boolean;
  fontSize: FontSize;
  isPremium: boolean;
}

function ModuleCardContent({ mod, idx, pct, isComplete, fontSize, isPremium }: ModuleCardContentProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-card bg-warm-bg flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
            {mod.icon === 'book' ? '📖' : mod.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-muted font-medium ${fs.label(fontSize)}`}>Module {idx + 1}</span>
              {isComplete && <CheckCircle2 size={14} className="text-green-500" />}
              {mod.is_free && !isPremium && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                  Free
                </span>
              )}
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
    </>
  );
}

export default function ModulesPage() {
  const [modules, setModules] = useState<ModuleWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSaveBanner, setShowSaveBanner] = useState(false);
  const { completedLessons } = useProgress();
  const { fontSize, cycleFontSize } = useFontSize();
  const { isPremium, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem('save_banner_dismissed');
    if (!user && !dismissed) {
      const timer = setTimeout(() => setShowSaveBanner(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

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

  const fz = fontSize as FontSize;

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
              const accessible = mod.is_free || isPremium;

              if (accessible) {
                return (
                  <Link
                    key={mod.id}
                    to={`/modules/${mod.id}`}
                    className="block bg-white hover:bg-cream rounded-card-lg p-5 transition-all hover:shadow-md border border-transparent hover:border-coral/20 group"
                  >
                    <ModuleCardContent mod={mod} idx={idx} pct={pct} isComplete={isComplete} fontSize={fz} isPremium={isPremium} />
                  </Link>
                );
              }

              return (
                <div
                  key={mod.id}
                  className="relative rounded-card-lg overflow-hidden group"
                >
                  <div className="bg-white p-5 select-none pointer-events-none">
                    <ModuleCardContent mod={mod} idx={idx} pct={pct} isComplete={isComplete} fontSize={fz} isPremium={isPremium} />
                  </div>
                  <div className="absolute inset-0 backdrop-blur-[3px] bg-white/60 flex flex-col items-center justify-center gap-3 transition-all group-hover:bg-white/50">
                    <div className="w-12 h-12 rounded-full bg-navy/10 border-2 border-navy/20 flex items-center justify-center shadow-sm">
                      <Lock size={20} className="text-navy/70" strokeWidth={2} />
                    </div>
                    <div className="text-center">
                      <p className="text-muted text-xs mt-0.5">Upgrade to unlock all modules</p>
                    </div>
                    <button
                      className="mt-1 px-4 py-1.5 rounded-full bg-navy text-white text-xs font-semibold shadow-sm hover:bg-navy/90 transition-colors cursor-pointer"
                      onClick={() => navigate(user ? '/profile' : '/login')}
                    >
                      Get full access
                    </button>
                  </div>
                </div>
              );
            })}

            {!isPremium && modules.some((m) => !m.is_free) && (
              <div className="mt-2 p-4 rounded-card-lg border border-amber-200 bg-amber-50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lock size={14} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    {modules.filter((m) => !m.is_free).length} modules locked
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Upgrade your account to unlock the full course and learn survival Chilean Spanish.
                  </p>
                </div>
              </div>
            )}

            {showSaveBanner && !user && (
              <div className="mt-4 p-4 rounded-card-lg border border-teal/30 bg-teal/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <UserPlus size={14} className="text-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy">Save your progress</p>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">
                    Create a free account so you never lose your completed lessons.
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-2 px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy/90 transition-colors"
                  >
                    Create account
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowSaveBanner(false);
                    sessionStorage.setItem('save_banner_dismissed', '1');
                  }}
                  className="text-muted hover:text-navy transition-colors flex-shrink-0 mt-0.5"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
