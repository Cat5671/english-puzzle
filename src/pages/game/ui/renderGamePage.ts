import { type Levels } from '@/shared/config';
import { createElement } from '@/shared/dom';
import { type SentenceIdx } from '@/entities/level';
import { renderGameWidget } from '@/widgets/game';

export function renderGamePage(): HTMLElement {
  const level: Levels = 1;
  const round = 0;
  const sentenceIdx: SentenceIdx = 0;

  const widget = renderGameWidget(level, round, sentenceIdx);

  const container = createElement({
    tagName: 'div',
    className: ['game-page'],
    children: [widget.element],
  });
  return container;
}
