import Graph from "@/math/graph";
import { canvas, disposeButton, saveButton } from "@/utils/helperElements";
import { GraphEditor } from "./GraphEditor";
import Viewport from "./Viewport";
import "./style.scss";
import "./utils/helperElements";

canvas.width = 600;
canvas.height = 600;

// const ctx = canvas.getContext("2d")!;

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const viewport = new Viewport(canvas);
const graphEditor = new GraphEditor(viewport, graph);

function dispose() {
  graphEditor.dispose();
}
function save() {
  localStorage.setItem("graph", JSON.stringify(graph));
}

disposeButton.addEventListener("click", dispose);
saveButton.addEventListener("click", save);

const animate = () => {
  viewport.reset();
  graphEditor.display();

  requestAnimationFrame(animate);
};
animate();
