import { createElement } from '@/shared/dom';
import './continueButton.scss';

export function renderContinueButton() {
  const button = createElement({
    tagName: 'button',
    className: ['continue-btn'],
    textContent: 'Continue',
  });
  return button;
}
