export default function buildQuizPrompt(topic: string): string {
  return `Generate a quiz about "${topic}" in Ukrainian.

CRITICAL: Respond ONLY with valid JSON array. No markdown, no explanations.

Requirements:
- Exactly 5 questions
- Interesting and challenging questions
- Each question needs 4 plausible answers
- Never mention Russia
- Each time you generate, make the questions UNIQUE and differently worded from previous ones

JSON structure:
[
  {
    "id": 1,
    "title": "Питання українською",
    "answers": ["Варіант 1", "Варіант 2", "Варіант 3", "Варіант 4"],
    "correct": "Правильна відповідь",
    "explanation": "Коротке пояснення (1-2 речення)"
  }
]

Topic: "${topic}"

Output the JSON array:`;
}
