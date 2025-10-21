export interface Answer {
  questionId: number;
  value: string | number[] | File[];
}

const STORAGE_KEY = "instarizz_answers";

export function saveAnswer(questionId: number, value: string | number[] | File[]) {
  if (typeof window === "undefined") return;

  const answers = getAnswers();
  const existingIndex = answers.findIndex((a) => a.questionId === questionId);

  // For file uploads, we can't store File objects in localStorage
  // So we'll store a flag instead and handle files separately
  const valueToStore = value instanceof Array && value[0] instanceof File
    ? "FILE_UPLOADED"
    : value;

  if (existingIndex >= 0) {
    answers[existingIndex] = { questionId, value: valueToStore };
  } else {
    answers.push({ questionId, value: valueToStore });
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch (error) {
    console.error("Failed to save answer:", error);
  }
}

export function getAnswers(): Answer[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get answers:", error);
    return [];
  }
}

export function getAnswer(questionId: number): string | number[] | null {
  const answers = getAnswers();
  const answer = answers.find((a) => a.questionId === questionId);
  return answer ? answer.value as (string | number[]) : null;
}

export function clearAnswers() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear answers:", error);
  }
}

export function hasAnswer(questionId: number): boolean {
  return getAnswer(questionId) !== null;
}
