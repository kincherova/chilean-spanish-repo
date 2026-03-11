import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const LOCAL_PROGRESS_KEY = 'guest_completed_lessons';

interface ProgressContextType {
  completedLessons: Set<string>;
  markLessonComplete: (lessonId: string, score?: number) => Promise<void>;
  isLessonComplete: (lessonId: string) => boolean;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

function loadLocalProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {}
  return new Set();
}

function saveLocalProgress(lessons: Set<string>) {
  try {
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify([...lessons]));
  } catch {}
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const refreshProgress = useCallback(async () => {
    if (!user) {
      setCompletedLessons(loadLocalProgress());
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
    if (!user) {
      setCompletedLessons((prev) => {
        const next = new Set([...prev, lessonId]);
        saveLocalProgress(next);
        return next;
      });
      return;
    }
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
