import Graph from "@/math/graph";
import { canvas, disposeButton, saveButton } from "@/utils/helperElements";
import { GraphEditor } from "./GraphEditor";
import Viewport from "./Viewport";
import World from "./World";
import "./style.scss";
import "./utils/helperElements";

canvas.width = 600;
canvas.height = 600;
function dispose() {
  graphEditor.dispose();
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
const graphEditor = new GraphEditor(viewport, graph);

let oldGraphHash = graph.hash();

const animate = () => {
  viewport.reset();
  const graphHash = graph.hash();
  if (graphHash !== oldGraphHash) {
    world.generate();
    oldGraphHash = graphHash;
  }
  world.draw(ctx);
  ctx.globalAlpha = 0.3;
  graphEditor.display();
  requestAnimationFrame(animate);
};
animate();
