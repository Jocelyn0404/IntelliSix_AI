
export enum QuizStatus {
  NOT_COMPLETED = 'Not_Completed',
  COMPLETED = 'Completed'
}

export enum ScoreLevel {
  NO_SCORE = 'No_Score',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum ImprovementStatus {
  NOT_IMPROVED = 'Not_Improved',
  IMPROVED = 'Improved'
}

export enum ErrorPattern {
  LOW = 'Low',
  HIGH = 'High'
}

export enum EngagementStatus {
  NO_INTERACTION = 'No_Interaction',
  ENGAGED = 'Engaged',
  RESPONDED = 'Responded'
}

export enum PerformanceClassification {
  LOW = 'Low',
  HIGH = 'High'
}

export interface LearningState {
  qs: QuizStatus;
  sl: ScoreLevel;
  is: ImprovementStatus;
  ep: ErrorPattern;
  es: EngagementStatus;
  pc: PerformanceClassification;
}

export interface LearningMaterial {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Interactive';
  level: 'Foundational' | 'Advanced' | 'Basic';
  locked: boolean;
  recommended?: boolean;
  completedAssessments: number[]; // Array of indices (e.g., [0, 1] means both done)
  assessmentScores?: Record<number, number>; // Index -> Percentage Score
  content?: string; // HTML string for study notes
}

export interface LogEntry {
  timestamp: string;
  type: 'SENSOR' | 'REASONING' | 'ACTUATOR';
  message: string;
  id: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

export interface TopicQuizSet {
  topicId: string;
  assessments: QuizQuestion[][];
}
