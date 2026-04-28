import type { UseCase } from "@/types/content"

export const useCases: UseCase[] = [
  {
    id: "solopreneur",
    persona: "The solopreneur",
    description:
      "You're running the whole thing yourself. Content always falls to the bottom of the list.",
    outcome: "A consistent digital presence that works while you do everything else.",
  },
  {
    id: "professional",
    persona: "The professional",
    description:
      "You're brilliant at what you do. But explaining it online — consistently, compellingly — is a different skill set.",
    outcome: "Thought leadership content that positions you as the obvious choice.",
  },
  {
    id: "startup",
    persona: "The early startup",
    description:
      "You're pre-team or small-team. Marketing is a gap. You can't afford to look like it.",
    outcome: "A premium digital presence that punches well above your headcount.",
  },
]
