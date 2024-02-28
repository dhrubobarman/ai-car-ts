import Graph from "@/math/graph";
import { getNearestPoint } from "./math/utils";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
import Viewport from "@/Viewport";

export class GraphEditor {
  ctx: CanvasRenderingContext2D;
  graph: Graph;
  canvas: HTMLCanvasElement;
  selected: Point | null;
  hovered: Point | null;
  intent: Segment | null;
  dragging: boolean;
  mouse: Point;
  viewport: Viewport;
  constructor(viewport: Viewport, graph: Graph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.graph = graph;
    this.selected = null;
    this.hovered = null;
    this.intent = null;
    this.dragging = false;
    this.mouse = new Point(0, 0);
    this.addEventListeaners();
  }
  private addEventListeaners() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }

  private handleMouseMove(e: MouseEvent) {
    this.mouse = this.viewport.getMouse(e, true);
    this.hovered = getNearestPoint(
      this.mouse,
      this.graph.points,
      10 * this.viewport.zoom
    );
    if (this.dragging) {
      this.selected!.x = this.mouse.x;
      this.selected!.y = this.mouse.y;
    }
  }

  private handleMouseDown(e: MouseEvent) {
    if (e.button === 2) {
      //right click
      if (this.selected) {
        this.selected = null;
      } else {
        this.removePoint(this.hovered!);
      }
    }
    if (e.button === 0) {
      //left click
      if (this.hovered) {
        this.selectPoint(this.hovered);
        this.dragging = true;
        return;
      }
      this.graph.addPoint(this.mouse);
      this.selectPoint(this.mouse);
      this.hovered = this.mouse;
    }
  }

  private selectPoint(point: Point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }
  private removePoint(point: Point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected === point) {
      this.selected = null;
    }
  }

  dispose() {
    this.graph.dispose();
    this.selected = null;
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, {
        dash: [3, 3],
      });
      this.selected.draw(this.ctx, { outline: true });
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fillPoint: true });
    }
  }
}
