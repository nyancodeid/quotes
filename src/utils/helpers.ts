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
