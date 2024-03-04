import { load } from "../../../utils";
import { createElement, iconButtonStyle } from "../../../utils/createElement";

export function worldHtmlElemts() {
  const carCanvas = createElement("canvas", {
    id: "environment",
  });
  const controls = createElement("div", {
    className:
      "controls flex gap-2 items-center absolute bottom-2 left-2 right-2 justify-center",
  });

  createElement(
    "span",
    {
      className: `text-black [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]`,
      innerText: "-+-",
    },
    controls
  );
  const saveButton = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "💾",
    },
    controls
  );

  const fileInputLabel = createElement(
    "label",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle} cursor-pointer`,
      innerText: "📂",
    },
    controls
  );
  const fileInput = createElement(
    "input",
    {
      type: "file",
      className: "sr-only",
      accept: ".world",
      onchange: load,
    },
    fileInputLabel
  );

  const disposeButton = createElement(
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
      innerText: "-+-",
    },
    controls
  );
  const graphButton = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "🌐",
    },
    controls
  );

  const stopButton = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "⛔",
    },
    controls
  );
  const yieldBtn = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "⚠️",
    },
    controls
  );

  const crossingButton = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "🚶",
    },
    controls
  );

  const parkingBtn = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "🅿️",
    },
    controls
  );
  const lightBtn = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "🚥",
    },
    controls
  );
  const startButton = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "🚙",
    },
    controls
  );
  const targetBtn = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "🎯",
    },
    controls
  );
  return {
    carCanvas,
    controls,
    saveButton,
    fileInputLabel,
    fileInput,
    disposeButton,
    graphButton,
    stopButton,
    yieldBtn,
    crossingButton,
    parkingBtn,
    lightBtn,
    startButton,
    targetBtn,
  };
}
