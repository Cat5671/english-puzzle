import { createElement } from '@/shared/dom';
import { shuffle } from '@/shared/array';
import { getGameRound, type GameData } from '@/entities/game';
import { getLevelData } from '@/entities/level';
import {
  checkFinalSentence,
  renderContinueButton,
  getNextGameData,
} from '@/features/continueGame';
import './renderGameWidget.scss';

export function renderGameWidget(gameData: GameData): {
  element: HTMLElement;
  renderSourceContent: (gameData: GameData) => void;
} {
  let finalSentence: string[];
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
  const continueButton = renderContinueButton();

  continueButton.addEventListener('click', async () => {
    const levelData = await getLevelData(gameData.level);

    if (!levelData) {
      console.error('Не удалось загрузить данные уровня');
      return;
    }

    const totalRounds = levelData.rounds.length;
    const nextGameData = getNextGameData(gameData, totalRounds);
    if (typeof nextGameData === 'string') return;
    gameData.level = nextGameData.level;
    gameData.round = nextGameData.round;
    gameData.sentenceIdx = nextGameData.sentenceIdx;
    renderSourceContent(gameData);
  });

  sourceBlock.addEventListener('click', moveToBlock);
  resultBlock.addEventListener('click', moveToBlock);

  function renderSourceContent(gameData: GameData) {
    getGameRound(gameData.level, gameData.round).then((gameRoundData) => {
      if (!gameRoundData) return;
      const sentenceData = gameRoundData.words[gameData.sentenceIdx];
      if (!sentenceData) return;
      resultBlock.textContent = '';
      continueButton.classList.remove('continue-btn--visible');
      sourceBlock.textContent = '';
      textContainer.textContent = sentenceData.textExampleTranslate;
      const allWords = sentenceData.textExample.split(' ');
      finalSentence = allWords.slice();
      const fragment = new DocumentFragment();
      const allWordsElems: HTMLElement[] = [];

      for (let i = 0; i < allWords.length; i += 1) {
        const title = allWords[i];
        if (title) {
          const el = createElement({
            tagName: 'span',
            className: ['word'],
            textContent: title,
            attributes: { 'data-index': `${i}` },
          });
          fragment.append(el);
          allWordsElems.push(el);
        }
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
      if (checkFinalSentence(resultBlock, finalSentence)) {
        continueButton.classList.add('continue-btn--visible');
      }
    } else {
      sourceBlock.append(wordElem);
      continueButton.classList.remove('continue-btn--visible');
    }
  }

  renderSourceContent(gameData);

  return {
    element: createElement({
      tagName: 'div',
      className: ['game'],
      children: [textContainer, resultBlock, sourceBlock, continueButton],
    }),
    renderSourceContent,
  };
}
