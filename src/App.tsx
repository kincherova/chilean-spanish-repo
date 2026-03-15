import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { FontSizeProvider } from './contexts/FontSizeContext';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import UnitDetailPage from './pages/UnitDetailPage';
import LessonPage from './pages/LessonPage';
import FlashcardsPage from './pages/FlashcardsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import VocabularyPage from './pages/VocabularyPage';
import PracticeFlashcardsPage from './pages/PracticeFlashcardsPage';
import PaymentResultPage from './pages/PaymentResultPage';
import UpgradePage from './pages/UpgradePage';
import AboutIrinaPage from './pages/AboutIrinaPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <FontSizeProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
              <Route path="/modules/:moduleId/units/:unitId" element={<UnitDetailPage />} />
              <Route path="/modules/:moduleId/units/:unitId/lessons/:lessonId" element={<LessonPage />} />
              <Route path="/modules/:moduleId/units/:unitId/flashcards" element={<FlashcardsPage />} />
              <Route path="/upgrade" element={<UpgradePage />} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/vocabulary" element={<ProtectedRoute><VocabularyPage /></ProtectedRoute>} />
              <Route path="/vocabulary/practice" element={<ProtectedRoute><PracticeFlashcardsPage /></ProtectedRoute>} />
              <Route path="/payment/success" element={<PaymentResultPage result="success" />} />
              <Route path="/payment/pending" element={<PaymentResultPage result="pending" />} />
              <Route path="/payment/failure" element={<PaymentResultPage result="failure" />} />
              <Route path="/about-irina" element={<AboutIrinaPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FontSizeProvider>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
