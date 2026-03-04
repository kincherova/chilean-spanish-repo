import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Headphones, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const steps = [
  {
    icon: BookOpen,
    title: 'Learn in Context',
    description: 'Each lesson teaches you phrases you\'ll actually use - at restaurants, markets, hotels, and getting around Chile.',
  },
  {
    icon: Headphones,
    title: 'Practice Real Scenarios',
    description: 'Interactive exercises help you remember vocabulary and pronunciation. Focus on survival communication, not grammar rules.',
  },
  {
    icon: Award,
    title: 'Track Your Progress',
    description: 'Complete lessons at your own pace. Each unit takes 10-15 minutes, perfect for busy travelers preparing for their trip.',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await updateProfile({ onboarding_completed: true });
      navigate('/modules');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      navigate('/modules');
    }
  };

  const currentContent = steps[currentStep];
  const Icon = currentContent.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-card-lg shadow-lg border border-[#f0e8e0] p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-12 bg-coral'
                      : index < currentStep
                      ? 'w-8 bg-gold'
                      : 'w-8 bg-cream'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-cream p-6 rounded-card-lg">
              <Icon className="w-12 h-12 text-coral" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-4xl font-display font-bold text-center text-navy mb-4">
            {currentContent.title}
          </h2>

          <p className="text-xl text-center text-muted font-light leading-relaxed mb-12">
            {currentContent.description}
          </p>

          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 py-3 rounded-card font-medium text-muted hover:text-navy hover:bg-cream transition-all min-h-[48px]"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 bg-gradient-to-br from-coral to-coral-dark text-white py-3 rounded-card font-medium hover:shadow-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]"
            >
              {currentStep === steps.length - 1 ? (
                loading ? 'Starting...' : 'Get Started'
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {currentStep === 0 && (
            <button
              onClick={handleComplete}
              className="w-full mt-4 text-sm text-muted hover:text-navy font-light transition-colors"
            >
              Skip introduction
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
