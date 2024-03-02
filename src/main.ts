import Graph from "@/math/graph";
import {
  canvas,
  disposeButton,
  saveButton,
  graphButton,
  stopButton,
  crossingButton,
  startButton,
  parkingBtn,
  lightBtn,
  targetBtn,
  yieldBtn,
} from "@/utils/helperElements";
import { GraphEditor } from "./editors/GraphEditor";
import Viewport from "./Viewport";
import World from "./World";
import "./style.scss";
import "./utils/helperElements";
import { scale } from "./math/utils";
import { StopEditor } from "./editors/StopEditor";
import { CrossingEditor } from "./editors/CrossingEditor";
import { StartEditor } from "./editors/StartEditor";
import { Modes } from "./types";
import { ParkingEditor } from "./editors/ParkingEditor";
import { LightEditor } from "./editors/LightEditor";
import { TargetEditor } from "./editors/TargetEditor";
import { YieldEditor } from "./editors/YieldEditor";

canvas.width = 600;
canvas.height = 600;
function dispose() {
  tools["graph"].editor.dispose();
  world.markings.length = 0;
}
function save() {
  localStorage.setItem("graph", JSON.stringify(graph));
}
disposeButton.addEventListener("click", dispose);
saveButton.addEventListener("click", save);
const ctx = canvas.getContext("2d")!;

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);
const viewport = new Viewport(canvas);

const tools = {
  graph: { button: graphButton, editor: new GraphEditor(viewport, graph) },
  stop: { button: stopButton, editor: new StopEditor(viewport, world) },
  crossing: {
    button: crossingButton,
    editor: new CrossingEditor(viewport, world),
  },
  start: {
    button: startButton,
    editor: new StartEditor(viewport, world),
  },
  parking: { button: parkingBtn, editor: new ParkingEditor(viewport, world) },
  light: { button: lightBtn, editor: new LightEditor(viewport, world) },
  target: { button: targetBtn, editor: new TargetEditor(viewport, world) },
  yield: { button: yieldBtn, editor: new YieldEditor(viewport, world) },
} as const;

function setMode(mode: Modes) {
  disableEditors();
  tools[mode].button.disabled = true;
  tools[mode].editor.enable();
}
function addListeaners() {
  for (const key of Object.keys(tools) as Modes[]) {
    tools[key].button.addEventListener("click", () => {
      setMode(key);
    });
  }
}
function disableEditors() {
  for (const tool of Object.values(tools)) {
    tool.editor.disable();
    tool.button.disabled = false;
  }
}

let oldGraphHash = graph.hash();
setMode("graph");
addListeaners();
const animate = () => {
  viewport.reset();
  const graphHash = graph.hash();
  if (graphHash !== oldGraphHash) {
    world.generate();
    oldGraphHash = graphHash;
  }
  const viewpoint = scale(viewport.getOffset(), -1);
  world.draw(ctx, viewpoint);
  ctx.globalAlpha = 0.3;
  for (const tool of Object.values(tools)) {
    tool.editor.display();
  }
  requestAnimationFrame(animate);
};
animate();
