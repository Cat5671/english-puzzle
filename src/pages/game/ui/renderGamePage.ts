import { createElement } from '@/shared/dom';
import { type GameData } from '@/entities/game';
import { renderGameWidget } from '@/widgets/game';

export function renderGamePage(): HTMLElement {
  const gameData: GameData = {
    level: 1,
    round: 0,
    sentenceIdx: 0,
  };

  const widget = renderGameWidget(gameData);

  const container = createElement({
    tagName: 'div',
    className: ['game-page'],
    children: [widget.element],
  });
  return container;
}
