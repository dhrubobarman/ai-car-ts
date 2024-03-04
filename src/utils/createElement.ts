export const appContainer = document.querySelector("#app")!;

export function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attributes?: Partial<HTMLElementTagNameMap[T]>,
  appendToElement: Element | null | false = appContainer
): HTMLElementTagNameMap[T] {
  const element = document.createElement(tag);
  if (attributes) {
    Object.assign(element, attributes);
  }
  if (appendToElement) appendToElement.appendChild(element);
  return element;
}

export const buttonStyle =
  "select-none rounded-md py-[10px] px-6 text-center align-middle font-sans text-xs font-bold uppercase  shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.6] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

export const iconButtonStyle =
  "select-none rounded-md py-[8px] px-[8px] text-center align-middle font-sans text-md font-bold uppercase  shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.6] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
