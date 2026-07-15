export type ActivityType =
  | "VISUAL_MATCHER"
  | "READING_SESSION"
  | "INTERACTIVE_CONTEXT_CLUE"
  | "TEXT_RECONSTRUCTION"
  | "PHONEME_MATCHER"
  | "SPEAKING";

export interface BaseActivityMetadata {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  level: string; // e.g., 'A1', 'B2'
  format: string; // e.g., 'Multi-Visual', 'Reading Comprehension'
  tags?: string[];
}

export interface MatchOption {
  id: number;
  src: string;
  alt: string;
  isCorrect: boolean;
}

export interface MatchQuestion {
  id: number;
  prompt: string;
  englishTranslation: string;
  hint: string;
  options: MatchOption[];
}

export interface VisualMatcherData {
  questions: MatchQuestion[];
}

export interface ReadingQuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface ReadingQuestion {
  id: string;
  type: string;
  question: string;
  options: ReadingQuestionOption[];
}

export interface ReadingSessionData {
  topic: string;
  readTime: string;
  title: string;
  author: string;
  extractedDate: string;
  paragraphs: string[];
  questions: ReadingQuestion[];
}

export type ParagraphPart =
  | { type: "text"; content: string }
  | { type: "clue"; clueId: string; content: string };

export interface ContextClueOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ContextClueWord {
  id: string;
  word: string;
  options: ContextClueOption[];
}

export interface InteractiveContextClueData {
  title: string;
  parts: ParagraphPart[];
  clues: Record<string, ContextClueWord>;
}

export interface TextReconstructionItem {
  id: string;
  text: string;
  correctOrder: number;
}

export interface TextReconstructionData {
  title: string;
  items: TextReconstructionItem[];
}

export interface PhonemeMatcherData {
  targetWord: string;
  ipaRepresentation: string;
  description: string;
}

export interface SpeakingActivityData {
  prompt: string;
  context?: string;
}

export type ActivityMetadata = BaseActivityMetadata &
  (
    | { type: "VISUAL_MATCHER"; data: VisualMatcherData }
    | { type: "READING_SESSION"; data: ReadingSessionData }
    | { type: "INTERACTIVE_CONTEXT_CLUE"; data: InteractiveContextClueData }
    | { type: "TEXT_RECONSTRUCTION"; data: TextReconstructionData }
    | { type: "PHONEME_MATCHER"; data: PhonemeMatcherData }
    | { type: "SPEAKING"; data: SpeakingActivityData }
  );
