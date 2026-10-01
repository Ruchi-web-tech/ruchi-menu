import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** The one place menu prices are formatted, e.g. "85 kr" or "from 85 kr". */
export function formatPrice(item: {
  price: number
  priceFrom?: boolean
  priceLabel?: string
}): string {
  if (item.priceLabel) return item.priceLabel
  const amount = `${Math.round(item.price)} kr`
  return item.priceFrom ? `from ${amount}` : amount
}
