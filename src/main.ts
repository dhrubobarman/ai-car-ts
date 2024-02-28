import Graph from "@/math/graph";
import Point from "./primitives/point";
import "./style.scss";
import Segment from "./primitives/segment";
import "./utils/helperElements";
import { canvas } from "@/utils/helperElements";
import { GraphEditor } from "./GraphEditor";

const ctx = canvas.getContext("2d")!;

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3]);

const graphEditor = new GraphEditor(canvas, graph);

const animate = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graphEditor.display();
  requestAnimationFrame(animate);
};
animate();
