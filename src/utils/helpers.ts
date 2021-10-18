export const chunk = <T>(arr: T[], size: number) => {
  return Array
    .from(
      { length: Math.ceil(arr.length / size) },
      (v, i) => arr.slice(i * size, i * size + size),
    )
}

export const scale = (value: number, factor: number): number => (value * factor)

export const isValidLink = (link?: string): boolean => {
  if (typeof link !== 'string') return false
  if (!link.startsWith('https://') && !link.startsWith('http://')) return false

  return true
}

export const NotEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined
}

export const shuffle = <T>(items: T[]) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [items[i], items[j]] = [items[j], items[i]]
  }
  return items
}
