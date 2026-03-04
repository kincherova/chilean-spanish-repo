import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, Circle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import SignInButton from '../components/SignInButton';

interface Unit {
  id: string;
  title: string;
  description: string;
  estimated_minutes: number;
  order_index: number;
  unit_type: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
}

interface UnitWithLesson extends Unit {
  lessonId?: string;
}

export default function UnitsList() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [module, setModule] = useState<Module | null>(null);
  const [units, setUnits] = useState<UnitWithLesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (moduleId) {
      loadModuleAndUnits();
      if (user) {
        loadProgress();
      }
    }
  }, [moduleId, user]);

  const loadModuleAndUnits = async () => {
    try {
      const { data: moduleData, error: moduleError } = await supabase
        .from('modules')
        .select('*')
        .eq('id', moduleId)
        .maybeSingle();

      if (moduleError) throw moduleError;
      setModule(moduleData);

      const { data: unitsData, error: unitsError } = await supabase
        .from('units')
        .select('*')
        .eq('module_id', moduleId)
        .order('order_index');

      if (unitsError) throw unitsError;

      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('id, unit_id')
        .in('unit_id', (unitsData || []).map(u => u.id));

      if (lessonsError) throw lessonsError;

      const unitsWithLessons = (unitsData || []).map(unit => ({
        ...unit,
        lessonId: lessonsData?.find(l => l.unit_id === unit.id)?.id
      }));

      setUnits(unitsWithLessons);
    } catch (error) {
      console.error('Error loading module and units:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setCompletedLessons(new Set(data.map((p) => p.lesson_id)));
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const isUnitCompleted = (unit: UnitWithLesson) => {
    return unit.lessonId ? completedLessons.has(unit.lessonId) : false;
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
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/modules')}
            className="flex items-center gap-2 text-muted hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to modules</span>
          </button>
          <SignInButton />
        </div>

        {module && (
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-2">
              {module.title}
            </h1>
            <p className="text-muted font-light">{module.description}</p>
          </div>
        )}

        <div className="bg-white rounded-card-lg p-6 border border-gray-200 shadow-sm mb-6">
          <h3 className="text-xl font-display font-semibold text-navy mb-4">Here's what you'll do:</h3>
          <ol className="space-y-3 text-charcoal font-light leading-relaxed">
            <li className="flex gap-3">
              <span className="font-medium text-coral">1.</span>
              <span>First, you'll see the phrases in Spanish. You can listen to them and copy the list if you want to keep notes.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-coral">2.</span>
              <span>Then, you'll practice the same phrases with a few short exercises.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-coral">3.</span>
              <span>At the end, you'll read a real dialogue and see how much you already understand.</span>
            </li>
          </ol>
        </div>

        {units.length === 0 ? (
          <div className="bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-8 text-center">
            <p className="text-muted font-light">
              No units available in this module yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {(() => {
              let standardUnitCount = 0;
              return units.map((unit) => {
                const isCompleted = isUnitCompleted(unit);
                const isVocabulary = unit.unit_type === 'vocabulary';
                if (!isVocabulary) standardUnitCount++;
                const unitLabel = isVocabulary ? 'Key vocabulary' : `Unit ${standardUnitCount}`;

                return (
                  <div
                    key={unit.id}
                    onClick={unit.lessonId ? () => navigate(`/units/${unit.id}/lessons/${unit.lessonId}`) : undefined}
                    className="w-full bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-6 text-left min-h-[48px] hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-teal" strokeWidth={1.5} />
                        ) : (
                          <Circle className="w-6 h-6 text-cream group-hover:text-coral transition-colors" strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${isVocabulary ? 'text-teal' : 'text-muted'}`}>
                            {unitLabel}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-semibold text-navy mb-2">
                          {unit.title}
                        </h3>
                        <p className="text-muted text-sm font-light mb-3">
                          {unit.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-sm text-muted">
                            <Clock className="w-4 h-4" strokeWidth={1.5} />
                            <span className="font-light">
                              {unit.estimated_minutes} minutes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
