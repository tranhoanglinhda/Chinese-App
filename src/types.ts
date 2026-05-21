export interface WordItem {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  scrambled: WordItem[];
  correctIds: string[];
  alternativeCorrectIds?: string[][];
  translation: string;
  explanation: string;
  theoryOverride?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  theory: string;
}
