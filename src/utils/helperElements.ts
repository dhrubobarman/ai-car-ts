import { load } from ".";
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

const iconButtonStyle =
  "select-none rounded-md py-[8px] px-[8px] text-center align-middle font-sans text-md font-bold uppercase  shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.6] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

export const saveButton = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "💾",
  },
  controls
);

export const fileInputLabel = createElement(
  "label",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle} cursor-pointer`,
    innerText: "📂",
  },
  controls
);
export const fileInput = createElement(
  "input",
  {
    type: "file",
    className: "sr-only",
    accept: ".world",
    onchange: load,
  },
  fileInputLabel
);

export const disposeButton = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "🗑️",
  },
  controls
);
createElement(
  "span",
  {
    className: `text-black [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]`,
    innerText: "---+---",
  },
  controls
);
export const graphButton = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "🌐",
  },
  controls
);

export const stopButton = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "⛔",
  },
  controls
);
export const yieldBtn = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "⚠️",
  },
  controls
);

export const crossingButton = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "🚶",
  },
  controls
);

export const parkingBtn = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "🅿️",
  },
  controls
);
export const lightBtn = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "🚥",
  },
  controls
);
export const startButton = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "🚙",
  },
  controls
);
export const targetBtn = createElement(
  "button",
  {
    className: `bg-gray-900 text-white ${iconButtonStyle}`,
    innerText: "🎯",
  },
  controls
);
