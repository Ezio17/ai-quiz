import { defineEventHandler, readBody } from 'h3';
import type { Question } from '@shared/types/index';
import { buildQuizPrompt } from '../utils/index';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

interface QuestionResponse {
  error: boolean;
  errorMessage: string;
  questions: Question[];
}

const errorResponse = (message: string): QuestionResponse => ({
  error: true,
  errorMessage: message,
  questions: [],
});

export default defineEventHandler(async (event): Promise<QuestionResponse> => {
  const body = await readBody<{ topic?: string }>(event);
  const topic = body?.topic;

  if (!topic) {
    return errorResponse('Будь ласка, вкажіть тему для квізу.');
  }

  try {
    const config = useRuntimeConfig();
    const GEMINI_API_KEY = config.geminiApiKey;

    if (!GEMINI_API_KEY) {
      console.error('Gemini API key not configured');
      return errorResponse('Виникла помилка при генерації квізу. Спробуйте пізніше.');
    }

    const prompt = buildQuizPrompt(topic);

    const response = await $fetch<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        },
      }
    );

    const content = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      console.error('No content returned from Gemini', response);
      return errorResponse('Виникла помилка при отриманні квізу. Спробуйте ще раз.');
    }

    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    let questions: Question[];

    try {
      questions = JSON.parse(cleaned) as Question[];
    } catch {
      console.error('Failed to parse quiz JSON', cleaned);
      return errorResponse('Отримано некоректний формат квізу. Спробуйте іншу тему.');
    }

    if (!Array.isArray(questions) || questions.length !== 5) {
      console.error('Invalid quiz format', questions);
      return errorResponse('Отримано некоректний формат квізу. Спробуйте іншу тему.');
    }

    const invalidQuestion = questions.find(
      (q) =>
        !q?.title ||
        !Array.isArray(q.answers) ||
        q.answers.length !== 4 ||
        !q.correct ||
        !q.explanation ||
        !q.answers.includes(q.correct)
    );

    if (invalidQuestion) {
      console.error('Invalid question structure', invalidQuestion);
      return errorResponse('Отримано некоректне питання у квізі. Спробуйте іншу тему.');
    }

    return {
      error: false,
      errorMessage: '',
      questions,
    };
  } catch (err) {
    console.error('Quiz generation error:', err);
    return errorResponse('Виникла помилка при генерації квізу. Спробуйте ще раз.');
  }
});
