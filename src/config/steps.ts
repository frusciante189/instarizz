export const STEPS = [
  { id: 2, slug: "age", questionId: 2 },
  { id: 4, slug: "looking-for", questionId: 4 },
  { id: 5, slug: "age-range", questionId: 5 },
  { id: 6, slug: "email", questionId: 6 },
  { id: 7, slug: "profile", questionId: 7 },
] as const;

export type StepSlug = (typeof STEPS)[number]["slug"];

export function getStepBySlug(slug: string) {
  return STEPS.find((step) => step.slug === slug);
}

export function getNextStepSlug(currentSlug: string): string | null {
  const currentIndex = STEPS.findIndex((step) => step.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === STEPS.length - 1) {
    return null;
  }
  return STEPS[currentIndex + 1].slug;
}

export function getPreviousStepSlug(currentSlug: string): string | null {
  const currentIndex = STEPS.findIndex((step) => step.slug === currentSlug);
  if (currentIndex <= 0) {
    return null;
  }
  return STEPS[currentIndex - 1].slug;
}

export function getStepIndex(slug: string): number {
  return STEPS.findIndex((step) => step.slug === slug);
}

export function isValidStep(slug: string): boolean {
  return STEPS.some((step) => step.slug === slug);
}
