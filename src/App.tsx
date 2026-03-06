import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import UnitDetailPage from './pages/UnitDetailPage';
import LessonPage from './pages/LessonPage';
import FlashcardsPage from './pages/FlashcardsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/modules" element={<ProtectedRoute><ModulesPage /></ProtectedRoute>} />
            <Route path="/modules/:moduleId" element={<ProtectedRoute><ModuleDetailPage /></ProtectedRoute>} />
            <Route path="/modules/:moduleId/units/:unitId" element={<ProtectedRoute><UnitDetailPage /></ProtectedRoute>} />
            <Route path="/modules/:moduleId/units/:unitId/lessons/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
            <Route path="/modules/:moduleId/units/:unitId/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
