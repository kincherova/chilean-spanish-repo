export interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  icon: string;
  created_at: string;
}

export interface Unit {
  id: string;
  module_id: string;
  title: string;
  description: string;
  order_index: number;
  estimated_minutes: number;
  unit_type: 'standard' | 'vocabulary';
  created_at: string;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  type: string;
  content: LessonContent;
  order_index: number;
  created_at: string;
}

export interface Flashcard {
  id: string;
  unit_id: string;
  spanish_text: string;
  english_text: string;
  audio_url: string | null;
  order_index: number;
  created_at: string;
}

export interface UserFlashcardTag {
  id: string;
  user_id: string;
  flashcard_id: string;
  tag: 'needs_practice' | 'mastered';
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
  score: number | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonContent {
  pages: LessonPage[];
}

export type LessonPage =
  | OverviewPage
  | IntroPage
  | MultipleChoicePage
  | AudioChoicePage
  | FlashcardsPage
  | DialoguePage
  | DialoguePracticePage
  | RecapPage;

export interface OverviewPage {
  type: 'overview';
  title: string;
  goal: string;
  cultural_note?: string;
}

export interface IntroPage {
  type: 'intro';
  title: string;
  subtitle?: string;
  phrases: Phrase[];
}

export interface Phrase {
  spanish: string;
  english: string;
  reply?: string;
  audioUrl?: string;
  isChilean?: boolean;
}

export interface MultipleChoicePage {
  type: 'multiple_choice';
  title: string;
  items: MultipleChoiceItem[];
}

export interface MultipleChoiceItem {
  question: string;
  phrase?: string;
  options: string[];
  correctAnswer: number;
  audioUrl?: string;
}

export interface AudioChoicePage {
  type: 'audio_choice';
  title: string;
  items: AudioChoiceItem[];
}

export interface AudioChoiceItem {
  question: string;
  options: string[];
  audioUrl: string;
  correctAnswer: number;
}

export interface FlashcardsPage {
  type: 'flashcards';
  title: string;
  dialogue: null;
}

export interface DialoguePage {
  type: 'dialogue';
  title: string;
  subtitle?: string;
  dialogue: DialogueLine[];
}

export interface DialogueLine {
  spanish: string;
  english?: string;
  speaker: string;
  name?: string;
}

export interface DialoguePracticePage {
  type: 'dialogue_practice';
  title: string;
  subtitle?: string;
  dialogue: DialogueLine[];
}

export interface RecapPage {
  type: 'recap';
  title: string;
  dialogue?: DialogueLine[];
}
