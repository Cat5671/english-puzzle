import { type Levels } from '@/shared/config';
import { createElement } from '@/shared/dom';
import { shuffle } from '@/shared/array';
import { getGameRound } from '@/entities/game';
import { type SentenceIdx } from '@/entities/level';
import './renderGameWidget.scss';

export function renderGameWidget(
  levelArg: Levels,
  roundArg: number,
  sentenceIdxArg: SentenceIdx
): {
  element: HTMLElement;
  renderSourceContent: (
    level: Levels,
    round: number,
    sentenceIdx: SentenceIdx
  ) => void;
} {
  const textContainer = createElement({
    tagName: 'p',
    className: ['source-language'],
  });
  const sourceBlock = createElement({
    tagName: 'div',
    className: ['source-block'],
  });
  const resultBlock = createElement({
    tagName: 'div',
    className: ['result-block'],
  });
  sourceBlock.addEventListener('click', moveToBlock);
  resultBlock.addEventListener('click', moveToBlock);

  function renderSourceContent(
    level: Levels,
    round: number,
    sentenceIdx: SentenceIdx
  ) {
    getGameRound(level, round).then((gameRoundData) => {
      if (!gameRoundData) return;
      const sentenceData = gameRoundData.words[sentenceIdx];
      if (!sentenceData) return;
      sourceBlock.textContent = '';
      textContainer.textContent = sentenceData.textExampleTranslate;
      const allWords = sentenceData.textExample.split(' ');
      const fragment = new DocumentFragment();
      const allWordsElems: HTMLElement[] = [];

      for (const w of allWords) {
        const el = createElement({
          tagName: 'span',
          className: ['word'],
          textContent: w,
        });
        fragment.append(el);
        allWordsElems.push(el);
      }

      sourceBlock.append(fragment);

      // ДАЕМ БРАУЗЕРУ ВРЕМЯ НА ОТРИСОВКУ
      setTimeout(() => {
        const allWordsWidths = allWordsElems.map(
          (el) => el.getBoundingClientRect().width
        );

        allWordsElems.forEach((el, index) => {
          el.style.width = `${allWordsWidths[index]}px`;
          el.style.flexGrow = '0';
          el.style.flexShrink = '0';
        });
        const shuffledElements = shuffle([...allWordsElems]);
        sourceBlock.textContent = '';
        const newFragment = new DocumentFragment();
        shuffledElements.forEach((el) => newFragment.append(el));
        sourceBlock.append(newFragment);
      }, 0);
    });
  }

  function moveToBlock() {
    const target = event?.target as HTMLElement;
    const currTarget = event?.currentTarget as HTMLElement;
    const wordElem = target.closest('.word');

    if (!wordElem) return;

    if (currTarget.classList.contains('source-block')) {
      resultBlock.append(wordElem);
    } else {
      sourceBlock.append(wordElem);
    }
  }

  renderSourceContent(levelArg, roundArg, sentenceIdxArg);

  return {
    element: createElement({
      tagName: 'div',
      className: ['game'],
      children: [textContainer, resultBlock, sourceBlock],
    }),
    renderSourceContent,
  };
}
