import Point from "@/primitives/point";
import Segment from "@/primitives/segment";
import { Marking } from "./Marking";

export class Parking extends Marking {
  borders: Segment[];
  constructor(
    center: Point,
    directionVector: Point,
    width: number,
    height: number
  ) {
    super(center, directionVector, width, height);
    this.borders = [this.poly.segments[0], this.poly.segments[2]];
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const border of this.borders) {
      border.draw(ctx, { width: 5, strokeStyle: "white" });
    }
    ctx.save();
    ctx.translate(this.center.x, this.center.y);

    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.font = `bold ${this.height * 0.9}px Arial`;
    ctx.fillText("P", 0, 3);
    ctx.restore();
  }
}
