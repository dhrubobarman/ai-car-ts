import Viewport from "@/Viewport";
import World from "@/World";
import { Stop } from "@/markings/Stop";
import { getNearestSegment } from "@/math/utils";
import Point from "@/primitives/point";
import Segment from "@/primitives/segment";
import { Markings } from "@/types";

export class MarkingEditor {
  viewport: Viewport;
  world: World;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  boundMouseDown!: (e: MouseEvent) => void;
  boundMouseMove!: (e: MouseEvent) => void;
  boundContextMenu!: (e: MouseEvent) => void;
  mouse: Point;
  intent: Markings | null;
  markings: Markings[];
  targetSegments: Segment[];
  constructor(viewport: Viewport, world: World, targetSegments: Segment[]) {
    this.viewport = viewport;
    this.world = world;
    this.targetSegments = targetSegments;

    this.canvas = viewport.canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.mouse = new Point(0, 0);
    this.intent = null;
    this.markings = world.markings;
  }
  // to be overwritten
  createMarking(center: Point, directionVector: Point): Markings {
    return new Stop(center, directionVector, 0, 0);
  }
  enable() {
    this.addEventListeaners();
  }
  disable() {
    this.removeEventListeaners();
    this.intent = null;
  }
  private addEventListeaners() {
    this.boundMouseDown = this.handleMouseDown.bind(this);
    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundContextMenu = (e: MouseEvent) => e.preventDefault();
    this.canvas.addEventListener("mousedown", this.boundMouseDown);
    this.canvas.addEventListener("mousemove", this.boundMouseMove);
    this.canvas.addEventListener("contextmenu", this.boundContextMenu);
  }
  private removeEventListeaners() {
    this.canvas.removeEventListener("mousedown", this.boundMouseDown);
    this.canvas.removeEventListener("mousemove", this.boundMouseMove);
    this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
  }

  private handleMouseMove(e: MouseEvent) {
    this.mouse = this.viewport.getMouse(e, true);
    const seg = getNearestSegment(
      this.mouse,
      this.targetSegments,
      10 * this.viewport.zoom
    );
    if (seg) {
      const proj = seg.projectPoint(this.mouse);
      if (proj.offset >= 0 && proj.offset <= 1) {
        this.intent = this.createMarking(proj.point, seg.directionVector());
      } else {
        this.intent = null;
      }
    } else {
      this.intent = null;
    }
  }

  private handleMouseDown(e: MouseEvent) {
    if (e.button === 0) {
      if (this.intent) {
        this.markings.push(this.intent);
        this.intent = null;
      }
    }
    // right click
    if (e.button === 2) {
      for (let i = 0; i < this.markings.length; i++) {
        const poly = this.markings[i].poly;
        if (poly.containsPoint(this.mouse)) {
          this.markings.splice(i, 1);
        }
      }
    }
  }

  display() {
    if (this.intent) {
      this.intent.draw(this.ctx);
    }
  }
}
