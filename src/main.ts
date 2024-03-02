import Graph from "@/math/graph";
import {
  canvas,
  crossingButton,
  disposeButton,
  graphButton,
  lightBtn,
  parkingBtn,
  saveButton,
  startButton,
  stopButton,
  targetBtn,
  yieldBtn,
} from "@/utils";
import Viewport from "./Viewport";
import World from "./World";
import { CrossingEditor } from "./editors/CrossingEditor";
import { GraphEditor } from "./editors/GraphEditor";
import { LightEditor } from "./editors/LightEditor";
import { ParkingEditor } from "./editors/ParkingEditor";
import { StartEditor } from "./editors/StartEditor";
import { StopEditor } from "./editors/StopEditor";
import { TargetEditor } from "./editors/TargetEditor";
import { YieldEditor } from "./editors/YieldEditor";
import { scale } from "./math/utils";
import "./style.scss";
import { Modes } from "./types";
import { save } from "./utils";
import "./utils/helperElements";

canvas.width = 600;
canvas.height = 600;
function dispose() {
  tools["graph"].editor.dispose();
  world.markings.length = 0;
}
// function save() {
//   localStorage.setItem("world", JSON.stringify(world));
// }
disposeButton.addEventListener("click", dispose);
saveButton.addEventListener("click", () =>
  save(world, viewport.zoom, viewport.offset)
);
const ctx = canvas.getContext("2d")!;

const worldString = localStorage.getItem("world");

const worldInfo = worldString ? JSON.parse(worldString) : null;
const world: World = worldInfo ? World.load(worldInfo) : new World(new Graph());
const viewport = new Viewport(canvas, world.zoom, world.offset);

const graph = world.graph;

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
