interface Question {
  id: number;
  title: string;
  answers: string[];
  correct: string;
  explanation: string;
}

interface QuestionResponse {
  error: boolean;
  errorMessage: string;
  questions: Question[];
}

export type { Question, QuestionResponse };
