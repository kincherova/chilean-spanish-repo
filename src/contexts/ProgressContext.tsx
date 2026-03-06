import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  completedLessons: Set<string>;
  markLessonComplete: (lessonId: string, score?: number) => Promise<void>;
  isLessonComplete: (lessonId: string) => boolean;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const refreshProgress = useCallback(async () => {
    if (!user) {
      setCompletedLessons(new Set());
      return;
    }
    const { data } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', user.id);

    if (data) {
      setCompletedLessons(new Set(data.map((r) => r.lesson_id)));
    }
  }, [user]);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  const markLessonComplete = async (lessonId: string, score?: number) => {
    if (!user) return;
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed_at: new Date().toISOString(),
      score: score ?? null,
    });
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  };

  const isLessonComplete = (lessonId: string) => completedLessons.has(lessonId);

  return (
    <ProgressContext.Provider value={{ completedLessons, markLessonComplete, isLessonComplete, refreshProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
