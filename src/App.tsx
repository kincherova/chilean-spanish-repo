import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import ModulesList from './pages/ModulesList';
import UnitsList from './pages/UnitsList';
import LessonsList from './pages/LessonsList';
import LessonPlayer from './pages/LessonPlayer';
import TestMemory from './pages/TestMemory';
import PersonalPhraseBook from './pages/PersonalPhraseBook';
import AdminAudio from './pages/AdminAudio';
import AdminFlashcards from './pages/AdminFlashcards';
import AdminHearAndReact from './pages/AdminHearAndReact';
import AdminThisOrThat from './pages/AdminThisOrThat';
import AdminDialogue from './pages/AdminDialogue';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-coral text-lg font-light">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function OnboardingRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-coral text-lg font-light">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (profile && !profile.onboarding_completed) {
    return <>{children}</>;
  }

  return <Navigate to="/modules" replace />;
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/onboarding"
            element={
              <OnboardingRoute>
                <Onboarding />
              </OnboardingRoute>
            }
          />
          <Route path="/modules" element={<ModulesList />} />
          <Route path="/modules/:moduleId/units" element={<UnitsList />} />
          <Route path="/units/:unitId/lessons" element={<LessonsList />} />
          <Route path="/units/:unitId/lessons/:lessonId" element={<LessonPlayer />} />
          <Route path="/units/:unitId/test-memory" element={<TestMemory />} />
          <Route path="/phrase-book" element={<PersonalPhraseBook />} />
          <Route path="/admin/audio" element={<AdminAudio />} />
          <Route path="/admin/flashcards" element={<AdminFlashcards />} />
          <Route path="/admin/hear-and-react" element={<AdminHearAndReact />} />
          <Route path="/admin/this-or-that" element={<AdminThisOrThat />} />
          <Route path="/admin/dialogue" element={<AdminDialogue />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
