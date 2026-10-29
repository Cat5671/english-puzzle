interface CreateHTMLElement<T extends keyof HTMLElementTagNameMap> {
  tagName: T;
  className?: string[];
  textContent?: string;
  attributes?: Record<string, string | number | boolean>;
  children?: (HTMLElement | Node | string)[];
  events?: {
    [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
  };
}

export function createElement<T extends keyof HTMLElementTagNameMap>(
  htmlElement: CreateHTMLElement<T>
): HTMLElementTagNameMap[T] {
  const element = document.createElement(htmlElement.tagName);
  if (htmlElement.className) {
    element.classList.add(...htmlElement.className);
  }
  if (htmlElement.textContent) {
    element.textContent = htmlElement.textContent;
  }
  if (htmlElement.attributes) {
    Object.entries(htmlElement.attributes).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        if (value) element.setAttribute(key, '');
        else element.removeAttribute(key);
      } else element.setAttribute(key, String(value));
    });
  }
  if (htmlElement.events) {
    Object.entries(htmlElement.events).forEach(([type, listener]) => {
      if (listener) {
        element.addEventListener(type, listener as EventListener);
      }
    });
  }

  if (htmlElement.children) {
    element.append(...htmlElement.children);
  }
  return element;
}
