import { createElement, iconButtonStyle } from "./createElement";

export function networkHTMlElement() {
  const carCanvas = createElement("canvas", {
    id: "environment",
  });
  const controls = createElement("div", {
    className:
      "controls flex gap-2 items-center absolute bottom-2 left-2 right-2 justify-center",
  });
  const networkCanvas = createElement("canvas", {
    id: "nCanvas",
  });

  const saveButton = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "💾",
    },
    controls
  );

  const deleteButton = createElement(
    "button",
    {
      className: `bg-gray-900 text-white ${iconButtonStyle}`,
      innerText: "🗑️",
    },
    controls
  );
  return { carCanvas, networkCanvas, saveButton, deleteButton };
}
