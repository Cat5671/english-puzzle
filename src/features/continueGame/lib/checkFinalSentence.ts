export function checkFinalSentence(
  resultBlock: HTMLElement,
  finalSentence: string[],
  isBackground: boolean = false
): boolean {
  const allWords = resultBlock.querySelectorAll('.word');
  if (allWords.length !== finalSentence.length) return false;

  for (let i = 0; i < finalSentence.length; i += 1) {
    if (!isBackground && finalSentence[i] === allWords[i]?.textContent)
      continue;
    const indexOfWord = allWords[i]?.getAttribute('data-index');
    if (isBackground && indexOfWord && indexOfWord === `${i}`) continue;
    return false;
  }
  return true;
}
