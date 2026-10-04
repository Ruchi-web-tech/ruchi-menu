/**
 * RUCHI category colours, shared by menu cards, tiles and the daily banner.
 * Full class names on purpose, so Tailwind keeps them in the build.
 * `accent` = the category colour as text, for use on the dark ink colour.
 */
export const CATEGORY_STYLE: Record<string, { bg: string; text: string; accent: string }> = {
  salads: { bg: 'bg-ruchi-yellow', text: 'text-ruchi-ink', accent: 'text-ruchi-yellow' },
  bao: { bg: 'bg-ruchi-pink', text: 'text-ruchi-ink', accent: 'text-ruchi-pink' },
  sushi: { bg: 'bg-ruchi-turquoise', text: 'text-ruchi-ink', accent: 'text-ruchi-turquoise' },
  sando: { bg: 'bg-ruchi-purple', text: 'text-ruchi-ink', accent: 'text-ruchi-purple' },
  sides: { bg: 'bg-ruchi-cream', text: 'text-ruchi-ink', accent: 'text-ruchi-cream' },
  drinks: { bg: 'bg-ruchi-ink', text: 'text-ruchi-cream', accent: 'text-ruchi-yellow' },
};

const FALLBACK = { bg: 'bg-ruchi-purple', text: 'text-ruchi-ink', accent: 'text-ruchi-purple' };

export function categoryStyle(categories: string[] | undefined) {
  return CATEGORY_STYLE[categories?.[0] ?? ''] ?? FALLBACK;
}
