import { newtworkView } from "./car.main";
import { createElement } from "./utils";
import "./style.scss";
import { worldEditorView } from "./world/js/main";
const app = document.querySelector("#app") as HTMLDivElement;

const container = createElement(
  "div",
  {
    className:
      "container flex absolute top-0 left-0 right-0 justify-center gap-2",
  },
  document.body
);
const netWorkLable = createElement(
  "label",
  {
    innerText: "Network",
    className:
      "block cursor-pointer bg-gray-700 px-2 py-1 rounded-md text-white ",
  },
  container
);
const worldLabel = createElement(
  "label",
  {
    innerText: "World",
    className:
      "block cursor-pointer bg-gray-700 px-2 py-1 rounded-md text-white ",
  },
  container
);

const netWork = createElement(
  "input",
  {
    type: "radio",
    name: "world_selector",
    id: "network",
    className: "cursor-pointer ml-2",
    checked: true,
    onchange: () => toggleView("network"),
  },
  netWorkLable
);

const worldEditor = createElement(
  "input",
  {
    type: "radio",
    name: "world_selector",
    id: "worldEditor",
    className: "cursor-pointer ml-2",
    onchange: () => toggleView("world"),
  },
  worldLabel
);

function toggleView(viewType: "network" | "world") {
  app.innerHTML = "";
  if (viewType === "network") {
    netWork.checked = true;
    worldEditor.checked = false;
    newtworkView();
  }
  if (viewType === "world") {
    netWork.checked = false;
    worldEditor.checked = true;
    worldEditorView();
  }
}
toggleView("world");
