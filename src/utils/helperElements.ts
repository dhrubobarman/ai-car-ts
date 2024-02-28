import { createElement } from "./createElement";

export const canvas = createElement("canvas", {
  id: "environment",
});

export const controls = createElement("div", {
  className:
    "controls flex gap-2 items-center absolute bottom-2 left-2 right-2 justify-center",
});

const buttonStyle =
  "select-none rounded-md py-[10px] px-6 text-center align-middle font-sans text-xs font-bold uppercase  shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.6] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

export const addRandomPointButton = createElement(
  "button",
  {
    className: `bg-blue-900 text-white ${buttonStyle}`,
    innerText: "Add Point",
  },
  controls
);
