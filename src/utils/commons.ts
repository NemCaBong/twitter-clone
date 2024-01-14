/**
 * @description Converts an enum to an array of numbers
 */
export const numberEnumToArray = (numberEnum: Record<string, string | number>) => {
  return Object.values(numberEnum).filter((value) => typeof value === 'number') as number[]
}
