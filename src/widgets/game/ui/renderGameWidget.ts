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
      if (sentenceData) {
        sourceBlock.textContent = '';

        const fragment = new DocumentFragment();

        textContainer.textContent = sentenceData.textExampleTranslate;
        for (const w of shuffle(sentenceData.textExample.split(' '))) {
          fragment.append(
            createElement({
              tagName: 'span',
              className: ['word'],
              textContent: w,
            })
          );
        }
        sourceBlock.append(fragment);
      }
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
