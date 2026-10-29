export function shuffle<T>(sourceArray: T[]): T[] {
  const shuffledArray = [...sourceArray];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const [itemI, itemJ] = [shuffledArray[i], shuffledArray[j]];
    if (itemI !== undefined && itemJ !== undefined) {
      [shuffledArray[i], shuffledArray[j]] = [itemJ, itemI];
    }
  }
  return shuffledArray;
}
