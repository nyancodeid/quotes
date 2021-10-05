export const chunk = <T>(arr: T[], size: number) => {
  return Array
    .from(
      { length: Math.ceil(arr.length / size) },
      (v, i) => arr.slice(i * size, i * size + size)
    );
}
