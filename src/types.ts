export interface Word {
  id: string;
  english: string;
  russian: string;
  correctCount: number;
  incorrectCount: number;
  lastStudied: string | null;
}