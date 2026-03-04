import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Lock, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import SignInButton from '../components/SignInButton';

interface Lesson {
  id: string;
  title: string;
  type: string;
  order_index: number;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  module_id: string;
}

export default function LessonsList() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (unitId) {
      loadUnitAndLessons();
      if (user) {
        loadProgress();
      }
    }
  }, [unitId, user]);

  const loadUnitAndLessons = async () => {
    try {
      const { data: unitData, error: unitError } = await supabase
        .from('units')
        .select('*')
        .eq('id', unitId)
        .maybeSingle();

      if (unitError) throw unitError;
      setUnit(unitData);

      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('unit_id', unitId)
        .order('order_index');

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);
    } catch (error) {
      console.error('Error loading unit and lessons:', error);
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

  const isLessonAvailable = (lessonIndex: number) => {
    return lessonIndex === 0;
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
            onClick={() => navigate(`/modules/${unit?.module_id}/units`)}
            className="flex items-center gap-2 text-muted hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to units</span>
          </button>
          <SignInButton />
        </div>

        {unit && (
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-2">
              {unit.title}
            </h1>
            <p className="text-muted font-light">{unit.description}</p>
          </div>
        )}

        <div className="space-y-4">
          {lessons.length === 0 ? (
            <div className="bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-8 text-center">
              <p className="text-muted font-light">
                No lessons available in this unit yet.
              </p>
            </div>
          ) : (
            lessons.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              const isAvailable = isLessonAvailable(index);
              const isComingSoon = !isAvailable;

              return (
                <div
                  key={lesson.id}
                  onClick={isAvailable ? () => navigate(`/units/${unitId}/lessons/${lesson.id}`) : undefined}
                  className={`w-full bg-white rounded-card-lg shadow-sm border border-[#f0e8e0] p-6 flex items-center justify-between min-h-[48px] ${
                    isAvailable
                      ? 'hover:shadow-md transition-all cursor-pointer group'
                      : 'opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-teal" strokeWidth={1.5} />
                      ) : isAvailable ? (
                        <Play className="w-6 h-6 text-coral" strokeWidth={1.5} />
                      ) : (
                        <Lock className="w-6 h-6 text-muted" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-muted">
                          Lesson {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-navy mb-1">
                        {lesson.title}
                      </h3>
                      {isComingSoon && (
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
